
<script setup lang="ts">
import {
  ArrowUpRight,
  Quote,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from 'lucide-vue-next'

import { site } from '~/data/site'
import CinematicMedia from '~/components/CinematicMedia.vue'

const { revealAll } = useReveal()

useHead({
  title: 'Stories — DOMINION 2026',
})

const testimonials = [
  {
    quote:
      'REIGN IN WEALTH completely shifted my mindset about money, purpose, and what’s possible for my life.',
    name: 'Danielle M.',
  },
  {
    quote:
      'I left feeling empowered, inspired, and ready to take action. This experience was transformational.',
    name: 'Ashley R.',
  },
  {
    quote:
      'The atmosphere, the speakers, the information—everything was powerful. I’m definitely coming back!',
    name: 'Nicole J.',
  },
  {
    quote:
      'I walked in needing direction and walked out with clarity, strategy, and confidence.',
    name: 'Tasha B.',
  },
  {
    quote:
      'This was more than a conference. It was an experience that challenged me to think bigger.',
    name: 'Melissa K.',
  },
  {
    quote:
      'REIGN IN WEALTH gave me the push I needed to stop playing small and start building.',
    name: 'Jasmine T.',
  },
  {
    quote:
      'I learned so much about wealth, ownership, and creating a legacy for my family.',
    name: 'Crystal A.',
  },
  {
    quote:
      'The connections I made were just as valuable as the information. Such an amazing experience!',
    name: 'Simone D.',
  },
  {
    quote:
      'I came expecting information, but I left with a completely different mindset.',
    name: 'Erica W.',
  },
  {
    quote:
      'Powerful, inspiring, and worth every minute. I left ready to REIGN!',
    name: 'Brittany S.',
  },
]

const activeIndex = ref(0)
const isPlaying = ref(true)
const isHovered = ref(false)
const touchStartX = ref(0)

const activeTestimonial = computed(
  () => testimonials[activeIndex.value]!,
)

const nextTestimonial = () => {
  activeIndex.value =
    (activeIndex.value + 1) % testimonials.length
}

const previousTestimonial = () => {
  activeIndex.value =
    (activeIndex.value - 1 + testimonials.length) %
    testimonials.length
}

const goToTestimonial = (index: number) => {
  activeIndex.value = index
}

const toggleAutoplay = () => {
  isPlaying.value = !isPlaying.value
}

let carouselTimer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  revealAll()

  carouselTimer = setInterval(() => {
    if (isPlaying.value && !isHovered.value) {
      nextTestimonial()
    }
  }, 6500)
})

onUnmounted(() => {
  if (carouselTimer) {
    clearInterval(carouselTimer)
  }
})

const handleTouchStart = (event: TouchEvent) => {
  touchStartX.value =
    event.changedTouches[0]?.clientX ?? 0
}

const handleTouchEnd = (event: TouchEvent) => {
  const endX = event.changedTouches[0]?.clientX ?? 0
  const distance = endX - touchStartX.value

  if (Math.abs(distance) < 45) return

  if (distance < 0) {
    nextTestimonial()
  } else {
    previousTestimonial()
  }
}
</script>

