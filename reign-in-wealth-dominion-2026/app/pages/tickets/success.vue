<script setup lang="ts">
import {
  Check,
  Mail,
  ArrowUpRight,
} from 'lucide-vue-next'

const route = useRoute()

const sessionId = computed(() =>
  String(route.query.session_id || ''),
)

const registrationNumber = ref('')
const emailPending = ref(false)

const loading = ref(true)
const paid = ref(false)
const ticketName = ref('')
const quantity = ref(1)
const attendeeName = ref('')
const attendeeEmail = ref('')
const error = ref('')

const {
  clearCheckoutSession,
} = useTicketCheckout()

useSeo({
  title: 'Registration Confirmed | DOMINION 2026',
  description:
    'Your DOMINION 2026 registration has been confirmed.',
  path: '/success',
})

useHead({
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
  ],
})


onMounted(async () => {
  if (!sessionId.value) {
    loading.value = false
    error.value = 'No checkout session was found.'
    return
  }

  const deadline = Date.now() + 30_000
  let delay = 1500

  try {
    while (Date.now() < deadline) {
      try {
        const result = await $fetch<{
          paid: boolean
          status?: string | null
          ticketName?: string | null
          quantity?: number
          attendeeName?: string | null
          attendeeEmail?: string | null
          registrationNumber?: string | null
          emailErrors?: string[]
        }>('/api/checkout/status', {
          query: { session_id: sessionId.value },
          retry: 0,
          timeout: 10000,
        })

        if (result.paid) {
          paid.value = true
          ticketName.value = result.ticketName || ''
          quantity.value = result.quantity || 1
          attendeeName.value = result.attendeeName || ''
          attendeeEmail.value = result.attendeeEmail || ''
          registrationNumber.value =
            result.registrationNumber || ''
          emailPending.value =
            (result.emailErrors?.length || 0) > 0

          clearCheckoutSession()
          return
        }
      } catch (err: any) {
        // Temporary network/Stripe errors should not immediately
        // make the attendee believe their payment failed.
        console.warn('Payment verification will retry:', err)
      }

      await new Promise(resolve =>
        setTimeout(resolve, delay),
      )

      delay = Math.min(delay * 1.5, 5000)
    }

    error.value =
      'Your payment is still being confirmed. Please do not pay again. Refresh this page in a moment or contact the organizer if the issue persists.'
  } finally {
    loading.value = false
  }
})

</script>

