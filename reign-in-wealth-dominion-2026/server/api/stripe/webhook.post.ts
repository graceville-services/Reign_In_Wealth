
import Stripe from 'stripe'
import {
  getStripeClient,
  processPaidSession,
} from '../../utils/dominion-registration'

export default defineEventHandler(async (event) => {
  // Validate configuration when a webhook request arrives,
  // not while Nitro is loading the route module.
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Stripe webhook is not configured.',
    })
  }

  const signature = getHeader(event, 'stripe-signature')
  const rawBody = await readRawBody(event)

  if (!signature || !rawBody) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing Stripe signature or request body.',
    })
  }

  let stripeEvent: Stripe.Event

  try {
    const stripe = getStripeClient()

    stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecret,
    )
  } catch (error) {
    console.error(
      'Stripe webhook signature verification failed:',
      error,
    )

    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid Stripe webhook signature.',
    })
  }

  if (
    stripeEvent.type === 'checkout.session.completed' ||
    stripeEvent.type === 'checkout.session.async_payment_succeeded'
  ) {
    const session = stripeEvent.data.object as Stripe.Checkout.Session

    try {
      const result = await processPaidSession(session.id)

      if (result.emailErrors?.length) {
        throw new Error(
          `Email delivery needs retry: ${result.emailErrors.join(', ')}`,
        )
      }
    } catch (error) {
      console.error('Stripe webhook processing failed:', {
        eventId: stripeEvent.id,
        sessionId: session.id,
        error,
      })

      // A non-2xx response tells Stripe to retry.
      throw createError({
        statusCode: 500,
        statusMessage: 'Unable to process paid registration.',
      })
    }
  }

  return { received: true }
})
