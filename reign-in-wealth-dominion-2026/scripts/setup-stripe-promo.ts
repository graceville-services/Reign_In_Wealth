#!/usr/bin/env node
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import Stripe from 'stripe'
import { configureStripePromotion } from '../server/utils/stripe-promo-setup.ts'
import { CheckoutProblem } from '../server/utils/ticket-pricing.ts'
import { stripeDiagnostic } from '../server/utils/ticket-checkout.ts'

async function main() {
  const args = process.argv.slice(2)
  if (args.includes('--help')) {
    console.log('Usage: node --experimental-strip-types scripts/setup-stripe-promo.ts [--check | --apply]')
    console.log('--check (default): read-only readiness check. --apply: create/reuse the $100 USD per-order coupon and promotion code in the configured Stripe account.')
    return
  }
  if (args.some(arg => !['--check', '--apply'].includes(arg)) || (args.includes('--check') && args.includes('--apply'))) {
    throw new Error('Use either --check (read-only) or --apply, not both. See --help.')
  }
  const envPath = fileURLToPath(new URL('../.env', import.meta.url))
  if (existsSync(envPath)) process.loadEnvFile(envPath)
  const key = process.env.STRIPE_SECRET_KEY
  if (!key || key === 'replace_with_your_stripe_secret_key') throw new Error('Set STRIPE_SECRET_KEY in the application .env or deployment environment. Never paste it into chat.')
  const apply = args.includes('--apply')
  console.log(apply ? 'Applying native Stripe promotion setup in the configured account.' : 'Checking native Stripe promotion readiness (read-only).')
  const result = await configureStripePromotion(new Stripe(key), { apply })
  console.log(JSON.stringify(result, null, 2))
  if (!result.ready) {
    console.log('No changes made. Run again with --apply to create the native promotion.')
    process.exitCode = 2
  } else {
    console.log(`Ready: ${result.code} gives $100 USD off the order subtotal in ${result.mode} mode. Enter it on Stripe Checkout.`)
    if (!result.entryEnabled) console.log('DOMINION_PROMO_ENABLED=false currently hides the promotion field on new website checkouts.')
  }
}

main().catch((error: unknown) => {
  if (error instanceof CheckoutProblem) console.error(`${error.code}: ${error.message}`)
  else console.error('Stripe promotion setup failed:', stripeDiagnostic(error, 'promo_setup'))
  process.exitCode = 1
})
