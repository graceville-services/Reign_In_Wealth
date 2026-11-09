
<script setup lang="ts">
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ShieldCheck,
  Sparkles,
  TicketPercent,
} from 'lucide-vue-next'

import { site, type Ticket } from '~/data/site'
import CheckoutDrawer from '~/components/CheckoutDrawer.vue'

const { revealAll } = useReveal()
const promoEnabled = useTicketPromotion()

const selectedTicket = ref<Ticket | null>(null)

const formatPrice = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)

const galaTicket = site.tickets.find(
  (ticket) => ticket.id === 'gala',
)

const selectTicket = (ticket: Ticket) => {
  selectedTicket.value = ticket
}

useSeo({
  title: 'Tickets | DOMINION 2026',
  description:
    'DOMINION 2026 tickets: Regular $250, VIP $397, and Gala $197. December 11–12 in Yonkers, New York.',
  path: '/tickets',
})

onMounted(() => {
  revealAll()
})
</script>

<template>
  <div class="pt-[76px]">

    <!-- HERO -->
    <section
      class="relative min-h-[550px] overflow-hidden bg-black text-cream"
    >
      <div
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('https://images.pexels.com/photos/17527817/pexels-photo-17527817.jpeg');"
      />

      <div class="absolute inset-0 bg-black/60" />
      <div
        class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/35"
      />
      <div
        class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent"
      />

      <div class="relative z-10">
        <div class="section-pad flex min-h-[550px] items-end">
          <div class="max-w-4xl pb-6">

            <!-- PROMOTIONAL BADGE -->
            <div
              v-if="promoEnabled"
              class="mb-6 inline-flex flex-wrap items-center gap-3 border border-gold/40 bg-gold/10 px-4 py-3 backdrop-blur-md"
            >
              <Sparkles
                :size="16"
                class="text-gold"
              />

              <span
                class="font-mono text-[10px] font-extrabold uppercase tracking-[.16em] text-gold"
              >
                Special Ticket Offer
              </span>

              <span
                class="bg-gold px-3 py-1.5 font-mono text-[10px] font-black uppercase tracking-[.12em] text-black"
              >
                Save $100 with a promo code
              </span>
            </div>

            <div class="eyebrow !text-gold">
              ADMISSION · DOMINION 2026
            </div>

            <h1
              class="display mt-5 text-6xl leading-[.9] md:text-8xl"
            >
              Choose your way
              <span class="block text-gold">
                into DOMINION.
              </span>
            </h1>

            <p
              class="mt-7 max-w-2xl text-sm leading-8 text-cream/80 md:text-base"
            >
              Two days of faith, strategy, wellness, and
              wealth-building. Choose your DOMINION
              experience, from the full conference and
              exclusive Friday VIP sessions to the
              Saturday evening Gala.
            </p>

            <p
              v-if="promoEnabled"
              class="mt-4 max-w-xl text-sm font-semibold leading-7 text-gold"
            >
              Your next level starts here.
              Have a promo code? Enter it on Stripe’s payment page for $100 off your order.
            </p>

            <div class="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              <div
                class="font-mono text-[9px] font-bold uppercase tracking-[.16em] text-cream/55"
              >
                Dec 11–12, 2026
              </div>

              <div
                class="font-mono text-[9px] font-bold uppercase tracking-[.16em] text-cream/55"
              >
                Yonkers, New York
              </div>
            </div>

            <a
              href="#tickets"
              class="mt-9 inline-flex items-center gap-3 border border-gold bg-gold px-6 py-4 text-[10px] font-extrabold uppercase tracking-[.18em] text-black transition duration-300 hover:bg-cream hover:border-cream"
            >
              Choose Your Ticket
              <ArrowDown :size="15" />
            </a>

          </div>
        </div>
      </div>
    </section>

    <!-- PROMOTIONAL STRIP -->
    <section v-if="promoEnabled" class="border-b border-gold/30 bg-black text-cream">
      <div
        class="section-pad flex flex-col items-center justify-between gap-5 py-5 md:flex-row"
      >
        <div class="flex items-center gap-4">
          <div
            class="grid h-11 w-11 shrink-0 place-items-center border border-gold/40 text-gold"
          >
            <TicketPercent :size="21" />
          </div>

          <div>
            <div
              class="font-mono text-[10px] font-black uppercase tracking-[.17em] text-gold"
            >
              $100 Off Your Order With a Valid Promo Code
            </div>

            <p class="mt-1 text-xs text-cream/60">
              Regular. VIP. Gala. Choose your tickets, then select
              Add promotion code on Stripe’s payment page.
            </p>
          </div>
        </div>

        <div
          class="font-serif text-2xl italic text-gold md:text-3xl"
        >
          Your Dominion Awaits.
        </div>
      </div>
    </section>

    <!-- TICKETS -->
    <section
      id="tickets"
      class="scroll-mt-24 bg-cream text-forest"
    >
      <div class="section-pad">

        <!-- SECTION HEADER -->
        <div class="mb-12 max-w-3xl">
          <div class="eyebrow">
            YOUR EXPERIENCE
          </div>

          <h2
            class="display mt-4 text-5xl leading-none md:text-6xl"
          >
            One weekend.
            <span class="text-primary">
              Three ways in.
            </span>
          </h2>

          <p
            class="mt-5 max-w-2xl text-sm leading-7 text-forest/65"
          >
            Build your real estate knowledge, explore
            new wealth-building strategies, connect
            with industry professionals, and invest
            in your vision. Choose Regular Admission,
            unlock deeper access with VIP, or join
            us for the Fundraising Gala.
          </p>

          <!-- SALE MESSAGE -->
          <div
            v-if="promoEnabled"
            class="mt-6 inline-flex flex-wrap items-center gap-3 border-l-2 border-gold bg-white px-5 py-4 shadow-sm"
          >
            <Sparkles
              :size="18"
              class="shrink-0 text-gold-dark"
            />

            <p
              class="text-xs font-semibold leading-6 text-forest md:text-sm"
            >
              A special invitation to DOMINION.
              <span class="font-extrabold text-primary">
                Enter a valid promo code on Stripe’s payment page to save $100 per order.
              </span>
            </p>
          </div>
        </div>

        <!-- TICKET CARDS -->
        <div
          class="grid items-stretch gap-6 lg:grid-cols-3"
        >
          <article
            v-for="ticket in site.tickets"
            :key="ticket.id"
            class="group relative flex h-full flex-col overflow-hidden border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            :class="
              ticket.featured
                ? 'border-gold shadow-lg ring-1 ring-gold/30'
                : 'border-forest/10 shadow-sm'
            "
          >

            <!-- CARD TOP STRIP -->
            <div
              class="flex min-h-[48px] items-center justify-between gap-3 px-6 py-3"
              :class="
                ticket.featured
                  ? 'bg-gold text-black'
                  : 'bg-black text-cream'
              "
            >
              <div
                class="flex items-center gap-2 font-mono text-[9px] font-black uppercase tracking-[.15em]"
              >
                <Sparkles
                  v-if="ticket.featured"
                  :size="13"
                />

                <span>
                  {{
                    ticket.featured
                      ? 'MOST EXCLUSIVE EXPERIENCE'
                      : 'DOMINION ADMISSION'
                  }}
                </span>
              </div>

              <span
                v-if="promoEnabled"
                class="shrink-0 px-2.5 py-1.5 font-mono text-[9px] font-black uppercase tracking-[.08em]"
                :class="
                  ticket.featured
                    ? 'bg-black text-gold'
                    : 'border border-gold/50 text-gold'
                "
              >
                PROMO ELIGIBLE
              </span>
            </div>

            <!-- CARD BODY -->
            <div class="flex flex-1 flex-col p-6 md:p-8">

              <div
                class="font-mono text-[9px] font-extrabold uppercase tracking-[.18em] text-primary"
              >
                {{ ticket.eyebrow }}
              </div>

              <h3
                class="mt-4 font-serif text-3xl leading-tight text-forest md:text-[34px]"
              >
                {{ ticket.name }}
              </h3>

              <p
                class="mt-4 min-h-[96px] text-sm leading-7 text-forest/65"
              >
                {{ ticket.description }}
              </p>

              <!-- PRICING -->
              <div
                class="relative mt-7 border-y border-forest/10 bg-cream/60 px-5 py-6"
              >
                <p class="mb-3 font-mono text-[9px] font-bold uppercase tracking-[.15em] text-forest/55">
                  Ticket Price
                </p>

                <!-- STANDARD PRICE -->
                <div class="mt-2 flex flex-wrap items-end gap-2">
                  <span
                    class="font-serif text-5xl font-bold leading-none tracking-tight text-forest md:text-6xl"
                  >
                    {{ formatPrice(ticket.price) }}
                  </span>

                  <span
                    class="mb-2 font-mono text-[10px] font-bold uppercase tracking-[.1em] text-forest/50"
                  >
                    USD / TICKET
                  </span>
                </div>

                <!-- CODE-ONLY OFFER -->
                <div
                  v-if="promoEnabled"
                  class="mt-4 inline-flex items-center gap-2 border border-gold/30 bg-gold/10 px-3 py-2"
                >
                  <Check
                    :size="14"
                    class="text-gold-dark"
                  />

                  <span
                    class="font-mono text-[10px] font-extrabold uppercase tracking-[.12em] text-forest"
                  >
                    $100 off your order with a valid promo code
                  </span>
                </div>
              </div>

              <!-- CTA -->
              <button
                type="button"
                class="mt-6 flex w-full items-center justify-center gap-3 border px-5 py-4 text-[11px] font-black uppercase tracking-[.14em] transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                :class="
                  ticket.featured
                    ? 'border-gold bg-gold text-black hover:bg-black hover:text-gold'
                    : 'border-forest bg-forest text-cream hover:border-gold hover:bg-gold hover:text-black'
                "
                @click="selectTicket(ticket)"
              >
                Secure My Ticket
                <ArrowUpRight :size="17" />
              </button>

              <p
                class="mt-3 text-center font-mono text-[9px] font-bold uppercase tracking-[.08em] text-forest/45"
              >
                Secure checkout via Stripe
              </p>

              <!-- FEATURES -->
              <div class="mt-8 border-t border-forest/10 pt-7">
                <div
                  class="mb-5 font-mono text-[10px] font-black uppercase tracking-[.16em] text-forest"
                >
                  Your Experience Includes
                </div>

                <ul class="space-y-3.5">
                  <li
                    v-for="(feature, index) in ticket.features"
                    :key="index"
                    class="flex items-start gap-3"
                  >
                    <div
                      class="mt-0.5 grid h-5 w-5 shrink-0 place-items-center border border-gold/30 bg-gold/10 text-gold-dark"
                    >
                      <Check :size="12" :stroke-width="2.5" />
                    </div>

                    <span
                      class="text-[12px] leading-6 text-forest/75"
                    >
                      {{ feature }}
                    </span>
                  </li>
                </ul>
              </div>

            </div>

            <!-- CARD FOOTER -->
            <div
              class="mt-auto border-t px-6 py-4 text-center font-mono text-[9px] font-bold uppercase tracking-[.13em] md:px-8"
              :class="
                ticket.featured
                  ? 'border-gold/30 bg-gold/10 text-forest'
                  : 'border-forest/10 bg-cream/40 text-forest/55'
              "
            >
              {{
                ticket.featured
                  ? 'THE COMPLETE DOMINION VIP EXPERIENCE'
                  : 'DECEMBER 11–12 · YONKERS, NEW YORK'
              }}
            </div>

          </article>
        </div>

        <!-- GALA NOTICE -->
        <div
          class="mt-10 border border-gold/40 bg-black p-6 text-cream md:p-8"
        >
          <div
            class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
          >
            <div class="flex gap-4">
              <div
                class="grid h-10 w-10 shrink-0 place-items-center border border-gold/40 text-gold"
              >
                <ShieldCheck :size="18" />
              </div>

              <div>
                <div
                  class="font-mono text-[9px] font-bold uppercase tracking-[.18em] text-gold"
                >
                  Included with Regular + VIP
                </div>

                <h3
                  class="mt-2 font-serif text-2xl text-cream"
                >
                  The Fundraising Gala is included.
                </h3>

                <p
                  class="mt-2 max-w-2xl text-sm leading-6 text-cream/60"
                >
                  All Regular and VIP admission tickets
                  include access to the Reign in Wealth
                  Fundraising Gala on Saturday evening.
                  Gala-only tickets are also available for
                  <strong class="font-bold text-gold">
                    {{ galaTicket ? formatPrice(galaTicket.price) : 'a separate price' }}.
                  </strong>
                </p>
              </div>
            </div>

            <div
              class="shrink-0 font-mono text-[10px] font-bold uppercase tracking-[.16em] text-gold"
            >
              Saturday · 7:00 PM
            </div>
          </div>
        </div>

        <!-- SECURE CHECKOUT -->
        <div
          class="mt-8 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-forest/65"
        >
          <ShieldCheck
            :size="15"
            class="text-gold-dark"
          />

          Secure Checkout via Stripe
        </div>

      </div>
    </section>

    <!-- CHECKOUT DRAWER -->
    <CheckoutDrawer
      :open="!!selectedTicket"
      :ticket="selectedTicket"
      @close="selectedTicket = null"
    />

  </div>
</template>
