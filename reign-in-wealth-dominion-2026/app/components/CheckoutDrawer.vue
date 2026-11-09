<script setup lang="ts">
import { X, ArrowUpRight, Minus, Plus, ShieldCheck } from 'lucide-vue-next'
import type { Ticket } from '~/data/site'

const props = defineProps<{ open: boolean; ticket: Ticket | null }>()
const emit = defineEmits<{ close: [] }>()
const { checkout, loading, error } = useTicketCheckout()
const promoEnabled = useTicketPromotion()
const attendeeName = ref('')
const attendeeEmail = ref('')
const quantity = ref(1)

const formatMoney = (cents: number) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
}).format(cents / 100)

const subtotal = computed(() => (props.ticket?.price || 0) * 100 * quantity.value)
const canCheckout = computed(() => (
  !!props.ticket &&
  attendeeName.value.trim().length >= 2 &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(attendeeEmail.value.trim()) &&
  Number.isInteger(quantity.value) && quantity.value >= 1 && quantity.value <= 20 &&
  !loading.value
))

function close() {
  if (!loading.value) emit('close')
}

async function submitCheckout() {
  if (!props.ticket || !canCheckout.value) return
  await checkout(props.ticket, quantity.value, {
    name: attendeeName.value.trim(),
    email: attendeeEmail.value.trim().toLowerCase(),
  })
}

watch(() => props.open, (open) => {
  if (import.meta.client) document.body.style.overflow = open ? 'hidden' : ''
  if (open) error.value = ''
}, { immediate: true })

