import assert from 'node:assert/strict'
import { test } from 'node:test'
import { site } from '../app/data/site.ts'
import { CheckoutProblem, promotionStatus, quoteTicket } from '../server/utils/ticket-pricing.ts'
import { createTicketCheckout, paidPromotionCode, redactStripeMessage, StripeProviderProblem } from '../server/utils/ticket-checkout.ts'

const origin = 'https://reigninwealthconference.com'
const attendee = { name: 'Conference Guest', email: 'guest@example.com' }
const prices = { regular: 25_000, vip: 39_700, gala: 19_700 }
const body = (ticketId = 'vip', quantity = 1) => ({ ticketId, quantity, attendee })
const problem = (code: string) => (error: unknown) => error instanceof CheckoutProblem && error.code === code

function mockStripe(options: {
  price?: Record<string, unknown>
  session?: Record<string, unknown>
  priceFailure?: Error
  sessionFailure?: Error
} = {}) {
  const calls = { price: [] as string[], sessions: [] as any[], expired: [] as string[] }
  const stripe = {
    prices: { retrieve: async (id: string) => {
      calls.price.push(id)
      if (options.priceFailure) throw options.priceFailure
      const ticket = site.tickets.find(item => item.stripePriceId === id)!
      return { id, active: true, type: 'one_time', billing_scheme: 'per_unit', currency: 'usd', unit_amount: prices[ticket.id as keyof typeof prices], product: `prod_${ticket.id}`, transform_quantity: null, ...options.price }
    } },
    // Deliberately no coupon or promotion APIs: customer checkout cannot need them.
    checkout: { sessions: {
      create: async (params: any) => {
        calls.sessions.push(params)
        if (options.sessionFailure) throw options.sessionFailure
        const ticket = site.tickets.find(item => item.stripePriceId === params.line_items[0].price)!
        const subtotal = prices[ticket.id as keyof typeof prices] * params.line_items[0].quantity
        return { id: 'cs_test_example', url: 'https://checkout.stripe.com/c/pay/cs_test_example', currency: 'usd', amount_subtotal: subtotal, amount_total: subtotal, total_details: { amount_discount: 0 }, ...options.session }
      },
      expire: async (id: string) => { calls.expired.push(id) },
    } },
  }
  return { stripe: stripe as unknown as Parameters<typeof createTicketCheckout>[1], calls }
}

for (const [ticketId, unitAmount] of Object.entries(prices)) {
  test(`${ticketId}: keeps the full catalogue price and opens Stripe code entry`, async () => {
    for (const quantity of [1, 2, 20]) {
      const quote = quoteTicket(body(ticketId, quantity))
      assert.equal(quote.unitAmount, unitAmount)
      assert.equal(quote.total, unitAmount * quantity)
      assert.equal(quote.discountAmount, 0)
      assert.equal(quote.promoCode, null)
      const mock = mockStripe()
      await createTicketCheckout(body(ticketId, quantity), mock.stripe, origin, {})
      const session = mock.calls.sessions[0]
      assert.deepEqual(session.line_items, [{ price: site.tickets.find(item => item.id === ticketId)!.stripePriceId, quantity }])
      assert.equal(session.allow_promotion_codes, true)
      assert.equal('discounts' in session, false)
      assert.equal('expectedTotal' in session.metadata, false)
      assert.equal('promoCode' in session.metadata, false)
    }
  })
}

test('blank legacy fields remain compatible; entered codes tell old tabs to refresh', async () => {
  for (const promoCode of [undefined, null, '', '   ']) assert.equal(quoteTicket({ ...body(), promoCode }).total, 39700)
  for (const promoCode of ['DOMINION100', 'wrong', 0, false, [], {}]) {
    const mock = mockStripe()
    await assert.rejects(createTicketCheckout({ ...body(), promoCode }, mock.stripe, origin, {}), problem('PROMO_ON_STRIPE'))
    assert.equal(mock.calls.price.length, 0)
  }
})

