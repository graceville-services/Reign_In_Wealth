<script setup lang="ts">
import { ArrowUpRight, Heart, Handshake } from 'lucide-vue-next'
import { site } from '~/data/site'
</script>

<template>
  <section class="relative overflow-hidden bg-cream-2" id="support">
    <div class="absolute -right-32 top-20 h-96 w-96 rounded-full border border-primary/10" />
    <div class="absolute -left-32 bottom-0 h-72 w-72 rounded-full border border-primary/10" />

    <div class="section-pad relative z-10">

      <!-- SECTION INTRO -->
      <div class="mx-auto max-w-3xl text-center">
        <div class="eyebrow">
          PARTNER · SUPPORT · IMPACT
        </div>

        <h2 class="display mt-5 text-5xl md:text-7xl">
          Help build what lasts.
        </h2>

        <p class="mx-auto mt-6 max-w-2xl text-sm leading-8 text-forest/60 md:text-base">
          DOMINION is more than a conference. It is a platform for ownership,
          wealth creation, purpose, faith, and generational impact.
        </p>
      </div>

      <!-- TWO SUPPORT OPTIONS -->
      <div class="mt-14 grid gap-5 lg:grid-cols-2">

        <!-- SPONSORSHIP -->
        <article
          class="group relative overflow-hidden border border-forest/10 bg-forest p-8 text-cream transition duration-500 hover:-translate-y-1 hover:border-primary/50 md:p-10"
        >
          <div
            class="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-primary/20 transition duration-700 group-hover:scale-125"
          />

          <div class="relative z-10">

            <div
              class="grid h-12 w-12 place-items-center border border-primary/40 bg-primary/10 text-primary-light"
            >
              <Handshake :size="21" />
            </div>

            <div class="mt-10">
              <div class="eyebrow !text-primary-light">
                {{ site.support.sponsorship.eyebrow }}
              </div>

              <h3 class="display mt-4 text-4xl md:text-5xl">
                {{ site.support.sponsorship.title }}
              </h3>

              <p class="mt-5 max-w-xl text-sm leading-7 text-cream/60">
                {{ site.support.sponsorship.body }}
              </p>
            </div>

            <a
              :href="`mailto:${site.support.sponsorship.email}`"
              class="button-primary mt-8"
            >
              {{ site.support.sponsorship.cta }}
              <ArrowUpRight :size="16" />
            </a>
          </div>
        </article>

        <!-- DONATIONS -->
        <article
          class="group relative overflow-hidden border border-primary/20 bg-sage/40 p-8 transition duration-500 hover:-translate-y-1 hover:border-primary/60 md:p-10"
        >
          <div
            class="absolute -bottom-24 -right-24 h-72 w-72 rounded-full border border-primary/15 transition duration-700 group-hover:scale-125"
          />

          <div class="relative z-10">

            <div
              class="grid h-12 w-12 place-items-center border border-primary/40 bg-primary/10 text-primary"
            >
              <Heart :size="21" />
            </div>

            <div class="mt-10">
              <div class="eyebrow">
                {{ site.support.donations.eyebrow }}
              </div>

              <h3 class="display mt-4 text-4xl md:text-5xl">
                {{ site.support.donations.title }}
              </h3>

              <p class="mt-5 max-w-xl text-sm leading-7 text-forest/60">
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

      <!-- SPONSOR LOGOS -->
      <div class="mt-20">

        <div class="flex items-center justify-between gap-6">
          <div>
            <div class="eyebrow">
              OUR PARTNERS
            </div>

            <h3 class="display mt-3 text-3xl md:text-4xl">
              Sponsors & partners
            </h3>
          </div>

          <div class="hidden h-px flex-1 bg-forest/10 md:block" />
        </div>

        <div class="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">

          <div
            v-for="sponsor in site.sponsors"
            :key="sponsor.name"
            class="group grid min-h-[130px] place-items-center border border-forest/10 bg-white/40 p-6 transition duration-500 hover:-translate-y-1 hover:border-primary/40"
          >
            <img
              :src="sponsor.logo"
              :alt="sponsor.name"
              class="max-h-16 max-w-[150px] object-contain opacity-60 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0"
            />
          </div>

        </div>

      </div>

    </div>
  </section>
</template>