import assert from 'node:assert/strict'
import { test } from 'node:test'
import { site } from '../app/data/site.ts'
import { configureStripePromotion } from '../server/utils/stripe-promo-setup.ts'
import { CheckoutProblem } from '../server/utils/ticket-pricing.ts'

function setupMock(options: { price?: Record<string, unknown>; coupon?: Record<string, unknown>; promotion?: Record<string, unknown>; couponRace?: boolean; promotionRace?: boolean } = {}) {
  const calls = { prices: [] as string[], couponReads: [] as string[], coupons: [] as any[], promotions: [] as any[] }
  const coupons = new Map<string, any>()
  const promotions: any[] = []
  const products = site.tickets.map(ticket => `prod_${ticket.id}`).sort()
  function coupon(id = 'existing_coupon') {
    return { id, object: 'coupon', valid: true, livemode: false, amount_off: 10000, currency: 'usd', percent_off: null, duration: 'once', max_redemptions: null, redeem_by: null, applies_to: { products }, ...options.coupon }
  }
  function promotion(couponId = 'existing_coupon') {
    return { id: 'promo_example', object: 'promotion_code', active: true, code: 'DOMINION100', livemode: false, customer: null, customer_account: null, expires_at: null, max_redemptions: null, restrictions: { first_time_transaction: false, minimum_amount: null, minimum_amount_currency: null }, promotion: { type: 'coupon', coupon: couponId }, ...options.promotion }
  }
  const stripe = {
    prices: { retrieve: async (id: string) => {
      calls.prices.push(id)
      const ticket = site.tickets.find(item => item.stripePriceId === id)!
      return { id, active: true, type: 'one_time', billing_scheme: 'per_unit', currency: 'usd', unit_amount: ticket.price * 100, product: { id: `prod_${ticket.id}`, active: true }, livemode: false, ...options.price }
    } },
    coupons: {
      retrieve: async (id: string) => {
        calls.couponReads.push(id)
        if (!coupons.has(id)) throw Object.assign(new Error('missing'), { code: 'resource_missing', statusCode: 404 })
        return coupons.get(id)
      },
      create: async (params: any, request: any) => {
        calls.coupons.push({ params, request })
        const value = { ...coupon(params.id), ...params, ...options.coupon }
        coupons.set(params.id, value)
        if (options.couponRace) throw new Error('response lost after creating coupon')
        return value
      },
    },
    promotionCodes: {
      list: async () => ({ data: promotions, has_more: false }),
      create: async (params: any, request: any) => {
        calls.promotions.push({ params, request })
        const value = { ...promotion(params.promotion.coupon), ...params, ...options.promotion }
        promotions.push(value)
        if (options.promotionRace) throw new Error('response lost after creating code')
        return value
      },
    },
  }
  return { stripe: stripe as unknown as Parameters<typeof configureStripePromotion>[0], calls, coupons, promotions, coupon, promotion }
}
const conflict = (error: unknown) => error instanceof CheckoutProblem && error.code === 'PROMO_SETUP_CONFLICT'

test('default setup check is read-only when the promotion is missing', async () => {
  const mock = setupMock()
  const result = await configureStripePromotion(mock.stripe, { environment: {} })
  assert.equal(result.ready, false)
  assert.equal(result.mode, 'TEST')
  assert.equal(result.scope, 'order')
  assert.equal(mock.calls.prices.length, 3)
  assert.equal(mock.calls.coupons.length, 0)
  assert.equal(mock.calls.promotions.length, 0)
})

test('explicit apply creates a $100 per-order coupon and current-API native code', async () => {
  const mock = setupMock()
  const result = await configureStripePromotion(mock.stripe, { apply: true, environment: {} })
  assert.equal(result.ready, true)
  assert.equal(result.createdCoupon, true)
  assert.equal(result.createdPromotion, true)
  assert.equal(mock.calls.coupons[0].params.amount_off, 10000)
  assert.deepEqual(mock.calls.coupons[0].params.applies_to.products, ['prod_gala', 'prod_regular', 'prod_vip'])
  const params = mock.calls.promotions[0].params
  assert.equal(params.code, 'DOMINION100')
  assert.deepEqual(params.promotion, { type: 'coupon', coupon: result.couponId })
  assert.equal('coupon' in params, false)
  assert.equal(params.customer, undefined)
  assert.equal(params.max_redemptions, undefined)
  assert.equal(params.expires_at, undefined)
})

