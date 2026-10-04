<script setup lang="ts">
import { ArrowUpRight, Quote } from 'lucide-vue-next'
import { site } from '~/data/site'
import CinematicMedia from '~/components/CinematicMedia.vue'

const { revealAll } = useReveal()

useHead({
  title: 'Stories — DOMINION 2026',
})

onMounted(() => revealAll())
</script>

<template>
  <div class="pt-[76px]">
    <!-- HERO -->
    <section class="relative min-h-[650px] overflow-hidden bg-black text-cream">
      <div class="absolute inset-0 opacity-90">
        <CinematicMedia
          video="cinematic/video2.mov"
          :poster="site.hero.poster"
        />
      </div>

      <div class="absolute inset-0 bg-black/65" />

      <div
        class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"
      />

      <div class="relative z-10 section-pad flex min-h-[650px] items-end">
        <div class="reveal max-w-4xl">
          <div class="eyebrow !text-gold">THE STORIES</div>

          <h1 class="display mt-5 text-6xl md:text-8xl">
            What happens when you decide to move?
          </h1>

          <p class="mt-7 max-w-2xl text-sm leading-8 text-cream/60 md:text-base">
            Every room has a moment someone remembers. A conversation. A
            decision. A new idea. A first step.
          </p>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section class="bg-cream text-forest">
      <div class="section-pad">
        <div class="reveal max-w-3xl">
          <div class="eyebrow">VOICES FROM THE ROOM</div>

          <h2 class="display mt-4 text-5xl md:text-7xl">
            The part that stays with you.
          </h2>
        </div>

        <div class="mt-12 grid gap-4 md:grid-cols-3">
          <article
            v-for="(quote, i) in site.testimonials"
            :key="i"
            class="reveal border border-forest/10 bg-white/45 p-7"
          >
            <Quote :size="20" class="text-primary" />

            <p class="mt-8 font-serif text-2xl leading-tight text-forest">
              “{{ quote.quote }}”
            </p>

            <div class="mt-10 border-t border-forest/10 pt-4">
              <div class="text-sm font-bold text-forest">
                {{ quote.name }}
              </div>

              <div class="mt-1 text-xs text-forest/55">
                {{ quote.role }}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ARCHIVE -->
    <section class="bg-black text-cream">
      <div class="section-pad">
        <div class="reveal">
          <div class="eyebrow !text-gold">PAST MOMENTS</div>

          <h2 class="display mt-4 text-5xl md:text-7xl">
            Remember the room.
          </h2>
        </div>

        <div
          class="mt-12 grid auto-rows-[220px] grid-cols-2 gap-3 md:auto-rows-[280px] md:grid-cols-3"
        >
          <div
            v-for="(image, i) in site.gallery"
            :key="image"
            class="reveal overflow-hidden border border-white/10 bg-white/[.03]"
            :class="i === 0 ? 'col-span-2 row-span-2' : ''"
          >
            <img
              :src="image"
              alt="Reign in Wealth event moment"
              loading="lazy"
              class="h-full w-full object-cover transition duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- CLOSING -->
    <section class="bg-cream-2 text-forest">
      <div class="section-pad text-center">
        <div class="reveal mx-auto max-w-3xl">
          <div class="eyebrow">NEXT CHAPTER</div>

          <h2 class="display mt-4 text-5xl md:text-7xl">
            Maybe this is your moment.
          </h2>

          <p class="mx-auto mt-6 max-w-xl text-sm leading-7 text-forest/55 w-100">
            Come ready to learn, connect, think bigger and leave with something
            you can actually build on.
          </p>

          <NuxtLink
            to="/tickets"
            class="button-primary mt-8"
          >
            Enter DOMINION
            <ArrowUpRight :size="15" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>