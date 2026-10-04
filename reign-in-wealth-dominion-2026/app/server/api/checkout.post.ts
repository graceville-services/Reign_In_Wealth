import Stripe from 'stripe'
import { site } from '~/data/site'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const ticketId = String(body?.ticketId || '')
  const quantity = Number(body?.quantity)

  const name = String(body?.attendee?.name || '').trim()
  const email = String(body?.attendee?.email || '')
    .trim()
    .toLowerCase()

  // -----------------------------
  // Validate ticket
  // -----------------------------

  const ticket = site.tickets.find(
    (item) => item.id === ticketId
  )

  if (!ticket) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid ticket.',
    })
  }

  // -----------------------------
  // Validate quantity
  // -----------------------------

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid ticket quantity.',
    })
  }

  // -----------------------------
  // Validate attendee
  // -----------------------------

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Attendee name is required.',
    })
  }

  if (!email || !email.includes('@')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'A valid email address is required.',
    })
  }

  // -----------------------------
  // Make sure Stripe Price exists
  // -----------------------------

  if (!ticket.stripePriceId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'This ticket is not configured for checkout yet.',
    })
  }

  // -----------------------------
  // Create Stripe Checkout
  // -----------------------------

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',

    line_items: [
      {
        price: ticket.stripePriceId,
        quantity,
      },
    ],

    customer_email: email,

    client_reference_id: ticket.id,

    metadata: {
      ticketId: ticket.id,
      ticketName: ticket.name,
      quantity: String(quantity),
      attendeeName: name,
      attendeeEmail: email,
    },

    payment_intent_data: {
      metadata: {
        ticketId: ticket.id,
        ticketName: ticket.name,
        attendeeName: name,
        attendeeEmail: email,
      },
    },

    success_url:
      `${process.env.NUXT_PUBLIC_SITE_URL}/tickets/success?session_id={CHECKOUT_SESSION_ID}`,

    cancel_url:
      `${process.env.NUXT_PUBLIC_SITE_URL}/tickets`,
  })

  return {
    url: session.url,
    sessionId: session.id,
  }
})