test('setup reruns and readiness checks reuse existing Stripe resources', async () => {
  const mock = setupMock()
  const first = await configureStripePromotion(mock.stripe, { apply: true, environment: {} })
  const second = await configureStripePromotion(mock.stripe, { apply: true, environment: {} })
  const check = await configureStripePromotion(mock.stripe, { environment: {} })
  assert.equal(second.couponId, first.couponId)
  assert.equal(second.createdCoupon, false)
  assert.equal(second.createdPromotion, false)
  assert.equal(check.ready, true)
  assert.equal(mock.calls.coupons.length, 1)
  assert.equal(mock.calls.promotions.length, 1)
})

test('a semantically matching pre-existing public code is reused without changes', async () => {
  const mock = setupMock()
  mock.coupons.set('existing_coupon', mock.coupon())
  mock.promotions.push(mock.promotion())
  const result = await configureStripePromotion(mock.stripe, { apply: true, environment: {} })
  assert.equal(result.couponId, 'existing_coupon')
  assert.equal(result.ready, true)
  assert.equal(mock.calls.coupons.length, 0)
  assert.equal(mock.calls.promotions.length, 0)
})

test('incorrect ticket prices fail before creating or modifying offers', async () => {
  const mock = setupMock({ price: { unit_amount: 1 } })
  await assert.rejects(configureStripePromotion(mock.stripe, { apply: true, environment: {} }), (error: unknown) => error instanceof CheckoutProblem && error.code === 'STRIPE_PRICE_MISMATCH')
  assert.equal(mock.calls.coupons.length, 0)
  assert.equal(mock.calls.promotions.length, 0)
})

test('existing wrong discount amount, scope or product eligibility is never overwritten', async () => {
  for (const coupon of [{ amount_off: 20000 }, { percent_off: 10 }, { currency: 'eur' }, { applies_to: { products: ['prod_other'] } }, { max_redemptions: 10 }, { redeem_by: 9999999999 }, { duration: 'forever' }, { valid: false }]) {
    const mock = setupMock({ coupon })
    mock.coupons.set('existing_coupon', mock.coupon())
    mock.promotions.push(mock.promotion())
    await assert.rejects(configureStripePromotion(mock.stripe, { apply: true, environment: {} }), conflict)
    assert.equal(mock.calls.coupons.length, 0)
    assert.equal(mock.calls.promotions.length, 0)
  }
})

test('customer, expiry and redemption restrictions cause a safe setup conflict', async () => {
  for (const promotion of [{ customer: 'cus_existing' }, { customer_account: 'acct_existing' }, { expires_at: 9999999999 }, { max_redemptions: 5 }, { restrictions: { first_time_transaction: true } }, { restrictions: { minimum_amount: 50000 } }]) {
    const mock = setupMock({ promotion })
    mock.coupons.set('existing_coupon', mock.coupon())
    mock.promotions.push(mock.promotion())
    await assert.rejects(configureStripePromotion(mock.stripe, { apply: true, environment: {} }), conflict)
    assert.equal(mock.calls.coupons.length, 0)
    assert.equal(mock.calls.promotions.length, 0)
  }
})

test('concurrent or lost creation responses recover the same checked resources', async () => {
  const mock = setupMock({ couponRace: true, promotionRace: true })
  const result = await configureStripePromotion(mock.stripe, { apply: true, environment: {} })
  assert.equal(result.ready, true)
  assert.equal(mock.calls.coupons.length, 1)
  assert.equal(mock.calls.promotions.length, 1)
})

test('configured code is normalized and invalid configuration makes no requests', async () => {
  const mock = setupMock()
  const result = await configureStripePromotion(mock.stripe, { apply: true, environment: { DOMINION_PROMO_CODE: ' new100 ' } })
  assert.equal(result.code, 'NEW100')
  const bad = setupMock()
  await assert.rejects(configureStripePromotion(bad.stripe, { apply: true, environment: { DOMINION_PROMO_CODE: 'not a code' } }))
  assert.equal(bad.calls.prices.length, 0)
})
