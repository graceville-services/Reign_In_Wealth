import Stripe from 'stripe'
import { sendTicketWelcomeEmail } from '~/server/utils/ticketEmail'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export default defineEventHandler(async (event) => {
  const signature = getHeader(
    event,
    'stripe-signature',
  )

  if (!signature) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing Stripe signature.',
    })
  }

  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Stripe webhook secret is not configured.',
    })
  }

  const rawBody = await readRawBody(event)

  if (!rawBody) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing webhook body.',
    })
  }

  let stripeEvent: Stripe.Event

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecret,
    )
  } catch (error: any) {
    console.error(
      'Stripe webhook signature verification failed:',
      error?.message,
    )

    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid Stripe webhook signature.',
    })
  }

  console.log(
    `[Stripe] Received event: ${stripeEvent.type}`,
  )

  // --------------------------------
  // Completed Checkout
  // --------------------------------

  if (
    stripeEvent.type === 'checkout.session.completed'
  ) {
    const session =
      stripeEvent.data.object as Stripe.Checkout.Session

    await handlePaidCheckout(session)
  }

  // --------------------------------
  // Delayed payment completed
  // --------------------------------

  if (
    stripeEvent.type ===
    'checkout.session.async_payment_succeeded'
  ) {
    const session =
      stripeEvent.data.object as Stripe.Checkout.Session

    await handlePaidCheckout(session)
  }

  return {
    received: true,
  }
})


async function handlePaidCheckout(
  session: Stripe.Checkout.Session,
) {
  // --------------------------------
  // Only process actual paid sessions
  // --------------------------------

  if (session.payment_status !== 'paid') {
    console.log(
      `[Stripe] Session ${session.id} is not paid yet.`,
    )

    return
  }

  const metadata = session.metadata || {}

  const ticketId = metadata.ticketId || ''
  const ticketName = metadata.ticketName || ''
  const attendeeName =
    metadata.attendeeName ||
    session.customer_details?.name ||
    ''

  const attendeeEmail =
    metadata.attendeeEmail ||
    session.customer_details?.email ||
    session.customer_email ||
    ''

  const quantity = Number(
    metadata.quantity || 1,
  )

  // --------------------------------
  // Validate information
  // --------------------------------

  if (!ticketId) {
    console.error(
      `[Stripe] Missing ticketId for ${session.id}`,
    )

    return
  }

  if (!ticketName) {
    console.error(
      `[Stripe] Missing ticketName for ${session.id}`,
    )

    return
  }

  if (!attendeeName) {
    console.error(
      `[Stripe] Missing attendee name for ${session.id}`,
    )

    return
  }

  if (!attendeeEmail) {
    console.error(
      `[Stripe] Missing attendee email for ${session.id}`,
    )

    return
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    console.error(
      `[Stripe] Invalid quantity for ${session.id}`,
    )

    return
  }

  // --------------------------------
  // Send welcome email
  // --------------------------------

  try {
    const email = await sendTicketWelcomeEmail({
      sessionId: session.id,
      attendeeName,
      attendeeEmail,
      ticketName,
      quantity,
    })

    console.log(
      `[Stripe] Welcome email sent for ${session.id}:`,
      email?.id,
    )
  } catch (error: any) {
    console.error(
      `[Stripe] Welcome email failed for ${session.id}:`,
      error?.message || error,
    )

    // Throwing causes Stripe to retry the webhook.
    // Resend's idempotency key prevents duplicate emails
    // when the same request is retried.
    throw createError({
      statusCode: 500,
      statusMessage: 'Welcome email could not be sent.',
    })
  }
}