<template>
  <div class="min-h-screen bg-black pt-[76px] text-cream">

    <section class="section-pad flex min-h-[calc(100vh-76px)] items-center">
      <div class="mx-auto w-full max-w-3xl">

        <!-- Loading -->
        <div
          v-if="loading"
          class="text-center"
        >
          <div class="eyebrow !text-gold">
            CONFIRMING YOUR REGISTRATION
          </div>

          <h1 class="display mt-5 text-5xl md:text-7xl">
            One moment.
          </h1>

          <p class="mx-auto mt-6 max-w-xl text-sm leading-8 text-cream/65 md:text-base">
            We’re checking your payment with Stripe.
          </p>
        </div>

        <!-- Success -->
        <div
          v-else-if="paid"
          class="text-center"
        >
          <div
            class="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold/50 bg-gold/10 text-gold"
          >
            <Check :size="28" />
          </div>

          <div class="eyebrow mt-8 !text-gold">
            REGISTRATION CONFIRMED
          </div>

          <h1 class="display mt-5 text-6xl leading-[.92] md:text-8xl">
            You're in.
          </h1>

          <p class="mx-auto mt-7 max-w-2xl text-sm leading-8 text-cream/75 md:text-base">
            Thank you<span v-if="attendeeName">
              {{ attendeeName ? `, ${attendeeName.split(' ')[0]}` : '' }}
            </span>.
            Your payment has been confirmed.
          </p>

          <!-- Ticket summary -->
          <div
            class="mx-auto mt-10 max-w-xl border border-white/10 bg-white/[.03] p-6 text-left md:p-8"
          >
            <div class="font-mono text-[9px] font-bold uppercase tracking-[.18em] text-gold">
              YOUR TICKET
            </div>

            <div class="mt-3 font-serif text-3xl">
              {{ ticketName }}
            </div>

            <div
              v-if="registrationNumber"
              class="mt-4 border-t border-white/10 pt-4"
            >
              <div class="text-[9px] font-bold uppercase tracking-[.16em] text-gold">
                Registration number
              </div>

              <div class="mt-2 font-mono text-lg text-cream">
                {{ registrationNumber }}
              </div>
            </div>

            <div class="mt-5 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-2">
              <div>
                <div class="text-[9px] font-bold uppercase tracking-[.16em] text-cream/40">
                  Quantity
                </div>

                <div class="mt-1 text-sm text-cream/80">
                  {{ quantity }}
                </div>
              </div>

              <div>
                <div class="text-[9px] font-bold uppercase tracking-[.16em] text-cream/40">
                  Dates
                </div>

                <div class="mt-1 text-sm text-cream/80">
                  December 11–12, 2026
                </div>
              </div>

              <div class="sm:col-span-2">
                <div class="text-[9px] font-bold uppercase tracking-[.16em] text-cream/40">
                  Location
                </div>

                <div class="mt-1 text-sm text-cream/80">
                  Yonkers, New York
                </div>
              </div>
            </div>
          </div>

          <!-- Email notice -->
          <div
            class="mx-auto mt-5 flex max-w-xl gap-4 border border-gold/25 bg-gold/5 p-5 text-left"
          >
            <Mail
              :size="19"
              class="mt-0.5 shrink-0 text-gold"
            />

            <div>
              <div class="text-xs font-bold uppercase tracking-[.12em] text-cream">
                Check your email
              </div>

              <p class="mt-2 text-sm leading-6 text-cream/60">
                <template v-if="emailPending">
                  Your payment is confirmed. We're finishing the email delivery.
                  Please check your inbox shortly.
                </template>
                <template v-else>
                  Your registration details are being sent to
                  <strong class="text-cream/85">{{ attendeeEmail }}</strong>.
                  Keep your registration number for check-in.
                </template>
              </p>
            </div>
          </div>

          <div class="mt-10 flex flex-wrap justify-center gap-3">
            <NuxtLink
              to="/experience"
              class="inline-flex items-center gap-2 bg-gold px-5 py-3 text-xs font-extrabold uppercase tracking-[.16em] text-black transition hover:bg-gold-light"
            >
              Explore the experience
              <ArrowUpRight :size="15" />
            </NuxtLink>

            <NuxtLink
              to="/"
              class="inline-flex items-center gap-2 border border-white/15 px-5 py-3 text-xs font-extrabold uppercase tracking-[.16em] text-cream transition hover:border-gold hover:text-gold"
            >
              Back home
            </NuxtLink>
          </div>
        </div>

        <!-- Error -->
        <div
          v-else
          class="text-center"
        >
          <div class="eyebrow !text-gold">
            CHECKOUT
          </div>

          <h1 class="display mt-5 text-5xl md:text-7xl">
            We need another moment.
          </h1>

          <p class="mx-auto mt-6 max-w-xl text-sm leading-8 text-cream/65">
            We couldn't verify this checkout session yet.
            If you completed payment, please check your email
            for your confirmation.
          </p>

          <p
            v-if="error"
            class="mx-auto mt-4 max-w-xl text-xs text-cream/40"
          >
            {{ error }}
          </p>

          <NuxtLink
            to="/tickets"
            class="mt-8 inline-flex items-center gap-2 bg-gold px-5 py-3 text-xs font-extrabold uppercase tracking-[.16em] text-black"
          >
            Return to tickets
          </NuxtLink>
        </div>

      </div>
    </section>
  </div>
</template>