onUnmounted(() => {
  if (import.meta.client) document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open && ticket" class="fixed inset-0 z-[100] flex items-end justify-end" @keydown.esc="close">
        <button type="button" aria-label="Close checkout" class="absolute inset-0 bg-black/75 backdrop-blur-sm" :disabled="loading" @click="close" />

        <aside role="dialog" aria-modal="true" aria-labelledby="checkout-heading" class="relative z-10 flex h-full w-full max-w-xl flex-col overflow-y-auto bg-cream text-ink shadow-2xl">
          <div class="flex items-center justify-between border-b border-ink/10 px-6 py-5 md:px-8">
            <div>
              <div class="eyebrow text-gold-dark">SECURE CHECKOUT</div>
              <h2 id="checkout-heading" class="display mt-2 text-3xl md:text-4xl">Your place in the room.</h2>
            </div>
            <button type="button" aria-label="Close" :disabled="loading" class="grid h-11 w-11 shrink-0 place-items-center border border-ink/10 text-ink transition hover:border-gold-dark hover:text-gold-dark disabled:opacity-40" @click="close">
              <X :size="19" />
            </button>
          </div>

          <div class="flex-1 px-6 py-7 md:px-8 md:py-9">
            <div class="border border-ink/10 bg-white/45 p-5">
              <div class="flex items-start justify-between gap-5">
                <div>
                  <div class="font-mono text-[9px] font-bold uppercase tracking-[.18em] text-gold-dark">{{ ticket.eyebrow }}</div>
                  <h3 class="mt-2 font-serif text-2xl">{{ ticket.name }}</h3>
                </div>
                <div class="shrink-0 text-right">
                  <div class="font-serif text-2xl">{{ formatMoney(ticket.price * 100) }}</div>
                  <div class="mt-1 text-[10px] text-ink/55">USD per ticket</div>
                </div>
              </div>

              <div class="mt-6 flex items-center justify-between border-t border-ink/10 pt-5">
                <div>
                  <div class="text-xs font-bold uppercase tracking-[.12em]">Quantity</div>
                  <div class="mt-1 text-xs text-ink/55">How many seats?</div>
                </div>
                <div class="flex items-center border border-ink/15">
                  <button type="button" aria-label="Decrease quantity" class="grid h-10 w-10 place-items-center transition hover:bg-ink hover:text-cream disabled:opacity-35" :disabled="quantity <= 1 || loading" @click="quantity--">
                    <Minus :size="14" />
                  </button>
                  <span aria-live="polite" class="grid h-10 w-12 place-items-center border-x border-ink/15 font-mono text-sm">{{ quantity }}</span>
                  <button type="button" aria-label="Increase quantity" class="grid h-10 w-10 place-items-center transition hover:bg-ink hover:text-cream disabled:opacity-35" :disabled="quantity >= 20 || loading" @click="quantity++">
                    <Plus :size="14" />
                  </button>
                </div>
              </div>

              <dl aria-live="polite" aria-atomic="true" class="mt-5 border-t border-ink/10 pt-5">
                <div class="flex items-end justify-between gap-4">
                  <dt class="text-xs font-bold uppercase tracking-[.12em]">Subtotal (USD)</dt>
                  <dd class="font-serif text-3xl">{{ formatMoney(subtotal) }}</dd>
                </div>
              </dl>
              <p class="mt-3 text-xs leading-5 text-ink/55">Review your final total on Stripe before paying.</p>
            </div>

            <div v-if="promoEnabled" class="mt-5 border border-gold-dark/25 bg-gold/10 p-5">
              <h3 class="text-xs font-bold uppercase tracking-[.12em]">Have a promo code?</h3>
              <p class="mt-2 text-sm leading-6 text-ink/75">
                Click <strong>Add promotion code</strong> on the next Stripe checkout page.
                A valid $100-off code takes $100 off your order, including orders with multiple tickets.
              </p>
              <p class="mt-2 text-xs leading-5 text-ink/55">Your discount and final total will appear there before you pay.</p>
            </div>

            <div class="mt-8">
              <div class="eyebrow text-gold-dark">ATTENDEE DETAILS</div>
              <div class="mt-5 space-y-5">
                <label class="block">
                  <span class="mb-2 block text-[10px] font-extrabold uppercase tracking-[.16em]">Full name</span>
                  <input v-model="attendeeName" type="text" autocomplete="name" placeholder="Your full name" maxlength="200" :disabled="loading" class="w-full border border-ink/15 bg-white px-4 py-4 text-sm outline-none transition placeholder:text-ink/30 focus:border-gold-dark disabled:opacity-60" />
                </label>
                <label class="block">
                  <span class="mb-2 block text-[10px] font-extrabold uppercase tracking-[.16em]">Email address</span>
                  <input v-model="attendeeEmail" type="email" autocomplete="email" placeholder="you@example.com" maxlength="254" :disabled="loading" class="w-full border border-ink/15 bg-white px-4 py-4 text-sm outline-none transition placeholder:text-ink/30 focus:border-gold-dark disabled:opacity-60" />
                  <p class="mt-2 text-xs leading-5 text-ink/50">Your confirmation and private venue details will be sent to this email.</p>
                </label>
              </div>
            </div>

            <div class="mt-7 flex gap-3 border border-gold-dark/25 bg-gold/5 p-4">
              <ShieldCheck :size="17" class="mt-0.5 shrink-0 text-gold-dark" />
              <p class="text-xs leading-6 text-ink/70">By continuing, you acknowledge that ticket purchases are <strong class="text-ink">non-refundable.</strong></p>
            </div>
            <div v-if="error" role="alert" class="mt-5 border border-red-900/20 bg-red-50 p-4 text-sm leading-6 text-red-900">{{ error }}</div>
          </div>

          <div class="border-t border-ink/10 bg-cream-2 px-6 py-5 md:px-8">
            <button type="button" :disabled="!canCheckout" class="flex w-full items-center justify-center gap-2 bg-gold px-5 py-4 text-[10px] font-extrabold uppercase tracking-[.18em] text-black transition hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-40" @click="submitCheckout">
              <span v-if="loading">Taking you to secure checkout...</span>
              <span v-else>Continue to Stripe <ArrowUpRight :size="15" class="ml-1 inline" /></span>
            </button>
            <p class="mt-3 text-center text-[10px] leading-5 text-ink/45">Secure payment powered by Stripe.</p>
          </div>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>
