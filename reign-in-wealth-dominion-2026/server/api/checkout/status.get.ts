import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const sessionId = String(
    query.session_id || '',
  )

  if (!sessionId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing checkout session.',
    })
  }

  let session: Stripe.Checkout.Session

  try {
    session =
      await stripe.checkout.sessions.retrieve(
        sessionId,
      )
  } catch {
    throw createError({
      statusCode: 404,
      statusMessage: 'Checkout session not found.',
    })
  }

  return {
    paid: session.payment_status === 'paid',

    status: session.status,

    ticketName:
      session.metadata?.ticketName || null,

    quantity:
      Number(session.metadata?.quantity || 1),

    attendeeName:
      session.metadata?.attendeeName ||
      session.customer_details?.name ||
      null,

    attendeeEmail:
      session.metadata?.attendeeEmail ||
      session.customer_details?.email ||
      session.customer_email ||
      null,
  }
})