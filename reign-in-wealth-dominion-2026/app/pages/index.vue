<script setup lang="ts">
import { ArrowDown, ArrowUpRight, CalendarDays, MapPin, Play, Sparkles } from 'lucide-vue-next'
import { site } from '~/data/site'
import CinematicMedia from '~/components/CinematicMedia.vue'
import SupportSection from '~/components/SupportSection.vue'
const { revealAll } = useReveal()
useHead({ title: 'DOMINION — Reign in Wealth Conference 2026' })
onMounted(() => revealAll())
</script>
<template>
  <div id="top">
    <section
      class="grain relative min-h-screen overflow-hidden border-b border-forest/10"
    >
      <!-- CINEMATIC BACKGROUND VIDEO -->
      <div class="absolute inset-0 z-0 overflow-hidden">
        <CinematicMedia
          :video="site.hero.video"
          :poster="site.hero.poster"
          background
        />

        <!-- readability overlays -->
        <div class="absolute inset-0 bg-cream/65" />
        <div class="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/70 to-cream/35" />
        <div class="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-cream/30" />
      </div>

      <!-- decorative grid -->
      <div class="absolute inset-0 z-[1] line-grid opacity-40" />

      <!-- cinematic rings -->
      <div
        class="absolute right-[-8%] top-[15%] z-[1] h-[55vw] w-[55vw] rounded-full border border-primary/15"
      />

      <div
        class="absolute right-[8%] top-[28%] z-[1] h-[30vw] w-[30vw] rounded-full border border-primary/10"
      />

      <div
        class="absolute inset-x-0 bottom-0 z-[1] h-[48%] bg-gradient-to-t from-forest/10 to-transparent"
      />

      <!-- CONTENT -->
      <div
        class="relative z-10 mx-auto flex min-h-screen max-w-[1500px] items-end px-5 pb-12 pt-32 md:px-8 md:pb-20"
      >
        <div class="reveal max-w-5xl">

          <div class="eyebrow">
            {{ site.hero.eyebrow }}
          </div>

          <h1
            class="display mt-5 max-w-full overflow-hidden text-[17vw] leading-[.78] tracking-[-0.055em] text-forest sm:text-[15vw] md:text-[13vw]"
            >
            {{ site.theme }}
          </h1>

          <p
            class="mt-8 max-w-2xl font-serif text-2xl italic text-primary md:text-3xl"
          >
            {{ site.tagline }}
          </p>

          <p
            class="mt-5 max-w-xl text-sm leading-7 text-forest/60 md:text-base"
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
              class="button-outline"
            >
              Explore Experience
              <ArrowDown :size="16" />
            </NuxtLink>
          </div>

          <!-- EVENT DETAILS -->
          <div
            class="mt-10 grid max-w-3xl grid-cols-2 border-y border-forest/10 py-4 text-[10px] uppercase tracking-[.14em] text-forest/50 sm:grid-cols-4 sm:gap-3"
          >
            <div class="flex items-center gap-2 py-1">
              <CalendarDays :size="14" class="text-primary" />
              Dec 11–12
            </div>

            <div class="flex items-center gap-2 py-1">
              <MapPin :size="14" class="text-primary" />
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
        class="absolute bottom-5 right-5 z-20 hidden items-center gap-2 text-[9px] uppercase tracking-[.2em] text-forest/40 md:flex"
      >
        Scroll to enter
        <ArrowDown :size="13" />
      </a>
    </section>

    <section
      id="enter"
      class="relative overflow-hidden bg-cream-2"
    >
      <!-- VERTICAL RIBBON / PATH -->
      <div
        class="pointer-events-none absolute bottom-0 right-0 top-0 z-0 w-16 md:right-12 md:w-24"
      >
        <!-- translucent ribbon -->
        <div
          class="absolute inset-y-0 right-1/2 w-10 -translate-x-1/2 bg-primary/[.025] md:w-14"
        />

        <!-- outer ribbon edges -->
        <div
          class="absolute inset-y-0 right-[calc(50%-20px)] border-l border-primary/[.10] md:right-[calc(50%-28px)]"
        />

        <div
          class="absolute inset-y-0 right-[calc(50%+20px)] border-r border-primary/[.10] md:right-[calc(50%+28px)]"
        />

        <!-- central path -->
        <div
          class="absolute bottom-0 right-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-primary/20 via-primary/10 to-transparent"
        />

        <!-- starting marker -->
        <div
          class="absolute right-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30 bg-cream-2"
        />

        <!-- path markers -->
        <div
          class="absolute right-1/2 top-[34%] h-2 w-2 -translate-x-1/2 rounded-full bg-primary/20"
        />

        <div
          class="absolute bottom-[18%] right-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary/20"
        />
      </div>

      <!-- CONTENT -->
      <div
        class="section-pad relative z-10 grid gap-14 md:grid-cols-[.75fr_1.25fr] md:items-center"
      >
        <div class="reveal">
          <div class="eyebrow">
            THE DOMINION MESSAGE
          </div>

          <h2 class="display mt-5 text-5xl md:text-7xl">
            A conference built for the move from revelation to ownership.
          </h2>
        </div>

        <div
          class="reveal max-w-2xl text-sm leading-8 text-forest/60 md:text-base"
        >
          <p>
            There comes a moment when praying for more must be followed by
            preparing for more.
          </p>

          <p class="mt-5">
            DOMINION brings faith, wealth-building strategy, ownership,
            entrepreneurship, real estate, investing, mindset and purpose into
            one focused weekend.
          </p>

          <p class="mt-5 font-semibold text-forest">
            This isn't about looking wealthy. It's about building something that
            lasts.
          </p>

          <NuxtLink
            to="/experience"
            class="mt-8 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.16em] text-primary"
          >
            Enter the experience
            <ArrowUpRight :size="15" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="bg-forest text-cream"><div class="section-pad"><div class="reveal"><div class="eyebrow !text-primary-light">THE FOUR MOVEMENTS</div><h2 class="display mt-4 text-5xl md:text-7xl">Occupy. Build. Multiply. Reign.</h2></div><div class="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><article v-for="pillar in site.pillars" :key="pillar.number" class="reveal border border-cream/10 bg-white/[.04] p-6 transition duration-500 hover:-translate-y-2 hover:border-primary/50 md:p-8"><span class="font-mono text-[10px] text-primary-light">{{ pillar.number }}</span><h3 class="display mt-16 text-4xl">{{ pillar.title }}</h3><p class="mt-4 text-sm leading-7 text-cream/55">{{ pillar.body }}</p></article></div></div></section>

    <section class="bg-sage/35"><div class="section-pad grid gap-12 md:grid-cols-[1fr_.8fr] md:items-end"><div class="reveal"><div class="eyebrow">ONE WEEKEND. SEPARATE EXPERIENCES.</div><h2 class="display mt-4 text-5xl md:text-7xl">Choose the page. Then go deeper.</h2></div><div class="reveal grid gap-3 sm:grid-cols-2"><NuxtLink v-for="item in [{to:'/experience',title:'The Experience',body:'Schedule, hotel, pillars and practical details.'},{to:'/people',title:'The People',body:'Founder, speakers and community stories.'},{to:'/tickets',title:'Your Ticket',body:'Compare admission options without the long scroll.'},{to:'/faq',title:'Questions',body:'Fast answers before you commit.'}]" :key="item.to" :to="item.to" class="group border border-forest/10 bg-cream-2 p-6 transition duration-500 hover:-translate-y-1 hover:border-primary/50"><Sparkles :size="18" class="text-primary"/><h3 class="mt-10 font-serif text-2xl">{{ item.title }}</h3><p class="mt-2 text-sm leading-6 text-forest/50">{{ item.body }}</p><span class="mt-7 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.18em] text-primary">Open page <ArrowUpRight :size="13"/></span></NuxtLink></div></div></section>
    <SupportSection />
    <section class="bg-cream-2"><div class="section-pad flex flex-col gap-8 border-t border-forest/10 md:flex-row md:items-end md:justify-between"><div><div class="eyebrow">DECEMBER 11–12 · YONKERS, NEW YORK</div><h2 class="display mt-4 text-5xl md:text-6xl">Ready to take your territory?</h2></div><NuxtLink to="/tickets" class="button-primary">View tickets <ArrowUpRight :size="16"/></NuxtLink></div></section>
  </div>
</template>