test('invalid quantities and ticket IDs are rejected', () => {
  for (const quantity of [0, -1, 21, 1.2, Number.NaN, Infinity, '2', null, true]) {
    assert.throws(() => quoteTicket({ ...body(), quantity }), problem('INVALID_QUANTITY'))
  }
  assert.throws(() => quoteTicket(body('unknown')), problem('INVALID_TICKET'))
})

test('client monetary/Stripe fields cannot discount or select a different price', async () => {
  const mock = mockStripe()
  await createTicketCheckout({ ...body('vip', 2), total: 1, unitAmount: 1, discountAmount: 99_999, couponId: 'evil', stripePriceId: 'evil', discounts: [{ coupon: 'evil' }] }, mock.stripe, origin, {})
  const params = mock.calls.sessions[0]
  assert.equal(params.line_items[0].price, site.tickets.find(ticket => ticket.id === 'vip')!.stripePriceId)
  assert.equal(params.line_items[0].quantity, 2)
  assert.equal(params.discounts, undefined)
})

test('invalid attendee input makes no provider requests', async () => {
  for (const [input, code] of [[{ ...body(), attendee: { name: 'A', email: attendee.email } }, 'INVALID_ATTENDEE_NAME'], [{ ...body(), attendee: { name: attendee.name, email: 'invalid' } }, 'INVALID_ATTENDEE_EMAIL']] as const) {
    const mock = mockStripe()
    await assert.rejects(createTicketCheckout(input, mock.stripe, origin, {}), problem(code))
    assert.equal(mock.calls.price.length, 0)
  }
})

test('disabled promotion removes Stripe entry without blocking base-price purchases', async () => {
  const mock = mockStripe()
  await createTicketCheckout(body(), mock.stripe, origin, { DOMINION_PROMO_ENABLED: 'false' })
  assert.equal(mock.calls.sessions[0].allow_promotion_codes, false)
  assert.deepEqual(promotionStatus({}), { enabled: true, discountAmount: 10000, scope: 'order', currency: 'usd' })
  assert.equal(promotionStatus({ DOMINION_PROMO_CODE: 'bad code' }).enabled, false)
  assert.equal('code' in promotionStatus({}), false)
})

test('canonical redirects and existing fulfillment metadata are preserved', async () => {
  const mock = mockStripe()
  await createTicketCheckout(body(), mock.stripe, `${origin}/`, {})
  const params = mock.calls.sessions[0]
  assert.equal(params.success_url, `${origin}/tickets/success?session_id={CHECKOUT_SESSION_ID}`)
  assert.equal(params.cancel_url, `${origin}/tickets`)
  assert.equal(params.metadata.ticketId, 'vip')
  assert.equal(params.metadata.attendeeEmail, attendee.email)
  assert.equal(params.metadata.quantity, '1')
  assert.equal(params.metadata.pricingVersion, 'dominion2026-native-promo-v2')
  assert.deepEqual(params.payment_intent_data.metadata, params.metadata)
})

test('price, currency, activity and quantity semantics must match the catalogue', async () => {
  for (const price of [{ unit_amount: 29700 }, { currency: 'eur' }, { active: false }, { type: 'recurring' }, { billing_scheme: 'tiered' }, { transform_quantity: { divide_by: 2 } }, { product: { id: 'prod_vip', active: false } }]) {
    const mock = mockStripe({ price })
    await assert.rejects(createTicketCheckout(body(), mock.stripe, origin, {}), problem('STRIPE_PRICE_MISMATCH'))
    assert.equal(mock.calls.sessions.length, 0)
  }
})

