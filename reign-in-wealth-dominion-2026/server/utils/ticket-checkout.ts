import type Stripe from 'stripe'
import { site, type Ticket } from '../../app/data/site.ts'
import { asObject, CheckoutProblem, promotionStatus, quoteTicket } from './ticket-pricing.ts'
import type { PromoEnvironment } from './ticket-pricing.ts'

type StripeGateway = Pick<Stripe, 'prices' | 'checkout'>
export type StripePhase = 'price_lookup' | 'session_create' | 'promotion_lookup' | 'promo_setup'

export function redactStripeMessage(value: unknown): string {
  return (typeof value === 'string' ? value : 'Stripe request failed.')
    .replace(/\b(?:sk|rk|pk)_(?:test|live)_[^\s'"`<>]+/gi, '[redacted Stripe key]')
    .replace(/\bwhsec_[^\s'"`<>]+/gi, '[redacted webhook secret]')
    .replace(/\bBearer\s+\S+/gi, 'Bearer [redacted]')
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[redacted email]')
    .slice(0, 1000)
}

function diagnosticToken(value: unknown): string | undefined {
  return typeof value === 'string' && /^[A-Za-z0-9_.\[\]-]{1,180}$/.test(value) ? value : undefined
}

export function stripeDiagnostic(error: unknown, phase: StripePhase) {
  const details = asObject(error)
  return {
    phase,
    type: diagnosticToken(details.type),
    code: diagnosticToken(details.code),
    param: diagnosticToken(details.param),
    requestId: diagnosticToken(details.requestId),
    message: redactStripeMessage(details.message),
  }
}

export class StripeProviderProblem extends Error {
  readonly diagnostic: ReturnType<typeof stripeDiagnostic>

  constructor(error: unknown, phase: StripePhase) {
    super('Secure checkout could not be started. Please try again.')
    this.name = 'StripeProviderProblem'
    this.diagnostic = stripeDiagnostic(error, phase)
  }
}

function configurationError(code: string) {
  return new CheckoutProblem(503, code, 'Checkout is temporarily unavailable. Please contact the event organizer.')
}

function siteOrigin(siteUrl: string) {
  let url: URL
  try { url = new URL(siteUrl) } catch { throw configurationError('INVALID_SITE_URL') }
  const local = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)
  if ((url.protocol !== 'https:' && !(local && url.protocol === 'http:')) || url.username || url.password || url.search || url.hash || url.pathname !== '/') {
    throw configurationError('INVALID_SITE_URL')
  }
  return url.origin
}

/** Also used by the one-time promotion setup preflight. */
export function validateTicketPrice(ticket: Ticket, price: Stripe.Price): string {
  const productId = typeof price.product === 'string' ? price.product : price.product?.id
  const inactiveProduct = typeof price.product === 'object' && price.product !== null && ('deleted' in price.product || !price.product.active)
  if (!price.active || price.type !== 'one_time' || price.billing_scheme !== 'per_unit' || price.currency !== 'usd' || price.unit_amount !== ticket.price * 100 || price.transform_quantity || !productId || inactiveProduct) {
    throw new CheckoutProblem(503, 'STRIPE_PRICE_MISMATCH', `The Stripe price for ${ticket.name} must be an active one-time USD price of $${ticket.price}. Contact the event organizer.`)
  }
  return productId
}

export async function createTicketCheckout(
  input: unknown,
  stripe: StripeGateway,
  configuredSiteUrl: string,
  environment: PromoEnvironment = process.env,
) {
  const quote = quoteTicket(input)
  const body = asObject(input)
  const attendee = asObject(body.attendee)
  const name = typeof attendee.name === 'string' ? attendee.name.trim() : ''
  const email = typeof attendee.email === 'string' ? attendee.email.trim().toLowerCase() : ''
  if (name.length < 2 || name.length > 200) {
    throw new CheckoutProblem(400, 'INVALID_ATTENDEE_NAME', 'Enter your full name (2 to 200 characters).')
  }
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new CheckoutProblem(400, 'INVALID_ATTENDEE_EMAIL', 'Enter a valid email address.')
  }

  const origin = siteOrigin(configuredSiteUrl)
  const ticket = site.tickets.find((item) => item.id === quote.ticketId)!
  if (!ticket.stripePriceId) throw configurationError('MISSING_STRIPE_PRICE')

  let price: Stripe.Price
  try { price = await stripe.prices.retrieve(ticket.stripePriceId) }
  catch (error) { throw new StripeProviderProblem(error, 'price_lookup') }
  validateTicketPrice(ticket, price)

  const metadata = {
    ticketId: ticket.id,
    ticketName: ticket.name,
    quantity: String(quote.quantity),
    attendeeName: name,
    attendeeEmail: email,
    pricingVersion: 'dominion2026-native-promo-v2',
  }

  let session: Stripe.Checkout.Session
  try {
    session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: price.id, quantity: quote.quantity }],
      // Stripe shows its own "Add promotion code" field. No discount is
      // applied or provisioned by this customer request.
      allow_promotion_codes: promotionStatus(environment).enabled,
      adaptive_pricing: { enabled: false },
      customer_email: email,
      client_reference_id: ticket.id,
      metadata,
      payment_intent_data: { metadata },
      success_url: `${origin}/tickets/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/tickets`,
    })
  } catch (error) {
    throw new StripeProviderProblem(error, 'session_create')
  }

  // This is the newly created, undiscounted session. After the customer adds
  // a code on Stripe, fulfillment reads Stripe's actual final paid amount.
  if (!session.url || session.currency !== quote.currency || session.amount_subtotal !== quote.subtotal || session.amount_total !== quote.total || (session.total_details?.amount_discount || 0) !== 0) {
    try { await stripe.checkout.sessions.expire(session.id) } catch { /* Do not return an incorrect payment URL. */ }
    throw configurationError('STRIPE_TOTAL_MISMATCH')
  }
  return { url: session.url, sessionId: session.id }
}

/** Resolve the code from Stripe's paid session, without blocking fulfillment. */
export async function paidPromotionCode(
  session: Stripe.Checkout.Session,
  stripe: Pick<Stripe, 'promotionCodes'>,
): Promise<string | null> {
  if ((session.total_details?.amount_discount || 0) <= 0) return null
  for (const discount of session.discounts || []) {
    const promotion = discount.promotion_code
    if (promotion && typeof promotion === 'object') return promotion.code || null
    if (typeof promotion === 'string') {
      try {
        const resolved = await stripe.promotionCodes.retrieve(promotion)
        return resolved.code || null
      } catch (error) {
        console.warn('DOMINION paid promo lookup failed:', stripeDiagnostic(error, 'promotion_lookup'))
        return null
      }
    }
  }
  // Sessions issued by the earlier installer used server-written metadata.
  // Never label native Stripe discounts using a pre-checkout code or config.
  return session.metadata?.pricingVersion === 'dominion2026-promo-v1'
    ? session.metadata.promoCode || null
    : null
}
