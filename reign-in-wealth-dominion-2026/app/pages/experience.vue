<script setup lang="ts">
import {
  ArrowUpRight,
  Clock,
  MapPin,
  Hotel,
  CalendarDays,
} from 'lucide-vue-next'
import { site } from '~/data/site'

const { revealAll } = useReveal()

useHead({
  title: 'The Experience — DOMINION 2026',
})

onMounted(() => revealAll())
</script>

<template>
  <div class="pt-[76px]">
    <!-- INTRO -->
    <section class="relative min-h-[680px] overflow-hidden bg-black text-cream">
      <div
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('https://images.pexels.com/photos/33295775/pexels-photo-33295775.jpeg?_gl=1*u4oyz6*_ga*MTE1ODI0NzIwMy4xNzkwODM4Njk0*_ga_8JE65Q40S6*czE3OTA4Mzg2OTMkbzEkZzEkdDE3OTA4Mzk5NzckajU5JGwwJGgw')"
      
      />

      <div class="absolute inset-0 bg-black/70" />
      <div
        class="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/35"
      />

      <div class="relative z-10 section-pad flex min-h-[680px] items-end">
        <div class="reveal max-w-4xl">
          <div class="eyebrow !text-gold">THE EXPERIENCE</div>

          <h1 class="display mt-5 text-6xl md:text-8xl">
            Two days to think differently.
          </h1>

          <p class="mt-7 max-w-2xl text-sm leading-8 text-cream/65 md:text-base">
            DOMINION brings faith, business, real estate, wealth-building and
            purpose into one room — with practical conversations you can take
            home and use.
          </p>

          <div
            class="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/15 pt-5 text-[10px] uppercase tracking-[.16em] text-cream/45"
          >
            <span>December 11–12</span>
            <span>Yonkers, New York</span>
            <span>Faith + Strategy</span>
            <span>Ownership + Impact</span>
          </div>
        </div>
      </div>
    </section>

    <!-- FOUR MOVEMENTS -->
    <section class="bg-black text-cream">
      <div class="section-pad">
        <div class="reveal max-w-3xl">
          <div class="eyebrow !text-gold">THE FOUR MOVEMENTS</div>

          <h2 class="display mt-4 text-5xl md:text-7xl">
            The work moves from vision to action.
          </h2>

          <p class="mt-6 max-w-2xl text-sm leading-7 text-cream/50">
            Four ideas shape the weekend. Each one asks a different question
            about what you are building, what you are responsible for, and
            what comes next.
          </p>
        </div>

        <div class="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="pillar in site.pillars"
            :key="pillar.number"
            class="reveal bg-black p-7 transition duration-500 hover:bg-[#0c0d0c] md:p-8"
          >
            <span class="font-mono text-[10px] text-gold">
              {{ pillar.number }}
            </span>

            <h2 class="display mt-20 text-4xl">
              {{ pillar.title }}
            </h2>

            <p class="mt-4 text-sm leading-7 text-cream/50">
              {{ pillar.body }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- SCHEDULE -->
    <section id="schedule" class="bg-cream-2 text-forest">
      <div class="section-pad">
        <div class="reveal max-w-3xl">
          <div class="eyebrow">THE WEEKEND</div>

          <h2 class="display mt-4 text-5xl md:text-7xl">
            Come for the moment. Leave with a plan.
          </h2>

          <p class="mt-6 max-w-2xl text-sm leading-7 text-forest/55">
            The weekend moves between teaching, conversation, practical
            sessions, connection and moments to step back and think.
          </p>
        </div>

        <div class="mt-12 divide-y divide-forest/10 border-y border-forest/10">
          <article
            v-for="item in site.schedule"
            :key="item.day + item.time + item.title"
            class="reveal grid gap-5 py-7 md:grid-cols-[180px_150px_1fr_auto] md:items-start"
          >
            <div class="font-mono text-[10px] tracking-[.16em] text-primary">
              {{ item.day }}
            </div>

            <div class="flex items-center gap-2 text-xs font-bold text-forest/60">
              <Clock :size="14" class="text-primary" />
              {{ item.time }}
            </div>

            <div>
              <h3 class="font-serif text-2xl text-forest">
                {{ item.title }}
              </h3>

              <p class="mt-2 max-w-2xl text-sm leading-7 text-forest/50">
                {{ item.body }}
              </p>
            </div>

            <span
              class="w-fit border border-forest/10 px-3 py-1 font-mono text-[9px] text-forest/45"
            >
              {{ item.type }}
            </span>
          </article>
        </div>
      </div>
    </section>

    <!-- STAY -->
    <section
      id="stay"
      class="relative overflow-hidden bg-black text-cream"
    >
      <div
        class="absolute inset-0 bg-cover bg-center opacity-75"
        style="background-image: url('https://images.pexels.com/photos/31434235/pexels-photo-31434235.jpeg?_gl=1*1hq02k*_ga*MTE1ODI0NzIwMy4xNzkwODM4Njk0*_ga_8JE65Q40S6*czE3OTA4Mzg2OTMkbzEkZzEkdDE3OTA4Mzk5MTYkajYwJGwwJGgw')"
      />

      <div class="absolute inset-0 bg-black/75" />

      <div
        class="relative z-10 section-pad grid gap-12 md:grid-cols-[1fr_.8fr] md:items-center"
      >
        <div class="reveal">
          <div class="eyebrow !text-gold">STAY CLOSE</div>

          <h2 class="display mt-4 text-5xl md:text-7xl">
            Give yourself room for the whole weekend.
          </h2>

          <p class="mt-6 max-w-xl text-sm leading-7 text-cream/55">
            The conference hotel gives you a simple place to stay close to the
            weekend. A group rate of {{ site.hotel.rate }} per night is
            available through {{ site.hotel.bookingDeadline }}.
          </p>

          <a
            :href="site.hotel.bookingUrl"
            target="_blank"
            rel="noopener"
            class="button-gold mt-7"
          >
            Book your room
            <ArrowUpRight :size="15" />
          </a>
        </div>

        <div class="reveal border border-white/10 bg-white/[.04] p-7 backdrop-blur-sm">
          <div class="flex items-center gap-3">
            <Hotel :size="20" class="text-gold" />
            <span class="eyebrow !text-gold">HOTEL DETAILS</span>
          </div>

          <dl class="mt-7 space-y-5 text-sm">
            <div>
              <dt class="text-cream/35">Property</dt>
              <dd class="mt-1 font-semibold">{{ site.hotel.name }}</dd>
            </div>

            <div>
              <dt class="text-cream/35">Location</dt>
              <dd class="mt-1 text-cream/70">{{ site.hotel.address }}</dd>
            </div>

            <div>
              <dt class="text-cream/35">Group name</dt>
              <dd class="mt-1 text-cream/70">{{ site.hotel.groupName }}</dd>
            </div>

            <div>
              <dt class="text-cream/35">Phone</dt>
              <dd class="mt-1 text-cream/70">{{ site.hotel.phone }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  </div>
</template>