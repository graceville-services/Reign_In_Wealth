import Stripe from 'stripe'
import { site } from '~/data/site'

const stripeKey = process.env.STRIPE_SECRET_KEY

if (!stripeKey) {
  throw new Error('STRIPE_SECRET_KEY is not configured.')
}

const stripe = new Stripe(stripeKey)

console.log('Stripe configuration:', {
  hasKey: true,
  mode: stripeKey.startsWith('sk_test_')
    ? 'TEST'
    : stripeKey.startsWith('sk_live_')
      ? 'LIVE'
      : 'UNKNOWN',
  keyPrefix: stripeKey.slice(0, 12),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const ticketId = String(body?.ticketId || '')
  const quantity = Number(body?.quantity)

  const name = String(body?.attendee?.name || '').trim()

  const email = String(body?.attendee?.email || '')
    .trim()
    .toLowerCase()

  // ============================================================
  // 1. Validate ticket
  // ============================================================

  const ticket = site.tickets.find(
    (item) => item.id === ticketId,
  )

  if (!ticket) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid ticket.',
    })
  }

  // ============================================================
  // 2. Validate quantity
  // ============================================================

  if (
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    quantity > 20
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid ticket quantity.',
    })
  }

  // ============================================================
  // 3. Validate attendee
  // ============================================================

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

  // ============================================================
  // 4. Validate Stripe Price ID
  // ============================================================

  if (!ticket.stripePriceId) {
    throw createError({
      statusCode: 500,
      statusMessage:
        'This ticket is not configured for Stripe checkout yet.',
    })
  }

  console.log('========================================')
  console.log('STRIPE CHECKOUT DEBUG')
  console.log('========================================')

  console.log('Ticket:', {
    id: ticket.id,
    name: ticket.name,
    stripePriceId: ticket.stripePriceId,
    quantity,
  })

  // ============================================================
// 5. Verify authenticated Stripe account
// ============================================================

let account: Stripe.Account | undefined

try {
  account = await stripe.accounts.retrieve()

  console.log('Stripe account:', {
    id: account.id,
    email: account.email,
  })
} catch (error: any) {
  console.error('STRIPE ACCOUNT LOOKUP FAILED:', {
    message: error?.message,
    type: error?.type,
    code: error?.code,
    statusCode: error?.statusCode,
    requestId: error?.requestId,
  })

  throw createError({
    statusCode: 500,
    statusMessage:
      'Stripe authentication failed. Check STRIPE_SECRET_KEY.',
  })
}

// ============================================================
// 6. List products visible to this Stripe key
// ============================================================

try {
  const products = await stripe.products.list({
    limit: 100,
  })

  console.log(
    'Stripe products visible to this key:',
    products.data.map((product) => ({
      id: product.id,
      name: product.name,
      active: product.active,
      livemode: product.livemode,
    })),
  )
} catch (error: any) {
  console.error('STRIPE PRODUCT LIST FAILED:', {
    message: error?.message,
    type: error?.type,
    code: error?.code,
    statusCode: error?.statusCode,
    requestId: error?.requestId,
  })
}

// ============================================================
// 7. Determine current key mode
// ============================================================

const keyMode = stripeKey.startsWith('sk_test_')
  ? 'TEST'
  : stripeKey.startsWith('sk_live_')
    ? 'LIVE'
    : 'UNKNOWN'

console.log('Stripe mode:', keyMode)

// ============================================================
// 8. Retrieve the Price
// ============================================================

let price: Stripe.Price

try {
  price = await stripe.prices.retrieve(
    ticket.stripePriceId,
  )

  console.log('Stripe price found:', {
    id: price.id,
    active: price.active,
    livemode: price.livemode,
    currency: price.currency,
    unit_amount: price.unit_amount,
    type: price.type,
    product: price.product,
  })
} catch (error: any) {
  console.error('========================================')
  console.error('STRIPE PRICE LOOKUP FAILED')
  console.error('========================================')

  console.error({
    priceId: ticket.stripePriceId,

    // IMPORTANT: optional chaining so our
    // debugging code cannot hide Stripe's error
    accountId: account?.id,

    keyMode,
    message: error?.message,
    type: error?.type,
    code: error?.code,
    statusCode: error?.statusCode,
    requestId: error?.requestId,
  })

  throw createError({
    statusCode: 500,
    statusMessage:
      error?.message ||
      'Stripe could not retrieve the configured Price.',
  })
}

  // ============================================================
  // 9. Make sure Price is active
  // ============================================================

  if (!price.active) {
    throw createError({
      statusCode: 500,
      statusMessage:
        'The configured Stripe Price is inactive.',
    })
  }

  // ============================================================
  // 10. Verify configured prices
  // ============================================================

  console.log('Configured prices:', {
    regular: site.tickets.find(
      (t) => t.id === 'regular',
    )?.stripePriceId,

    vip: site.tickets.find(
      (t) => t.id === 'vip',
    )?.stripePriceId,

    gala: site.tickets.find(
      (t) => t.id === 'gala',
    )?.stripePriceId,
  })

  // ============================================================
  // 11. Create Checkout Session
  // ============================================================

  try {
    const session =
      await stripe.checkout.sessions.create({
        mode: 'payment',

        line_items: [
          {
            price: price.id,
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
            quantity: String(quantity),
            attendeeName: name,
            attendeeEmail: email,
          },
        },

        success_url:
          `${process.env.NUXT_PUBLIC_SITE_URL}/tickets/success?session_id={CHECKOUT_SESSION_ID}`,

        cancel_url:
          `${process.env.NUXT_PUBLIC_SITE_URL}/tickets`,
      })

    console.log('Checkout Session created:', {
      id: session.id,
      url: session.url,
      mode: session.mode,
      paymentStatus: session.payment_status,
    })

    console.log('========================================')

    return {
      url: session.url,
      sessionId: session.id,
    }
  } catch (error: any) {
    console.error('========================================')
    console.error('STRIPE CHECKOUT SESSION FAILED')
    console.error('========================================')

    console.error({
      message: error?.message,
      type: error?.type,
      code: error?.code,
      statusCode: error?.statusCode,
      requestId: error?.requestId,
    })

    throw createError({
      statusCode: 500,
      statusMessage:
        error?.message ||
        'Unable to create Stripe Checkout Session.',
    })
  }
})