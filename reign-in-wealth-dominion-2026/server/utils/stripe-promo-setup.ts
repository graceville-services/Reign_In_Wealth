import { createHash } from 'node:crypto'
import type Stripe from 'stripe'
import { site } from '../../app/data/site.ts'
import { asObject, CheckoutProblem, PROMO_DISCOUNT_AMOUNT, promotionConfiguration } from './ticket-pricing.ts'
import type { PromoEnvironment } from './ticket-pricing.ts'
import { validateTicketPrice } from './ticket-checkout.ts'

type SetupStripe = Pick<Stripe, 'prices' | 'coupons' | 'promotionCodes'>

function conflict(message: string): never {
  throw new CheckoutProblem(409, 'PROMO_SETUP_CONFLICT', message)
}

function missing(error: unknown) {
  const value = asObject(error)
  return value.code === 'resource_missing' || value.statusCode === 404
}

function sameProducts(actual: string[] | undefined, expected: string[]) {
  return !!actual && actual.length === expected.length && [...actual].sort().every((id, index) => id === expected[index])
}

function verifyCoupon(coupon: Stripe.Coupon, products: string[], livemode: boolean) {
  const currencies = coupon.currency_options || {}
  if (!coupon.valid || coupon.livemode !== livemode || coupon.amount_off !== PROMO_DISCOUNT_AMOUNT || coupon.currency !== 'usd' || coupon.percent_off != null || coupon.duration !== 'once' || coupon.max_redemptions != null || coupon.redeem_by != null || !sameProducts(coupon.applies_to?.products, products) || Object.entries(currencies).some(([currency, value]) => currency !== 'usd' || value.amount_off !== PROMO_DISCOUNT_AMOUNT)) {
    conflict(`Coupon ${coupon.id} does not match the unrestricted $100 USD per-order offer for the configured ticket products. No existing offer was changed.`)
  }
}

async function activePromotion(stripe: SetupStripe, code: string): Promise<Stripe.PromotionCode | null> {
  const result = await stripe.promotionCodes.list({ code, active: true, limit: 100 })
  const found = result.data.filter(item => item.code.toUpperCase() === code)
  if (result.has_more || found.length > 1) {
    conflict(`Multiple active ${code} promotions exist. Review their customer restrictions in Stripe before running setup again.`)
  }
  return found[0] || null
}

async function verifyPromotion(stripe: SetupStripe, promotion: Stripe.PromotionCode, code: string, products: string[], livemode: boolean) {
  const restrictions = promotion.restrictions
  if (!promotion.active || promotion.code.toUpperCase() !== code || promotion.livemode !== livemode || promotion.customer != null || promotion.customer_account != null || promotion.expires_at != null || promotion.max_redemptions != null || restrictions.first_time_transaction || restrictions.minimum_amount != null || restrictions.minimum_amount_currency != null || Object.keys(restrictions.currency_options || {}).length || promotion.promotion.type !== 'coupon') {
    conflict(`Promotion ${code} already exists with different eligibility, expiry, or usage restrictions. No existing offer was changed.`)
  }
  const couponValue = promotion.promotion.coupon
  const couponId = typeof couponValue === 'string' ? couponValue : couponValue?.id
  if (!couponId) conflict(`Promotion ${code} has no usable coupon.`)
  const coupon = await stripe.coupons.retrieve(couponId, { expand: ['applies_to'] })
  verifyCoupon(coupon, products, livemode)
  return coupon
}

/** One-time administrative setup. Customer checkout must never call this. */
export async function configureStripePromotion(
  stripe: SetupStripe,
  options: { apply?: boolean; environment?: PromoEnvironment } = {},
) {
  const promotion = promotionConfiguration(options.environment ?? process.env)
  if (!promotion.valid) {
    throw new CheckoutProblem(400, 'INVALID_PROMO_CONFIGURATION', 'DOMINION_PROMO_CODE must contain 1–64 letters, digits, or hyphens.')
  }

  // Finish all Price checks before creating any Stripe resources.
  const prices: Array<{ ticketId: string; priceId: string; amount: number; productId: string; livemode: boolean }> = []
  for (const ticket of site.tickets) {
    const price = await stripe.prices.retrieve(ticket.stripePriceId, { expand: ['product'] })
    const productId = validateTicketPrice(ticket, price)
    prices.push({ ticketId: ticket.id, priceId: price.id, amount: price.unit_amount!, productId, livemode: price.livemode })
  }
  const livemode = prices[0]!.livemode
  if (prices.some(price => price.livemode !== livemode)) conflict('Configured ticket Prices must belong to one Stripe mode.')
  const products = [...new Set(prices.map(price => price.productId))].sort()
  const fingerprint = createHash('sha256').update(JSON.stringify([promotion.code, products, 'usd', PROMO_DISCOUNT_AMOUNT])).digest('hex').slice(0, 16)
  const intendedCouponId = `dominion2026_order100_v2_${fingerprint}`
  const summary = { code: promotion.code, scope: 'order', amountOff: PROMO_DISCOUNT_AMOUNT, currency: 'usd', mode: livemode ? 'LIVE' : 'TEST', entryEnabled: promotion.enabled, prices }

  const existingPromotion = await activePromotion(stripe, promotion.code)
  if (existingPromotion) {
    const coupon = await verifyPromotion(stripe, existingPromotion, promotion.code, products, livemode)
    return { ...summary, ready: true, couponId: coupon.id, promotionCodeId: existingPromotion.id, createdCoupon: false, createdPromotion: false }
  }

  let coupon: Stripe.Coupon | null = null
  try { coupon = await stripe.coupons.retrieve(intendedCouponId, { expand: ['applies_to'] }) }
  catch (error) { if (!missing(error)) throw error }
  if (coupon) verifyCoupon(coupon, products, livemode)

  if (!options.apply) {
    return { ...summary, ready: false, couponId: coupon?.id || null, promotionCodeId: null, createdCoupon: false, createdPromotion: false }
  }

  let createdCoupon = false
  if (!coupon) {
    try {
      coupon = await stripe.coupons.create({
        id: intendedCouponId,
        name: 'DOMINION $100 off your order',
        duration: 'once',
        amount_off: PROMO_DISCOUNT_AMOUNT,
        currency: 'usd',
        applies_to: { products },
        metadata: { campaign: 'dominion2026-native-promo-v2', scope: 'order', code: promotion.code },
        expand: ['applies_to'],
      }, { idempotencyKey: `create-${intendedCouponId}` })
      createdCoupon = true
    } catch (error) {
      // Another setup process or a lost API response may have created it.
      try { coupon = await stripe.coupons.retrieve(intendedCouponId, { expand: ['applies_to'] }) }
      catch { throw error }
    }
    verifyCoupon(coupon, products, livemode)
  }

  let created: Stripe.PromotionCode
  let createdPromotion = false
  try {
    created = await stripe.promotionCodes.create({
      code: promotion.code,
      active: true,
      // Stripe SDK 23 / API 2026-09-30.endive uses this nested shape.
      promotion: { type: 'coupon', coupon: coupon.id },
      metadata: { campaign: 'dominion2026-native-promo-v2', scope: 'order' },
    }, { idempotencyKey: `promotion-${intendedCouponId}` })
    createdPromotion = true
  } catch (error) {
    const concurrent = await activePromotion(stripe, promotion.code)
    if (!concurrent) throw error
    created = concurrent
  }
  const verifiedCoupon = await verifyPromotion(stripe, created, promotion.code, products, livemode)
  return { ...summary, ready: true, couponId: verifiedCoupon.id, promotionCodeId: created.id, createdCoupon, createdPromotion }
}
