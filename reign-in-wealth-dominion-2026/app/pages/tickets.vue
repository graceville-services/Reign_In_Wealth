<script setup lang="ts">
import { ArrowDown, ShieldCheck } from 'lucide-vue-next'
import { site, type Ticket } from '~/data/site'
import CheckoutDrawer from '~/components/CheckoutDrawer.vue'
import TicketCard from '~/components/TicketCard.vue'

const { revealAll } = useReveal()

const selectedTicket = ref<Ticket | null>(null)

useHead({
  title: 'Tickets — DOMINION 2026',
})

onMounted(() => {
  revealAll()
})
</script>

<template>
  <div class="pt-[76px]">

    <!-- HERO -->
    <section class="relative min-h-[520px] overflow-hidden bg-black text-cream">
      <!-- Background -->
      <div
        class="absolute inset-0 bg-cover bg-center"
        style="
          background-image:
            url('https://images.pexels.com/photos/17527817/pexels-photo-17527817.jpeg?_gl=1*1w9346i*_ga*MTcxMTE5NTQyNy4xNzkxMTI0MDU0*_ga_8JE65Q40S6*czE3OTExMjQwNTQkbzEkZzEkdDE3OTExMjQyNzEkajYwJGwwJGgw');
        "
      />

      <!-- Cinematic overlays -->
      <div class="absolute inset-0 bg-black/50" />
      <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/40" />
      <div class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />

      <!-- Content -->
      <div class="relative z-10">
        <div class="section-pad flex min-h-[520px] items-end">
          <div class="max-w-4xl pb-4">

            <div class="eyebrow !text-gold">
              ADMISSION · DOMINION 2026
            </div>

            <h1 class="display mt-5 text-6xl leading-[.9] md:text-8xl">
              Choose your way
              <span class="block text-gold">
                into DOMINION.
              </span>
            </h1>

            <p class="mt-7 max-w-2xl text-sm leading-8 text-cream/80 md:text-base">
              Choose the experience that fits how you want to be part
              of the Reign in Wealth Conference weekend.
            </p>

            <div class="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              <div class="font-mono text-[9px] font-bold uppercase tracking-[.16em] text-cream/55">
                Dec 11–12, 2026
              </div>

              <div class="font-mono text-[9px] font-bold uppercase tracking-[.16em] text-cream/55">
                Yonkers, New York
              </div>
            </div>

            <a
              href="#tickets"
              class="mt-9 inline-flex items-center gap-2 border border-gold/50 bg-black/20 px-5 py-3 text-[10px] font-extrabold uppercase tracking-[.18em] text-gold backdrop-blur-sm transition hover:bg-gold hover:text-black"
            >
              View tickets
              <ArrowDown :size="14" />
            </a>

          </div>
        </div>
      </div>
    </section>

    <!-- TICKETS -->
    <section
      id="tickets"
      class="bg-cream text-forest"
    >
      <div class="section-pad">

        <!-- HEADER -->
        <div class="mb-12 max-w-3xl">
          <div class="eyebrow">
            YOUR EXPERIENCE
          </div>

          <h2 class="display mt-4 text-5xl leading-none md:text-6xl">
            One weekend.
            <span class="text-primary">
              Three ways in.
            </span>
          </h2>

          <p class="mt-5 max-w-2xl text-sm leading-7 text-forest/65">
            Whether you want the complete conference experience, deeper
            VIP access, or simply want to join us for the Gala, there is
            a place for you at DOMINION.
          </p>
        </div>

        <!-- TICKET GRID -->
        <div class="grid gap-5 lg:grid-cols-3">
          <div
            v-for="ticket in site.tickets"
            :key="ticket.id"
            class="h-full"
          >
            <TicketCard
              :ticket="ticket"
              @buy="selectedTicket = $event"
            />
          </div>
        </div>

        <!-- GALA NOTICE -->
        <div
          class="mt-8 border border-gold/40 bg-black p-6 text-cream md:p-8"
        >
          <div class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

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

                <h3 class="mt-2 font-serif text-2xl text-cream">
                  The Fundraising Gala is included.
                </h3>

                <p class="mt-2 max-w-2xl text-sm leading-6 text-cream/60">
                  All Regular and VIP Conference Tickets include access to
                  the Reign in Wealth Fundraising Gala on Saturday evening.
                  Gala-only tickets are also available for $197.
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

          Secure checkout via Stripe
        </div>

      </div>
    </section>

    <!-- CHECKOUT -->
    <CheckoutDrawer
      :open="!!selectedTicket"
      :ticket="selectedTicket"
      @close="selectedTicket = null"
    />

  </div>
</template>