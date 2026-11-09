/** All monetary values are integer USD cents, before a code is entered on Stripe. */
export type TicketQuote = {
  ticketId: string
  quantity: number
  currency: 'usd'
  unitAmount: number
  subtotal: number
  /** Kept at zero for compatibility with the previous quote response. */
  discountPerTicket: 0
  discountAmount: 0
  total: number
  /** Codes are entered on Stripe, never applied by this quote endpoint. */
  promoCode: null
}
