<script setup lang="ts">
import { ArrowUpRight, Instagram } from 'lucide-vue-next'
import { site } from '~/data/site'

const { revealAll } = useReveal()

useHead({
  title: 'People — DOMINION 2026',
})

onMounted(() => revealAll())
</script>

<template>
  <div class="pt-[76px]">
    <!-- INTRO -->
    <section class="bg-black text-cream">
      <div class="section-pad">
        <div class="reveal max-w-4xl">
          <div class="eyebrow !text-gold">THE PEOPLE</div>

          <h1 class="display mt-5 text-6xl md:text-8xl">
            Real people. Real work.
          </h1>

          <p class="mt-7 max-w-2xl text-sm leading-8 text-cream/55 md:text-base">
            DOMINION is built around people who are willing to learn, build,
            ask better questions and do something with what they learn.
          </p>
        </div>
      </div>
    </section>

    <!-- FOUNDER -->
    <section class="bg-cream">
      <div class="section-pad grid gap-12 md:grid-cols-[.8fr_1.2fr] md:items-center">
        <div class="reveal relative min-h-[560px] overflow-hidden bg-black">
          <img
            :src="site.founder.image"
            :alt="`${site.founder.name} — Founder & Visionary`"
            class="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />

          <div
            class="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"
          />

          <div class="relative z-10 flex min-h-[560px] items-end p-7 text-cream">
            <div>
              <div class="eyebrow !text-gold">
                FOUNDER & VISIONARY
              </div>

              <div class="mt-2 font-serif text-4xl">
                {{ site.founder.name }}
              </div>

              <p class="mt-2 text-xs text-cream/50">
                {{ site.founder.role }}
              </p>
            </div>
          </div>
        </div>

        <div class="reveal">
          <p class="max-w-2xl font-serif text-3xl italic leading-tight text-primary md:text-4xl">
            “{{ site.founder.quote }}”
          </p>

          <p class="mt-8 max-w-2xl text-sm leading-8 text-forest/60">
            {{ site.founder.bio }}
          </p>

          <a
            :href="site.socials.instagram"
            target="_blank"
            rel="noopener"
            class="mt-7 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.16em] text-primary transition hover:text-gold-dark"
          >
            Follow the journey
            <Instagram :size="15" />
          </a>
        </div>
      </div>
    </section>

    <!-- SPEAKERS -->
    <section class="bg-[#0b0c0b] text-cream">
      <div class="section-pad">
        <div class="reveal max-w-3xl">
          <div class="eyebrow !text-gold">SPEAKERS</div>

          <h2 class="display mt-4 text-5xl md:text-7xl">
            The room is still coming together.
          </h2>

          <p class="mt-6 max-w-2xl text-sm leading-7 text-cream/50">
            Speaker announcements will be added as the DOMINION 2026 lineup is
            confirmed.
          </p>
        </div>

        <div class="mt-12 grid gap-4 md:grid-cols-3">
          <article
            v-for="speaker in site.speakers"
            :key="speaker.image"
            class="reveal overflow-hidden border border-white/10 bg-white/[.03]"
          >
            <img
              :src="speaker.image"
              :alt="speaker.name"
              class="h-72 w-full object-cover"
              loading="lazy"
            />

            <div class="p-6">
              <div class="font-mono text-[9px] uppercase tracking-[.18em] text-gold">
                {{ speaker.expertise }}
              </div>

              <h3 class="mt-3 font-serif text-2xl">
                {{ speaker.name }}
              </h3>

              <p class="mt-1 text-xs text-cream/35">
                {{ speaker.title }}
              </p>

              <p class="mt-4 text-sm leading-6 text-cream/50">
                {{ speaker.bio }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- STORIES -->
    <section class="bg-cream-2 text-forest">
      <div class="section-pad">
        <div
          class="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <div class="eyebrow">COMMUNITY</div>

            <h2 class="display mt-4 text-5xl md:text-6xl">
              The people matter more than the stage.
            </h2>
          </div>

          <NuxtLink
            to="/stories"
            class="button-outline"
          >
            Read the stories
            <ArrowUpRight :size="15" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>