
<script setup lang="ts">
import { ArrowUpRight, Heart, Handshake } from 'lucide-vue-next'
import { site } from '~/data/site'

const sponsorshipEmail = 'Info@reigninwealth.com'
</script>

<template>
  <section
    id="support"
    class="relative overflow-hidden border-t border-forest/10 bg-cream-2"
  >
    <!-- ARCHITECTURAL DETAIL -->
    <div
      class="pointer-events-none absolute -right-40 top-24 h-[32rem] w-[32rem] rounded-full border border-gold/15"
    />

    <div
      class="pointer-events-none absolute -left-40 bottom-[-8rem] h-80 w-80 rounded-full border border-gold/10"
    />

    <div class="section-pad relative z-10">
      <!-- INTRO -->
      <div class="max-w-4xl">
        <div class="eyebrow">
          SUPPORT THE WORK
        </div>

        <h2
          class="display mt-5 max-w-3xl text-6xl leading-[.92] text-forest md:text-8xl"
        >
          Help make the room possible.
        </h2>

        <p
          class="mt-7 max-w-2xl text-sm leading-8 text-forest/75 md:text-base"
        >
          DOMINION is built around people, ideas, and opportunities that can
          continue long after the weekend is over. There are a few ways to
          support the work behind it.
        </p>
      </div>

      <!-- SUPPORT OPTIONS -->
      <div class="mt-14 grid gap-5 lg:grid-cols-2">
        <!-- SPONSORSHIP -->
        <article
          class="group relative overflow-hidden border border-white/10 bg-black p-8 text-cream transition duration-500 hover:-translate-y-1 md:p-10"
        >
          <div
            class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-gold/15 transition duration-700 group-hover:scale-110"
          />

          <div class="relative z-10">
            <div
              class="grid h-12 w-12 place-items-center border border-gold/35 text-gold"
            >
              <Handshake :size="20" stroke-width="1.5" />
            </div>

            <div class="mt-12">
              <div class="eyebrow !text-gold">
                PARTNER WITH DOMINION 2026
              </div>

              <h3 class="display mt-4 text-4xl md:text-5xl">
                Become a Sponsor
              </h3>

              <p class="mt-5 max-w-xl text-sm leading-7 text-cream/70">
                Align your brand with a powerful gathering of entrepreneurs,
                real estate professionals, investors, business leaders, and
                emerging wealth builders.
              </p>

              <p class="mt-4 max-w-xl text-sm leading-7 text-cream/70">
                We invite corporations, financial institutions, real estate
                companies, and community partners to support financial
                education, entrepreneurship, ownership, and lasting
                community impact.
              </p>

              <p class="mt-6 text-sm font-semibold leading-7 text-cream">
                Interested in becoming a sponsor?
              </p>

              <p class="mt-2 text-sm leading-7 text-cream/70">
                Email:
                <a
                  :href="`mailto:${sponsorshipEmail}`"
                  class="font-semibold text-gold underline decoration-gold/40 underline-offset-4 transition hover:decoration-gold"
                >
                  {{ sponsorshipEmail }}
                </a>
                <span class="mt-1 block">
                  to explore sponsorship and partnership opportunities.
                </span>
              </p>
            </div>

            <a
              :href="`mailto:${sponsorshipEmail}?subject=${encodeURIComponent('DOMINION 2026 Sponsorship and Partnership Inquiry')}`"
              class="button-gold mt-8"
            >
              BECOME A SPONSOR
              <ArrowUpRight :size="16" />
            </a>
          </div>
        </article>

        <!-- DONATIONS -->
        <article
          class="group relative overflow-hidden border border-forest/10 bg-[#E9E5DB] p-8 text-forest transition duration-500 hover:-translate-y-1 hover:border-gold/50 md:p-10"
        >
          <div
            class="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 rounded-full border border-gold/20 transition duration-700 group-hover:scale-110"
          />

          <div class="relative z-10">
            <div
              class="grid h-12 w-12 place-items-center border border-gold/40 text-gold-dark"
            >
              <Heart :size="20" stroke-width="1.5" />
            </div>

            <div class="mt-12">
              <div class="eyebrow !text-gold-dark">
                {{ site.support.donations.eyebrow }}
              </div>

              <h3 class="display mt-4 text-4xl md:text-5xl">
                {{ site.support.donations.title }}
              </h3>

              <p class="mt-5 max-w-xl text-sm leading-7 text-forest/55">
                {{ site.support.donations.body }}
              </p>
            </div>

            <a
              :href="site.support.donations.url"
              target="_blank"
              rel="noopener noreferrer"
              class="button-primary mt-8"
            >
              {{ site.support.donations.cta }}
              <ArrowUpRight :size="16" />
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>