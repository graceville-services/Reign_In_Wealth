<script setup lang="ts">
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Sparkles,
} from 'lucide-vue-next'
import { site } from '~/data/site'
import CinematicMedia from '~/components/CinematicMedia.vue'
import SupportSection from '~/components/SupportSection.vue'

const { revealAll } = useReveal()

useSeo({
  title: 'DOMINION | Reign in Wealth Conference 2026',
  description:
    'DOMINION is the Reign in Wealth Conference 2026 — a gathering for people ready to occupy, build, multiply and reign.',
  path: '/',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Event',

        name: 'DOMINION — Reign in Wealth Conference 2026',

        description:
          'DOMINION is the Reign in Wealth Conference 2026 — a gathering focused on wealth, leadership, business, connection and growth.',

        startDate: '2026-12-11T12:00:00-05:00',
        endDate: '2026-12-12T20:00:00-05:00',

        eventStatus:
          'https://schema.org/EventScheduled',

        eventAttendanceMode:
          'https://schema.org/OfflineEventAttendanceMode',

        location: {
          '@type': 'Place',
          name:
            config.public.siteUrl
              ? 'DOMINION 2026 Venue'
              : 'DOMINION 2026 Venue',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Yonkers',
            addressRegion: 'NY',
            addressCountry: 'US',
          },
        },

        image: [
          `${config.public.siteUrl}/images/og-image.png`,
        ],

        organizer: {
          '@type': 'Organization',
          name: 'Reign in Wealth',
          url: config.public.siteUrl,
        },

        url: config.public.siteUrl,
      }),
    },
  ],
})


onMounted(() => revealAll())
</script>

