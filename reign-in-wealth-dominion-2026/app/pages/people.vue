
<script setup lang="ts">
import {
  ArrowUpRight,
  Instagram,
  Plus,
  Sparkles,
} from 'lucide-vue-next'

import { site } from '~/data/site'

const { revealAll } = useReveal()

useHead({
  title: 'People — DOMINION 2026',
  meta: [
    {
      name: 'description',
      content:
        'Meet the people behind DOMINION 2026 — Reign in Wealth Conference.',
    },
  ],
})

const upcomingSpeakers = [
  {
    number: '01',
    label: 'SPEAKER',
    title: 'TO BE ANNOUNCED',
    description:
      'A voice with something valuable to say. The first DOMINION 2026 speaker announcement is coming soon.',
  },
  {
    number: '02',
    label: 'SPEAKER',
    title: 'TO BE ANNOUNCED',
    description:
      'More builders, thinkers, leaders, and wealth creators will join the DOMINION experience.',
  },
  {
    number: '03',
    label: 'SPEAKER',
    title: 'TO BE ANNOUNCED',
    description:
      'The lineup is being carefully curated. Stay connected for the next announcement.',
  },
]

onMounted(() => {
  revealAll()
})
</script>

<template>
  <div class="pt-[76px]">

    <!-- ===================================================== -->
    <!-- HERO -->
    <!-- ===================================================== -->

    <section class="relative overflow-hidden bg-black text-cream">
      <div
        class="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[140px]"
      />

      <div
        class="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-gold/5 blur-[120px]"
      />

      <div class="section-pad relative">
        <div class="grid gap-16 lg:grid-cols-[1fr_.7fr] lg:items-end">

          <div class="reveal max-w-5xl">

            <div class="flex items-center gap-3">
              <span
                class="h-px w-8 bg-gold"
              />

              <div class="eyebrow !text-gold">
                THE PEOPLE
              </div>
            </div>

            <h1
              class="display mt-7 text-6xl leading-[.88] tracking-[-.04em] md:text-8xl lg:text-[9rem]"
            >
              The people
              <br />
              <span class="text-cream/35">behind</span>
              <br />
              DOMINION.
            </h1>

            <p
              class="mt-9 max-w-xl text-sm leading-8 text-cream/50 md:text-base"
            >
              DOMINION isn't built around a stage.
              It's built around people willing to learn, build,
              ask better questions, create opportunity, and do
              something meaningful with what they learn.
            </p>

          </div>

          <div class="reveal lg:pb-3">

            <div
              class="border-l border-white/10 pl-6"
            >
              <div
                class="font-mono text-[9px] uppercase tracking-[.2em] text-gold"
              >
                DOMINION 2026
              </div>

              <p
                class="mt-4 font-serif text-2xl italic leading-tight text-cream/80 md:text-3xl"
              >
                “Pray. Prepare. Build. Own. Multiply.”
              </p>

              <div class="mt-6 flex items-center gap-3">
                <div class="h-px w-10 bg-white/20" />

                <span
                  class="text-[10px] font-bold uppercase tracking-[.18em] text-cream/30"
                >
                  Reign in Wealth
                </span>
              </div>
            </div>

          </div>

        </div>

        <!-- Bottom metadata -->
        <div
          class="mt-20 grid border-t border-white/10 pt-6 sm:grid-cols-3"
        >
          <div class="reveal py-4 sm:border-r sm:border-white/10 sm:pr-8">
            <div
              class="font-mono text-[9px] uppercase tracking-[.2em] text-cream/30"
            >
              DATE
            </div>

            <div class="mt-2 text-sm font-bold">
              December 11–12, 2026
            </div>
          </div>

          <div
            class="reveal border-t border-white/10 py-4 sm:border-t-0 sm:px-8 sm:border-r"
          >
            <div
              class="font-mono text-[9px] uppercase tracking-[.2em] text-cream/30"
            >
              LOCATION
            </div>

            <div class="mt-2 text-sm font-bold">
              Yonkers, New York
            </div>
          </div>

          <div
            class="reveal border-t border-white/10 py-4 sm:border-t-0 sm:pl-8"
          >
            <div
              class="font-mono text-[9px] uppercase tracking-[.2em] text-cream/30"
            >
              THE MISSION
            </div>

            <div class="mt-2 text-sm font-bold">
              Occupy. Build. Multiply. Reign.
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ===================================================== -->
    <!-- FOUNDER -->
    <!-- ===================================================== -->

    <section class="bg-cream text-forest">
      <div
        class="section-pad grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:items-center"
      >

        <!-- Image -->
        <div
          class="reveal relative min-h-[560px] overflow-hidden bg-black md:min-h-[680px]"
        >
          <img
            :src="site.founder.image"
            :alt="`${site.founder.name} — Founder & Visionary`"
            class="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />

          <div
            class="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"
          />

          <div
            class="absolute left-6 top-6 flex items-center gap-2"
          >
            <span
              class="rounded-full border border-white/20 bg-black/30 px-3 py-1.5 font-mono text-[8px] font-bold uppercase tracking-[.2em] text-white backdrop-blur"
            >
              FOUNDER
            </span>
          </div>

          <div
            class="absolute bottom-0 left-0 right-0 p-7 text-white md:p-9"
          >
            <div
              class="font-mono text-[9px] uppercase tracking-[.2em] text-gold"
            >
              FOUNDER & VISIONARY
            </div>

            <div
              class="mt-2 font-serif text-4xl md:text-5xl"
            >
              {{ site.founder.name }}
            </div>

            <p class="mt-2 text-xs text-white/50">
              {{ site.founder.role }}
            </p>
          </div>
        </div>

        <!-- Content -->
        <div class="reveal max-w-2xl">

          <div class="flex items-center gap-3">
            <span class="h-px w-8 bg-primary" />

            <div class="eyebrow">
              THE VISION
            </div>
          </div>

          <p
            class="mt-7 font-serif text-4xl italic leading-[1.05] text-primary md:text-5xl lg:text-6xl"
          >
            “{{ site.founder.quote }}”
          </p>

          <div class="my-10 h-px w-full bg-forest/10" />

          <p
            class="text-sm leading-8 text-forest/60 md:text-base"
          >
            {{ site.founder.bio }}
          </p>

          <a
            :href="site.socials.instagram"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-8 inline-flex items-center gap-3 text-xs font-extrabold uppercase tracking-[.16em] text-primary transition hover:text-gold-dark"
          >
            Follow the journey

            <span
              class="flex h-8 w-8 items-center justify-center rounded-full border border-forest/10"
            >
              <Instagram :size="14" />
            </span>
          </a>

        </div>

      </div>
    </section>


    <!-- ===================================================== -->
    <!-- SPEAKERS -->
    <!-- ===================================================== -->

    <section class="relative overflow-hidden bg-[#0b0c0b] text-cream">

      <div
        class="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary/5 blur-[130px]"
      />

      <div class="section-pad relative">

        <!-- Header -->
        <div
          class="reveal grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"
        >

          <div class="max-w-4xl">

            <div class="flex items-center gap-3">
              <span class="h-px w-8 bg-gold" />

              <div class="eyebrow !text-gold">
                THE LINEUP
              </div>
            </div>

            <h2
              class="display mt-5 text-5xl leading-[.9] tracking-[-.03em] md:text-7xl lg:text-8xl"
            >
              Voices worth
              <br />
              <span class="text-cream/30">
                waiting for.
              </span>
            </h2>

            <p
              class="mt-7 max-w-2xl text-sm leading-7 text-cream/45 md:text-base"
            >
              The DOMINION 2026 speaker lineup is currently being curated.
              Names will be revealed as each speaker is officially confirmed.
            </p>

          </div>

          <div
            class="flex items-center gap-3 border border-white/10 bg-white/[.03] px-5 py-4"
          >
            <Sparkles
              :size="15"
              class="text-gold"
            />

            <div>
              <div
                class="font-mono text-[8px] uppercase tracking-[.2em] text-cream/30"
              >
                STATUS
              </div>

              <div
                class="mt-1 text-xs font-bold uppercase tracking-[.12em]"
              >
                Lineup developing
              </div>
            </div>
          </div>

        </div>


        <!-- Announcement cards -->
        <div
          class="mt-16 grid gap-4 md:grid-cols-3"
        >

          <article
            v-for="speaker in upcomingSpeakers"
            :key="speaker.number"
            class="reveal group relative min-h-[390px] overflow-hidden border border-white/10 bg-white/[.025] transition duration-500 hover:border-gold/30 hover:bg-white/[.045]"
          >

            <!-- Large background number -->
            <div
              class="pointer-events-none absolute -right-4 -top-8 font-serif text-[180px] leading-none text-white/[.025] transition duration-700 group-hover:text-gold/[.06]"
            >
              {{ speaker.number }}
            </div>

            <div class="relative flex h-full flex-col p-7 md:p-8">

              <!-- Top -->
              <div
                class="flex items-center justify-between"
              >
                <span
                  class="font-mono text-[9px] font-bold uppercase tracking-[.2em] text-gold"
                >
                  {{ speaker.label }}
                </span>

                <span
                  class="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-cream/30 transition group-hover:border-gold/30 group-hover:text-gold"
                >
                  <Plus :size="14" />
                </span>
              </div>

              <!-- Center -->
              <div class="my-auto py-14">

                <div
                  class="mb-5 h-px w-10 bg-gold/50"
                />

                <h3
                  class="font-serif text-3xl leading-tight md:text-4xl"
                >
                  {{ speaker.title }}
                </h3>

                <p
                  class="mt-5 max-w-xs text-sm leading-7 text-cream/35"
                >
                  {{ speaker.description }}
                </p>

              </div>

              <!-- Bottom -->
              <div
                class="flex items-end justify-between border-t border-white/10 pt-5"
              >
                <span
                  class="font-mono text-[9px] uppercase tracking-[.2em] text-cream/25"
                >
                  ANNOUNCEMENT
                </span>

                <span
                  class="font-mono text-[9px] tracking-[.15em] text-cream/20"
                >
                  {{ speaker.number }}
                </span>
              </div>

            </div>

          </article>

        </div>


        <!-- Announcement footer -->
        <div
          class="reveal mt-6 border border-white/10 bg-white/[.02] p-6 md:flex md:items-center md:justify-between md:p-8"
        >

          <div class="flex gap-4">

            <div
              class="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-black"
            >
              <Sparkles :size="15" />
            </div>

            <div>
              <div
                class="text-sm font-bold uppercase tracking-[.1em]"
              >
                More names are coming.
              </div>

              <p
                class="mt-2 max-w-xl text-xs leading-6 text-cream/35"
              >
                Follow Reign in Wealth for official speaker announcements,
                event updates, and everything leading into DOMINION 2026.
              </p>
            </div>

          </div>

          <a
            :href="site.socials.instagram"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-6 inline-flex shrink-0 items-center gap-2 text-xs font-extrabold uppercase tracking-[.16em] text-gold transition hover:text-cream md:mt-0"
          >
            Follow @reigninwealth
            <ArrowUpRight :size="15" />
          </a>

        </div>

      </div>
    </section>


    <!-- ===================================================== -->
    <!-- WHAT TO EXPECT -->
    <!-- ===================================================== -->

    <section class="bg-cream-2 text-forest">

      <div class="section-pad">

        <div class="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">

          <div class="reveal">

            <div class="eyebrow">
              THE EXPERIENCE
            </div>

            <h2
              class="display mt-5 text-5xl leading-[.9] md:text-7xl"
            >
              Come for
              <br />
              <span class="text-primary">
                the people.
              </span>
            </h2>

            <p
              class="mt-7 max-w-md text-sm leading-7 text-forest/50"
            >
              The conversations between sessions can be just as valuable
              as what happens on stage. DOMINION is designed to create
              space for connection, strategy, collaboration, and meaningful
              relationships.
            </p>

          </div>


          <div class="grid gap-x-8 sm:grid-cols-2">

            <div
              v-for="(item, index) in site.experience"
              :key="item"
              class="reveal group flex gap-5 border-t border-forest/10 py-5"
            >

              <span
                class="font-mono text-[9px] text-primary/50"
              >
                {{ String(index + 1).padStart(2, '0') }}
              </span>

              <span
                class="text-sm font-medium text-forest/70 transition group-hover:text-primary"
              >
                {{ item }}
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>


    <!-- ===================================================== -->
    <!-- COMMUNITY CTA -->
    <!-- ===================================================== -->

    <section class="bg-primary text-cream">

      <div class="section-pad">

        <div
          class="reveal mx-auto max-w-4xl text-center"
        >

          <div
            class="eyebrow !text-gold"
          >
            JOIN THE ROOM
          </div>

          <h2
            class="display mt-5 text-5xl leading-[.9] md:text-7xl lg:text-8xl"
          >
            Your next
            <br />
            connection could
            <br />
            change everything.
          </h2>

          <p
            class="mx-auto mt-7 max-w-xl text-sm leading-7 text-cream/65 md:text-base"
          >
            Two days of faith, wealth, ownership, strategy,
            wellness, connection, and conversations that can
            move your life and business forward.
          </p>

          <NuxtLink
            to="/tickets"
            class="button-light mt-9 inline-flex"
          >
            Explore tickets
            <ArrowUpRight :size="15" />
          </NuxtLink>

        </div>

      </div>

    </section>

  </div>
</template>