<template>
  <div class="pt-[76px]">
    <!-- HERO -->
    <section
      class="relative min-h-[650px] overflow-hidden bg-black text-cream"
    >
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

      <div
        class="section-pad relative z-10 flex min-h-[650px] items-end"
      >
        <div class="reveal max-w-4xl">
          <div class="eyebrow !text-gold">
            THE STORIES
          </div>

          <h1 class="display mt-5 text-6xl md:text-8xl">
            What happens when you decide to move?
          </h1>

          <p
            class="mt-7 max-w-2xl text-sm leading-8 text-cream/60 md:text-base"
          >
            Every room has a moment someone remembers. A
            conversation. A decision. A new idea. A first step.
          </p>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section
      id="testimonials"
      class="relative overflow-hidden bg-cream text-forest"
    >
      <!-- Decorative background -->
      <div
        aria-hidden="true"
        class="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full border border-forest/[0.06]"
      />

      <div
        aria-hidden="true"
        class="pointer-events-none absolute -right-24 top-36 h-64 w-64 rounded-full border border-forest/[0.06]"
      />

      <div class="section-pad relative">
        <!-- Section introduction -->
        <div
          class="reveal flex flex-col justify-between gap-8 md:flex-row md:items-end"
        >
          <div class="max-w-3xl">
            <div class="eyebrow flex items-center gap-3">
              <span class="h-px w-8 bg-primary" />
              VOICES FROM THE ROOM
            </div>

            <h2
              class="display mt-5 text-5xl leading-[0.98] md:text-7xl"
            >
              Some moments
              <span class="text-primary">
                change everything.
              </span>
            </h2>

            <p
              class="mt-6 max-w-xl text-sm leading-7 text-forest/65 md:text-base"
            >
              The lessons, the connections, the shift in
              perspective. Discover the words people have shared
              about their REIGN IN WEALTH experience.
            </p>
          </div>

          <div class="flex items-center gap-3 md:pb-2">
            <div
              class="flex h-12 min-w-24 items-center justify-center border border-forest/10 bg-white/50 px-4"
            >
              <span class="font-serif text-xl tabular-nums">
                {{ String(activeIndex + 1).padStart(2, '0') }}
              </span>

              <span class="mx-2 text-forest/30">/</span>

              <span
                class="text-xs tracking-widest text-forest/50"
              >
                {{ String(testimonials.length).padStart(2, '0') }}
              </span>
            </div>

            <button
              type="button"
              :aria-label="
                isPlaying
                  ? 'Pause automatic carousel'
                  : 'Resume automatic carousel'
              "
              :aria-pressed="isPlaying"
              class="flex h-12 w-12 items-center justify-center border border-forest/10 transition hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              @click="toggleAutoplay"
            >
              <Pause v-if="isPlaying" :size="17" />
              <Play v-else :size="17" />
            </button>
          </div>
        </div>

        <!-- Main carousel -->
        <div
          class="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_280px]"
          @touchstart.passive="handleTouchStart"
          @touchend.passive="handleTouchEnd"
          @mouseenter="isHovered = true"
          @mouseleave="isHovered = false"
        >
          <!-- Featured quote -->
          <div
            class="relative flex min-h-[400px] flex-col justify-between overflow-hidden border border-forest/10 bg-white/65 p-7 shadow-[0_20px_80px_rgba(25,50,30,0.04)] sm:p-10 md:min-h-[440px] md:p-14"
            aria-live="polite"
            aria-atomic="true"
          >
            <!-- Decorative quotation mark -->
            <div
              aria-hidden="true"
              class="pointer-events-none absolute -right-3 -top-16 select-none font-serif text-[19rem] leading-none text-primary/[0.045]"
            >
              ”
            </div>

            <div
              class="relative z-10 flex items-start justify-between gap-5"
            >
              <div
                class="flex h-14 w-14 shrink-0 items-center justify-center bg-forest text-cream"
              >
                <Quote :size="25" :stroke-width="1.5" />
              </div>

              <div class="pt-2 text-right">
                <div
                  class="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary"
                >
                  A REIGN IN WEALTH STORY
                </div>

                <div class="mt-2 text-xs text-forest/45">
                  Testimonial {{ activeIndex + 1 }} of
                  {{ testimonials.length }}
                </div>
              </div>
            </div>

            <Transition name="quote" mode="out-in">
              <div
                :key="activeIndex"
                class="relative z-10 my-10"
              >
                <p
                  class="max-w-3xl font-serif text-3xl leading-[1.25] tracking-[-0.035em] sm:text-4xl md:text-5xl md:leading-[1.2]"
                >
                  “{{ activeTestimonial.quote }}”
                </p>

                <div class="mt-8 flex items-center gap-4">
                  <div class="h-px w-10 bg-primary" />

                  <div>
                    <p class="text-sm font-bold tracking-wide">
                      {{ activeTestimonial.name }}
                    </p>

                    <p
                      class="mt-1 text-[10px] uppercase tracking-[0.2em] text-forest/45"
                    >
                      Previous Attendee
                    </p>
                  </div>
                </div>
              </div>
            </Transition>

            <!-- Navigation -->
            <div
              class="relative z-10 flex items-center justify-between gap-5 border-t border-forest/10 pt-6"
            >
              <p
                class="hidden text-xs tracking-wide text-forest/45 sm:block"
              >
                Real voices. Lasting impact.
              </p>

              <div class="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  class="group flex h-12 w-12 items-center justify-center border border-forest/15 transition duration-300 hover:border-forest hover:bg-forest hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  @click="previousTestimonial"
                >
                  <ChevronLeft
                    :size="19"
                    class="transition-transform group-hover:-translate-x-0.5"
                  />
                </button>

                <button
                  type="button"
                  aria-label="Next testimonial"
                  class="group flex h-12 w-12 items-center justify-center bg-primary text-white transition duration-300 hover:bg-forest focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  @click="nextTestimonial"
                >
                  <ChevronRight
                    :size="19"
                    class="transition-transform group-hover:translate-x-0.5"
                  />
                </button>
              </div>
            </div>
          </div>

          <!-- Testimonial selector -->
          <aside class="flex flex-col">
            <div class="mb-4 flex items-center justify-between">
              <span
                class="text-[10px] font-bold uppercase tracking-[0.22em] text-forest/55"
              >
                EXPLORE THE STORIES
              </span>

              <span class="text-[10px] text-forest/40">
                SELECT A VOICE
              </span>
            </div>

            <div
              class="grid grid-cols-2 gap-2 lg:flex lg:flex-1 lg:flex-col"
            >
              <button
                v-for="(item, index) in testimonials"
                :key="item.name"
                type="button"
                :aria-label="`View testimonial from ${item.name}`"
                :aria-current="
                  activeIndex === index ? 'true' : undefined
                "
                class="group flex min-h-[62px] items-center gap-3 border px-3 py-3 text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:min-h-0 lg:flex-1 lg:px-4 lg:py-2"
                :class="
                  activeIndex === index
                    ? 'border-forest bg-forest text-cream shadow-md'
                    : 'border-forest/10 bg-white/35 text-forest hover:border-primary/50 hover:bg-white/80'
                "
                @click="goToTestimonial(index)"
              >
                <span
                  class="font-serif text-sm tabular-nums"
                  :class="
                    activeIndex === index
                      ? 'text-gold'
                      : 'text-forest/35'
                  "
                >
                  {{ String(index + 1).padStart(2, '0') }}
                </span>

                <span class="min-w-0 flex-1">
                  <span class="block truncate text-xs font-semibold">
                    {{ item.name }}
                  </span>

                  <span
                    class="mt-1 block truncate text-[9px] uppercase tracking-wider"
                    :class="
                      activeIndex === index
                        ? 'text-cream/55'
                        : 'text-forest/40'
                    "
                  >
                    Previous Attendee
                  </span>
                </span>

                <ChevronRight
                  :size="14"
                  class="hidden shrink-0 transition-transform group-hover:translate-x-0.5 lg:block"
                  :class="
                    activeIndex === index
                      ? 'text-gold'
                      : 'text-forest/30'
                  "
                />
              </button>
            </div>
          </aside>
        </div>

        <!-- Clickable progress indicators -->
        <div
          class="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          <button
            v-for="(_, index) in testimonials"
            :key="index"
            type="button"
            :aria-label="`Go to testimonial ${index + 1}`"
            :aria-current="
              activeIndex === index ? 'true' : undefined
            "
            class="flex h-6 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            @click="goToTestimonial(index)"
          >
            <span
              class="h-1 transition-all duration-300"
              :class="
                activeIndex === index
                  ? 'w-9 bg-primary'
                  : 'w-3 bg-forest/20 hover:bg-forest/50'
              "
            />
          </button>
        </div>

        <p
          class="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-forest/40"
        >
          {{
            isPlaying
              ? 'Stories rotate automatically'
              : 'Browsing stories at your pace'
          }}

          <span class="mx-2">·</span>

          Swipe to explore
        </p>
      </div>
    </section>

    <!-- ARCHIVE -->
    <section class="bg-black text-cream">
      <div class="section-pad">
        <div class="reveal">
          <div class="eyebrow !text-gold">
            PAST MOMENTS
          </div>

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
          <div class="eyebrow">
            NEXT CHAPTER
          </div>

          <h2 class="display mt-4 text-5xl md:text-7xl">
            Maybe this is your moment.
          </h2>

          <p
            class="mx-auto mt-6 max-w-xl text-sm leading-7 text-forest/55"
          >
            Come ready to learn, connect, think bigger and leave
            with something you can actually build on.
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