<template>
  <div id="top">

    <!-- HERO -->
    <section
      class="grain relative min-h-screen overflow-hidden border-b border-black/10 bg-ink"
    >
      <div class="absolute inset-0 z-0 overflow-hidden">
        <CinematicMedia
          :video="site.hero.video"
          :poster="site.hero.poster"
          background
        />

        <!-- Keep the cinematic footage visible, but make it feel darker and more editorial -->
        <div class="absolute inset-0 bg-ink/55" />
        <div
          class="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/20"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/45"
        />
      </div>

      <div class="absolute inset-0 z-[1] line-grid-dark opacity-30" />

      <div
        class="absolute right-[-8%] top-[15%] z-[1] h-[55vw] w-[55vw] rounded-full border border-gold/15"
      />

      <div
        class="absolute right-[8%] top-[28%] z-[1] h-[30vw] w-[30vw] rounded-full border border-gold/10"
      />

      <div
        class="absolute inset-x-0 bottom-0 z-[1] h-[48%] bg-gradient-to-t from-black/30 to-transparent"
      />

      <div
        class="relative z-10 mx-auto flex min-h-screen max-w-[1500px] items-end px-5 pb-12 pt-32 md:px-8 md:pb-20"
      >
        <div class="reveal max-w-5xl">

          <div class="eyebrow !text-gold-light">
            {{ site.hero.eyebrow }}
          </div>

          <h1
            class="display mt-5 max-w-full overflow-hidden text-[17vw] leading-[.78] tracking-[-0.055em] text-white sm:text-[15vw] md:text-[13vw]"
          >
            {{ site.theme }}
          </h1>

          <p
            class="mt-8 max-w-2xl font-serif text-2xl italic text-gold-light md:text-3xl"
          >
            {{ site.tagline }}
          </p>

          <p
            class="mt-5 max-w-xl text-sm leading-7 text-white/65 md:text-base"
          >
            {{ site.hero.copy }}
          </p>

          <div class="mt-8 flex flex-wrap gap-2">
            <NuxtLink
              to="/tickets"
              class="button-primary"
            >
              Get Your Ticket
              <ArrowUpRight :size="16" />
            </NuxtLink>

            <NuxtLink
              to="/experience"
              class="button-dark-outline"
            >
              Explore the Weekend
              <ArrowDown :size="16" />
            </NuxtLink>
          </div>

          <div
            class="mt-10 grid max-w-3xl grid-cols-2 border-y border-white/15 py-4 text-[10px] uppercase tracking-[.14em] text-white/50 sm:grid-cols-4 sm:gap-3"
          >
            <div class="flex items-center gap-2 py-1">
              <CalendarDays :size="14" class="text-gold" />
              Dec 11–12
            </div>

            <div class="flex items-center gap-2 py-1">
              <MapPin :size="14" class="text-gold" />
              Yonkers, NY
            </div>

            <div class="py-1">
              Faith + Strategy
            </div>

            <div class="py-1">
              Ownership + Impact
            </div>
          </div>
        </div>
      </div>

      <a
        href="#enter"
        class="absolute bottom-5 right-5 z-20 hidden items-center gap-2 text-[9px] uppercase tracking-[.2em] text-white/35 md:flex"
      >
        Scroll to enter
        <ArrowDown :size="13" />
      </a>
    </section>


    <!-- THE DOMINION MESSAGE -->
    <section
      id="enter"
      class="relative overflow-hidden bg-ink text-white"
    >
      <!-- Replace with the final licensed NYC architecture image -->
      <div
        class="absolute inset-0 bg-cover bg-center opacity-70"
        style="background-image: url('https://images.pexels.com/photos/15269606/pexels-photo-15269606.jpeg?_gl=1*etjeq2*_ga*MTE1ODI0NzIwMy4xNzkwODM4Njk0*_ga_8JE65Q40S6*czE3OTA4Mzg2OTMkbzEkZzEkdDE3OTA4Mzg3MDgkajQ1JGwwJGgw')"
      />

      <div
        class="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/65"
      />

      <div class="absolute inset-0 line-grid-dark opacity-20" />

      <div
        class="section-pad relative z-10 grid gap-14 md:grid-cols-[.75fr_1.25fr] md:items-center"
      >
        <div class="reveal">
          <div class="eyebrow !text-gold-light">
            THE DOMINION MESSAGE
          </div>

          <h2 class="display mt-5 text-5xl text-white md:text-7xl">
            There comes a point when you have to stop waiting and start building.
          </h2>
        </div>

        <div
          class="reveal max-w-2xl text-sm leading-8 text-white/60 md:text-base"
        >
          <p>
            Faith can give you the vision. But eventually, you have to put
            something behind it.
          </p>

          <p class="mt-5">
            DOMINION is for people who are ready to take that next step —
            to learn, make better decisions, build real assets, grow businesses,
            create opportunities and take ownership of the life they're building.
          </p>

          <p class="mt-5 font-semibold text-white">
            Not for show. Not for appearances. For something that lasts.
          </p>

          <NuxtLink
            to="/experience"
            class="mt-8 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.16em] text-gold-light"
          >
            See what the weekend is about
            <ArrowUpRight :size="15" />
          </NuxtLink>
        </div>
      </div>
    </section>


    <!-- FOUR MOVEMENTS -->
    <section class="bg-black text-white">
      <div class="section-pad">

        <div class="reveal max-w-3xl">
          <div class="eyebrow !text-gold-light">
            THE FOUR MOVEMENTS
          </div>

          <h2 class="display mt-4 text-5xl md:text-7xl">
            A simple idea: move from intention to action.
          </h2>

          <p class="mt-6 max-w-2xl text-sm leading-7 text-white/50 md:text-base">
            The weekend is built around four movements — each one asking you
            to look at where you are, what you're building and what comes next.
          </p>
        </div>

        <div class="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="pillar in site.pillars"
            :key="pillar.number"
            class="reveal border border-white/10 bg-white/[.035] p-6 transition duration-500 hover:-translate-y-2 hover:border-gold/40 md:p-8"
          >
            <span class="font-mono text-[10px] text-gold-light">
              {{ pillar.number }}
            </span>

            <h3 class="display mt-16 text-4xl text-white">
              {{ pillar.title }}
            </h3>

            <p class="mt-4 text-sm leading-7 text-white/50">
              {{ pillar.body }}
            </p>
          </article>
        </div>

      </div>
    </section>


    <!-- EXPLORE THE SITE -->
    <!-- EXPLORE THE SITE -->
    <section class="bg-sage/25 text-forest">
      <div
        class="section-pad grid gap-12 md:grid-cols-[1fr_.8fr] md:items-end"
      >
        <div class="reveal">
          <div class="eyebrow">
            ONE WEEKEND. ROOM TO GO DEEPER.
          </div>

          <h2 class="display mt-4 text-5xl md:text-7xl">
            Start where you are. Find what you need.
          </h2>

          <p class="mt-6 max-w-xl text-sm leading-7 text-forest/55 md:text-base">
            You don't need to know everything before you arrive. Start with
            the part of the weekend that matters most to you.
          </p>
        </div>

        <div class="reveal grid gap-3 sm:grid-cols-2">

          <NuxtLink
            to="/experience"
            class="group border border-forest/10 bg-cream-2 p-6 transition duration-500 hover:-translate-y-1 hover:border-gold/60"
          >
            <Sparkles :size="18" class="text-gold-dark" />

            <h3 class="mt-10 font-serif text-2xl text-forest">
              The Experience
            </h3>

            <p class="mt-2 text-sm leading-6 text-forest/50">
              The schedule, hotel, four movements and everything happening
              across the weekend.
            </p>

            <span
              class="mt-7 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.18em] text-primary"
            >
              Explore
              <ArrowUpRight :size="13" />
            </span>
          </NuxtLink>

          <NuxtLink
            to="/people"
            class="group border border-forest/10 bg-cream-2 p-6 transition duration-500 hover:-translate-y-1 hover:border-gold/60"
          >
            <Sparkles :size="18" class="text-gold-dark" />

            <h3 class="mt-10 font-serif text-2xl text-forest">
              The People
            </h3>

            <p class="mt-2 text-sm leading-6 text-forest/50">
              Meet the people behind the room and the stories that make
              the community what it is.
            </p>

            <span
              class="mt-7 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.18em] text-primary"
            >
              Meet the people
              <ArrowUpRight :size="13" />
            </span>
          </NuxtLink>

          <NuxtLink
            to="/tickets"
            class="group border border-forest/10 bg-cream-2 p-6 transition duration-500 hover:-translate-y-1 hover:border-gold/60"
          >
            <Sparkles :size="18" class="text-gold-dark" />

            <h3 class="mt-10 font-serif text-2xl text-forest">
              Your Ticket
            </h3>

            <p class="mt-2 text-sm leading-6 text-forest/50">
              See the admission options and choose the experience that
              fits how you want to spend the weekend.
            </p>

            <span
              class="mt-7 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.18em] text-primary"
            >
              View tickets
              <ArrowUpRight :size="13" />
            </span>
          </NuxtLink>

          <NuxtLink
            to="/faq"
            class="group border border-forest/10 bg-cream-2 p-6 transition duration-500 hover:-translate-y-1 hover:border-gold/60"
          >
            <Sparkles :size="18" class="text-gold-dark" />

            <h3 class="mt-10 font-serif text-2xl text-forest">
              Questions
            </h3>

            <p class="mt-2 text-sm leading-6 text-forest/50">
              The practical things you may want to know before you
              make your plans.
            </p>

            <span
              class="mt-7 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.18em] text-primary"
            >
              Read the FAQ
              <ArrowUpRight :size="13" />
            </span>
          </NuxtLink>

        </div>
      </div>
    </section>


    <!-- SUPPORT -->
    <SupportSection />


    <!-- FINAL CTA -->
    <section class="bg-cream-2 text-forest">
      <div
        class="section-pad flex flex-col gap-8 border-t border-forest/10 md:flex-row md:items-end md:justify-between"
      >
        <div class="reveal">
          <div class="eyebrow">
            DECEMBER 11–12 · YONKERS, NEW YORK
          </div>

          <h2 class="display mt-4 text-5xl md:text-6xl">
            Come ready to build something that matters.
          </h2>

          <p class="mt-5 max-w-xl text-sm leading-7 text-forest/55">
            Two days of faith, strategy, ownership, relationships and
            conversations you can actually take home with you.
          </p>
        </div>

        <NuxtLink
          to="/tickets"
          class="button-primary"
        >
          View tickets
          <ArrowUpRight :size="16" />
        </NuxtLink>
      </div>
    </section>

  </div>
</template>