test('incorrect initial Stripe totals are withheld and expiration is attempted', async () => {
  for (const session of [{ amount_total: 29700 }, { amount_subtotal: 1 }, { currency: 'eur' }, { total_details: { amount_discount: 10000 } }, { url: null }]) {
    const mock = mockStripe({ session })
    await assert.rejects(createTicketCheckout(body(), mock.stripe, origin, {}), problem('STRIPE_TOTAL_MISMATCH'))
    assert.equal(mock.calls.expired.length, 1)
  }
})

test('provider errors carry the failing phase and safe request identifiers', async () => {
  const providerError = Object.assign(new Error('No such price'), { type: 'StripeInvalidRequestError', code: 'resource_missing', param: 'line_items[0][price]', requestId: 'req_example' })
  for (const [option, phase] of [['priceFailure', 'price_lookup'], ['sessionFailure', 'session_create']] as const) {
    const mock = mockStripe({ [option]: providerError })
    await assert.rejects(createTicketCheckout(body(), mock.stripe, origin, {}), (error: unknown) => {
      assert.ok(error instanceof StripeProviderProblem)
      assert.equal(error.diagnostic.phase, phase)
      assert.equal(error.diagnostic.requestId, 'req_example')
      assert.equal(error.diagnostic.code, 'resource_missing')
      return true
    })
  }
})

test('Stripe diagnostic messages redact credentials and email addresses', () => {
  const key = ['sk', 'live', 'not_a_real_diagnostic_test_credential'].join('_')
  const secret = ['whsec', 'not_a_real_diagnostic_webhook_value'].join('_')
  const message = redactStripeMessage(`Invalid API Key: ${key}; webhook ${secret} guest@example.com`)
  assert.ok(!message.includes(key))
  assert.ok(!message.includes(secret))
  assert.ok(!message.includes('guest@example.com'))
})

test('production redirects require a configured HTTPS origin', async () => {
  for (const value of ['', 'not a URL', 'http://example.com', `${origin}/path`, `${origin}?q=x`, 'https://user:pass@example.com']) {
    const mock = mockStripe()
    await assert.rejects(createTicketCheckout(body(), mock.stripe, value, {}), problem('INVALID_SITE_URL'))
    assert.equal(mock.calls.price.length, 0)
  }
})

test('paid native promotions use Stripe data and preserve actual discounted totals', async () => {
  const session = { amount_total: 69400, amount_subtotal: 79400, total_details: { amount_discount: 10000 }, discounts: [{ promotion_code: 'promo_real' }], metadata: { pricingVersion: 'dominion2026-native-promo-v2', promoCode: 'UNTRUSTED' } } as any
  const stripe = { promotionCodes: { retrieve: async (id: string) => { assert.equal(id, 'promo_real'); return { code: 'DOMINION100' } } } } as any
  assert.equal(await paidPromotionCode(session, stripe), 'DOMINION100')
  assert.equal(session.amount_total, 69400)
  assert.equal(await paidPromotionCode({ ...session, discounts: [{ promotion_code: { code: 'OTHER_VALID_CODE' } }] }, stripe), 'OTHER_VALID_CODE')
  assert.equal(await paidPromotionCode({ ...session, discounts: [], total_details: { amount_discount: 0 } }, stripe), null)
  assert.equal(await paidPromotionCode({ ...session, discounts: [] }, stripe), null)
})

test('failed promo lookup cannot prevent paid registration; legacy metadata remains readable', async () => {
  const session = { total_details: { amount_discount: 10000 }, discounts: [{ promotion_code: 'promo_missing' }], metadata: { pricingVersion: 'dominion2026-native-promo-v2' } } as any
  const stripe = { promotionCodes: { retrieve: async () => { throw new Error('temporary network failure') } } } as any
  const originalWarn = console.warn
  console.warn = () => {}
  try { assert.equal(await paidPromotionCode(session, stripe), null) } finally { console.warn = originalWarn }
  assert.equal(await paidPromotionCode({ ...session, discounts: [], metadata: { pricingVersion: 'dominion2026-promo-v1', promoCode: 'OLD100' } }, stripe), 'OLD100')
})
