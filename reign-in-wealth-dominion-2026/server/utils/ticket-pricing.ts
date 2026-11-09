import { site } from '../../app/data/site.ts'
import type { TicketQuote } from '../../shared/types/ticket-pricing.ts'

/** Stripe's native fixed-amount coupon applies once to the order subtotal. */
export const PROMO_DISCOUNT_AMOUNT = 10_000

export type PromoEnvironment = {
  DOMINION_PROMO_CODE?: string
  DOMINION_PROMO_ENABLED?: string
}

export class CheckoutProblem extends Error {
  readonly statusCode: number
  readonly code: string

  constructor(statusCode: number, code: string, message: string) {
    super(message)
    this.name = 'CheckoutProblem'
    this.statusCode = statusCode
    this.code = code
  }
}

export function asObject(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {}
}

export function promotionConfiguration(environment: PromoEnvironment = process.env) {
  const code = (environment.DOMINION_PROMO_CODE?.trim() || 'DOMINION100').toUpperCase()
  return {
    code,
    enabled: environment.DOMINION_PROMO_ENABLED?.trim().toLowerCase() !== 'false',
    valid: /^[A-Z0-9-]{1,64}$/.test(code),
  }
}

/** Configured offer visibility, not a live check that the Stripe code exists. */
export function promotionStatus(environment: PromoEnvironment = process.env) {
  const promotion = promotionConfiguration(environment)
  return {
    enabled: promotion.enabled && promotion.valid,
    discountAmount: PROMO_DISCOUNT_AMOUNT,
    scope: 'order' as const,
    currency: 'usd' as const,
  }
}

export function quoteTicket(input: unknown): TicketQuote {
  const body = asObject(input)
  const ticket = site.tickets.find((item) => item.id === body.ticketId)

  if (!ticket) {
    throw new CheckoutProblem(400, 'INVALID_TICKET', 'Please select a valid ticket.')
  }

  const quantity = body.quantity
  if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
    throw new CheckoutProblem(400, 'INVALID_QUANTITY', 'Please choose between 1 and 20 tickets.')
  }

  // An old browser tab must not silently lose a previously entered code.
  if (body.promoCode != null && (typeof body.promoCode !== 'string' || body.promoCode.trim())) {
    throw new CheckoutProblem(400, 'PROMO_ON_STRIPE', 'Promo codes are now entered on the Stripe payment page. Refresh this page and continue to Stripe to apply your code.')
  }

  const unitAmount = ticket.price * 100
  if (ticket.currency !== 'USD' || !Number.isSafeInteger(unitAmount) || unitAmount <= PROMO_DISCOUNT_AMOUNT) {
    throw new CheckoutProblem(503, 'INVALID_CATALOGUE', 'Ticket pricing is temporarily unavailable.')
  }

  const subtotal = unitAmount * quantity
  return {
    ticketId: ticket.id,
    quantity,
    currency: 'usd',
    unitAmount,
    subtotal,
    discountPerTicket: 0,
    discountAmount: 0,
    total: subtotal,
    promoCode: null,
  }
}
