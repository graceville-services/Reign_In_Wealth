import Stripe from 'stripe'
import { createTicketCheckout, stripeDiagnostic, StripeProviderProblem } from '../utils/ticket-checkout.ts'
import { CheckoutProblem } from '../utils/ticket-pricing.ts'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw createError({ statusCode: 503, statusMessage: 'Checkout is temporarily unavailable. Please contact the event organizer.', data: { code: 'MISSING_STRIPE_SECRET' } })
  }

  try {
    return await createTicketCheckout(body, new Stripe(key), process.env.NUXT_PUBLIC_SITE_URL || '')
  } catch (error) {
    if (error instanceof CheckoutProblem) {
      if (error.statusCode >= 500) console.error('DOMINION checkout configuration error:', error.code)
      throw createError({ statusCode: error.statusCode, statusMessage: error.message, data: { code: error.code } })
    }
    const diagnostic = error instanceof StripeProviderProblem
      ? error.diagnostic
      : stripeDiagnostic(error, 'session_create')
    // Redacted provider detail belongs in server logs. The response contains
    // only diagnostic identifiers, never keys, attendee details, or raw objects.
    console.error('DOMINION Stripe checkout failed:', diagnostic)
    const { message: _message, ...provider } = diagnostic
    throw createError({
      statusCode: 502,
      statusMessage: 'Secure checkout could not be started. Please try again.',
      data: { code: 'CHECKOUT_PROVIDER_ERROR', provider },
    })
  }
})
