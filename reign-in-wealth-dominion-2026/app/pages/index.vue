
<script setup lang="ts">
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Building2,
  Lightbulb,
  Wallet,
  BriefcaseBusiness,
  HeartPulse,
  Users,
  Play,
  Quote,
  Crown,
  Check,
  Sparkles,
} from 'lucide-vue-next'

import { site } from '~/data/site'
import CinematicMedia from '~/components/CinematicMedia.vue'
import SupportSection from '~/components/SupportSection.vue'

const { revealAll } = useReveal()
const config = useRuntimeConfig()

useSeo({
  title: 'DOMINION 2026 | Reign in Wealth Conference',
  description:
    'Two transformational days of real estate, entrepreneurship, wealth-building education, wellness, faith, and meaningful connections. December 11–12, 2026, in Yonkers, New York.',
  path: '/',
})

const buildPillars = [
  {
    number: '01',
    title: 'BUILD WEALTH THROUGH REAL ESTATE',
    description:
      'Discover strategies for purchasing investment properties, understanding real estate development, and exploring opportunities to build a property portfolio.',
    image: 'https://images.pexels.com/photos/10854904/pexels-photo-10854904.jpeg?_gl=1*139lgaj*_ga*MTcwODY2MDI4OS4xNzg1ODY3OTYz*_ga_8JE65Q40S6*czE3OTMyMjA5MTUkbzckZzEkdDE3OTMyMjEwNTckajM3JGwwJGgw',
    imageAlt: 'Real estate and property investment',
    icon: Building2,
  },
  {
    number: '02',
    title: 'TURN YOUR IDEAS INTO INCOME',
    description:
      'Learn about entrepreneurship, starting and operating a group-home business, and building a business with purpose and a sustainable foundation.',
    image: 'https://images.pexels.com/photos/6693652/pexels-photo-6693652.jpeg?_gl=1*l72qys*_ga*MTcwODY2MDI4OS4xNzg1ODY3OTYz*_ga_8JE65Q40S6*czE3OTM1MjA4NzkkbzgkZzEkdDE3OTM1MjA5MTEkajI4JGwwJGgw',
    imageAlt: 'Entrepreneur working on a business plan',
    icon: Lightbulb,
  },
  {
    number: '03',
    title: 'LEARN HOW MONEY WORKS',
    description:
      'Explore wealth-building strategies, financial planning, REITs, and an introduction to trading so you can make more informed financial decisions.',
    image: 'https://images.pexels.com/photos/39105676/pexels-photo-39105676.jpeg',
    imageAlt: 'Financial planning and investment education',
    icon: Wallet,
  },
  {
    number: '04',
    title: 'ELEVATE YOUR REAL ESTATE CAREER',
    description:
      'Hear from experienced Realtors and industry leaders about building a successful real estate business, creating opportunities, and positioning yourself for long-term growth.',
    image: 'https://images.pexels.com/photos/32379376/pexels-photo-32379376.jpeg?_gl=1*c9vsnc*_ga*MTcwODY2MDI4OS4xNzg1ODY3OTYz*_ga_8JE65Q40S6*czE3OTE1NTAyNzEkbzQkZzEkdDE3OTE1NTEzMDMkajU4JGwwJGgw',
    imageAlt: 'Real estate professionals discussing business',
    icon: BriefcaseBusiness,
  },
  {
    number: '05',
    title: 'STRENGTHEN YOUR MIND, BODY & FAITH',
    description:
      'Experience conversations about health, wellness, mindset, and biblical principles that aid your personal, professional, and financial growth.',
    image: 'https://images.pexels.com/photos/12745511/pexels-photo-12745511.jpeg?_gl=1*jvnj1v*_ga*MTcwODY2MDI4OS4xNzg1ODY3OTYz*_ga_8JE65Q40S6*czE3OTE1NTAyNzEkbzQkZzEkdDE3OTE1NTA0OTQkajYwJGwwJGgw',
    imageAlt: 'Wellness, personal growth, and reflection',
    icon: HeartPulse,
  },
  {
    number: '06',
    title: 'CONNECT WITH PEOPLE WHO ARE BUILDING',
    description:
      'Meet entrepreneurs, investors, professionals, and visionaries who are serious about ownership, opportunity, and legacy.',
    image: '/images/events/4.jpg',
    imageAlt: 'Professionals networking at a conference',
    icon: Users,
  },
]

const vipBenefits = [
  {
    title: 'The Wealth Accelerator',
    description:
      'Practical strategies to build, protect, and multiply wealth.',
  },
  {
    title: 'The Real Estate Career Pivot',
    description:
      'Explore how to transition into real estate and build a sustainable career.',
  },
  {
    title: 'Health Is My Wealth',
    description:
      'Expert conversations about wellness, prevention, and protecting your health.',
  },
  {
    title: 'The Wealth & Wellness Inner Circle',
    description:
      'A more intimate setting for meaningful discussions and insights.',
  },
  {
    title: 'Exclusive VIP Networking Lunch',
    description:
      'Connect with speakers, professionals, entrepreneurs, and fellow attendees.',
  },
]

const regularTicket = site.tickets.find(
  (ticket) => ticket.id === 'regular',
)

const vipTicket = site.tickets.find(
  (ticket) => ticket.id === 'vip',
)

const galaTicket = site.tickets.find(
  (ticket) => ticket.id === 'gala',
)

const previousConferenceImages = [
  '/images/events/1.jpg',
  '/images/events/2.jpg',
  '/images/events/3.jpg',
  '/images/events/4.jpg',
  '/images/events/5.jpg',
  '/images/events/6.jpg',
]

const testimonials = site.testimonials.slice(0, 3)

onMounted(() => {
  revealAll()
})
</script>

<template>
  <main id="top">
    <!-- HERO -->
    <section
      class="grain relative min-h-[90vh] overflow-hidden bg-ink text-white md:min-h-screen"
    >
      <div class="absolute inset-0">
        <CinematicMedia
          :video="site.hero.video"
          :poster="site.hero.poster"
          background
        />

        <div class="absolute inset-0 bg-ink/55" />

        <div
          class="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/25"
        />

        <div
          class="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/30"
        />
      </div>

      <div
        aria-hidden="true"
        class="absolute inset-0 line-grid-dark opacity-20"
      />

      <div
        aria-hidden="true"
        class="absolute -right-[15%] top-[12%] h-[65vw] w-[65vw] rounded-full border border-gold/15"
      />

      <div
        aria-hidden="true"
        class="absolute right-[5%] top-[25%] h-[35vw] w-[35vw] rounded-full border border-gold/10"
      />

      <div
        class="section-pad relative z-10 flex min-h-[90vh] items-center pt-32 md:min-h-screen"
      >
        <div class="reveal max-w-5xl py-12">
          <div class="eyebrow !text-gold-light">
            REIGN IN WEALTH CONFERENCE 2026
          </div>

          <h1
            class="display mt-6 text-[18vw] leading-[.78] tracking-[-0.065em] sm:text-[15vw] md:text-[12vw]"
          >
            DOMINION
          </h1>

          <p
            class="mt-8 font-serif text-2xl italic text-gold-light md:text-4xl"
          >
            Occupy. Build. Multiply. Reign.
          </p>

          <div
            class="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-semibold uppercase tracking-[.12em] text-white/75 md:text-sm"
          >
            <span class="flex items-center gap-2">
              <CalendarDays :size="15" class="text-gold" />
              December 11–12, 2026
            </span>

            <span class="hidden h-4 w-px bg-white/20 sm:block" />

            <span class="flex items-center gap-2">
              <MapPin :size="15" class="text-gold" />
              Yonkers, New York
            </span>
          </div>

          <h2
            class="mt-10 max-w-3xl text-xs font-bold uppercase leading-6 tracking-[.16em] text-gold-light md:text-sm"
          >
            YOUR NEXT LEVEL REQUIRES MORE THAN INSPIRATION. IT REQUIRES STRATEGY.
          </h2>

          <p
            class="mt-4 max-w-2xl text-sm leading-8 text-white/70 md:text-base"
          >
            Are you ready to invest in real estate, build a business, create
            multiple streams of income, strengthen your financial future, and
            connect with people who are building wealth with purpose?
          </p>

          <p
            class="mt-4 max-w-2xl text-sm leading-8 text-white/70 md:text-base"
          >
            Welcome to REIGN IN WEALTH: DOMINION 2026. Two transformational
            days bringing together real estate investors, entrepreneurs,
            financial experts, industry leaders, and faith-driven visionaries
            for practical education, powerful conversations, and meaningful
            connections.
          </p>

          <p class="mt-4 max-w-2xl text-sm leading-8 text-white/80 md:text-base">
            Stop just dreaming about what you could build. Start preparing
            to build it.
          </p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <NuxtLink
              to="/tickets"
              class="button-primary justify-center"
            >
              SECURE YOUR SEAT
              <ArrowUpRight :size="16" />
            </NuxtLink>

            <NuxtLink
              to="#vip-experience"
              class="button-dark-outline justify-center"
            >
              EXPLORE THE VIP EXPERIENCE
              <ArrowDown :size="16" />
            </NuxtLink>
          </div>

          <div
            class="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/55"
          >
            <span>Regular ${{ regularTicket?.price ?? 250 }}</span>
            <span class="text-gold">•</span>
            <span>VIP ${{ vipTicket?.price ?? 397 }}</span>
            <span class="text-gold">•</span>
            <span>Gala Only ${{ galaTicket?.price ?? 197 }}</span>
          </div>

          <p class="mt-3 text-[11px] leading-5 text-white/45">
            Regular and VIP conference tickets include the Saturday
            Fundraising Gala.
          </p>
        </div>
      </div>

      <a
        href="#what-youll-build"
        aria-label="Explore what you will learn at DOMINION"
        class="absolute bottom-6 right-6 z-20 hidden items-center gap-3 text-[10px] font-semibold uppercase tracking-[.2em] text-white/50 transition hover:text-gold-light md:flex"
      >
        Explore what's possible
        <ArrowDown :size="14" />
      </a>
    </section>

    <!-- WHAT WILL YOU BUILD NEXT? -->
    <section
      id="what-youll-build"
      class="relative overflow-hidden bg-cream-2 text-forest"
    >
      <div
        aria-hidden="true"
        class="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full border border-forest/[0.06]"
      />

      <div class="section-pad relative">
        <div
          class="reveal mx-auto max-w-3xl text-center"
        >
          <div class="eyebrow justify-center">
            YOUR NEXT CHAPTER STARTS HERE
          </div>

          <h2
            class="display mt-5 text-5xl leading-[.95] md:text-7xl"
          >
            WHAT WILL YOU
            <span class="text-primary">BUILD NEXT?</span>
          </h2>

          <p
            class="mx-auto mt-7 max-w-2xl text-sm leading-8 text-forest/65 md:text-base"
          >
            Two days of powerful conversations, practical strategies, and
            connections designed to help you move from inspiration to ownership.
          </p>

          <p
            class="mx-auto mt-4 max-w-2xl text-sm leading-8 text-forest/65 md:text-base"
          >
            DOMINION 2026 is more than a conference. It's an opportunity to
            gain the knowledge, tools, and relationships that can help you
            take your next step toward financial independence and lasting impact.
          </p>
        </div>

        <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="pillar in buildPillars"
            :key="pillar.number"
            class="group reveal overflow-hidden border border-forest/10 bg-white/70 transition duration-500 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_20px_55px_rgba(25,50,30,0.08)]"
          >
            <div class="relative h-48 overflow-hidden bg-[#DED9CC] md:h-56">
              <img
                :src="pillar.image"
                :alt="pillar.imageAlt"
                loading="lazy"
                class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                @error="($event.target as HTMLImageElement).style.display = 'none'"
              />

              <div
                class="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"
              />

              <span
                class="absolute left-5 top-5 flex h-10 w-10 items-center justify-center border border-white/35 bg-black/25 text-white backdrop-blur-sm"
              >
                <component :is="pillar.icon" :size="19" />
              </span>

              <span
                class="absolute bottom-4 right-5 font-mono text-xs text-white/75"
              >
                {{ pillar.number }}
              </span>
            </div>

            <div class="p-6 md:p-7">
              <h3
                class="max-w-sm text-sm font-extrabold leading-6 tracking-[.07em] text-forest"
              >
                {{ pillar.title }}
              </h3>

              <p class="mt-4 text-sm leading-7 text-forest/60">
                {{ pillar.description }}
              </p>
            </div>
          </article>
        </div>

        <div class="reveal mt-12 text-center">
          <p
            class="mx-auto max-w-2xl font-serif text-2xl leading-relaxed text-forest md:text-3xl"
          >
            You don't need to have everything figured out.
            <span class="italic text-primary">
              You need to be willing to take your next step.
            </span>
          </p>

          <NuxtLink
            to="/tickets"
            class="button-primary mt-7"
          >
            SECURE YOUR SEAT AT DOMINION
            <ArrowUpRight :size="16" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- VIP EXPERIENCE -->
    <section
      id="vip-experience"
      class="relative overflow-hidden bg-ink text-white"
    >
      <div
        aria-hidden="true"
        class="pointer-events-none absolute -right-36 top-16 h-[30rem] w-[30rem] rounded-full border border-gold/15"
      />

      <div
        aria-hidden="true"
        class="pointer-events-none absolute -right-16 top-36 h-80 w-80 rounded-full border border-gold/10"
      />

      <div
        class="section-pad relative grid gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-center"
      >
        <div class="reveal">
          <div class="eyebrow !text-gold-light">
            <Crown :size="14" class="mr-2 inline-block" />
            THE DOMINION VIP EXPERIENCE
          </div>

          <h2
            class="display mt-5 text-5xl leading-[.95] md:text-7xl"
          >
            DON'T JUST ATTEND DOMINION.
            <span class="text-gold-light">
              EXPERIENCE IT AT THE VIP LEVEL.
            </span>
          </h2>

          <p class="mt-6 text-sm leading-8 text-white/65 md:text-base">
            For just ${{ (vipTicket?.price ?? 397) - (regularTicket?.price ?? 250) }} more, unlock an exclusive Friday afternoon
            designed for deeper learning, meaningful connections, and
            conversations that could change how you approach wealth.
          </p>

          <div
            class="mt-8 border border-gold/25 bg-white/[.035] p-6 md:p-8"
          >
            <div class="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p class="text-xs font-bold uppercase tracking-[.18em] text-gold-light">
                  VIP EXPERIENCE
                </p>

                <p class="mt-2 font-serif text-5xl">
                  ${{ vipTicket?.price ?? 397 }}
                </p>
              </div>

              <div class="text-sm leading-6 text-white/55">
                <p>Friday, December 11</p>
                <p>12 PM–4 PM</p>
              </div>
            </div>

            <div class="my-6 h-px bg-white/10" />

            <p class="text-xs font-bold uppercase tracking-[.14em] text-white/75">
              PLUS EVERYTHING INCLUDED IN REGULAR ADMISSION
            </p>

            <ul class="mt-4 space-y-3">
              <li
                v-for="item in [
                  'Friday Opening Night',
                  'Saturday LIV FIT',
                  'Main conference sessions and panels',
                  'Conference networking opportunities',
                  'Saturday Fundraising Gala',
                ]"
                :key="item"
                class="flex items-start gap-3 text-sm leading-6 text-white/65"
              >
                <Check
                  :size="16"
                  class="mt-1 shrink-0 text-gold-light"
                />
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="mt-7 flex flex-col gap-3 sm:flex-row">
            <NuxtLink
              to="/tickets"
              class="button-gold justify-center"
            >
              YES, I WANT THE VIP EXPERIENCE
              <ArrowUpRight :size="16" />
            </NuxtLink>

            <NuxtLink
              to="/experience"
              class="button-dark-outline justify-center"
            >
              EXPLORE THE WEEKEND
            </NuxtLink>
          </div>

          <p class="mt-4 text-xs text-white/40">
            Regular Admission: ${{ regularTicket?.price ?? 250 }} · VIP Experience: ${{ vipTicket?.price ?? 397 }} · Upgrade: ${{ (vipTicket?.price ?? 397) - (regularTicket?.price ?? 250) }}
          </p>
        </div>

        <div class="reveal">
          <div class="mb-5">
            <p class="eyebrow !text-gold-light">
              EXCLUSIVE FRIDAY PROGRAM
            </p>

            <h3 class="display mt-3 text-3xl md:text-4xl">
              Your afternoon. Five opportunities to grow.
            </h3>
          </div>

          <div class="space-y-3">
            <article
              v-for="(benefit, index) in vipBenefits"
              :key="benefit.title"
              class="group flex gap-4 border border-white/10 bg-white/[.035] p-5 transition hover:border-gold/35 hover:bg-white/[.06] md:p-6"
            >
              <span
                class="flex h-10 w-10 shrink-0 items-center justify-center border border-gold/30 font-mono text-xs text-gold-light"
              >
                {{ String(index + 1).padStart(2, '0') }}
              </span>

              <div>
                <h4 class="font-serif text-xl text-white md:text-2xl">
                  {{ benefit.title }}
                </h4>

                <p class="mt-2 text-sm leading-7 text-white/55">
                  {{ benefit.description }}
                </p>
              </div>
            </article>
          </div>

          <p class="mt-5 text-xs leading-6 text-white/40">
            Individual VIP session times will be announced.
          </p>
        </div>
      </div>
    </section>

    <!-- PREVIOUS CONFERENCE HIGHLIGHTS -->
    <section
      id="conference-highlights"
      class="overflow-hidden bg-black text-white"
    >
      <div class="section-pad">
        <div
          class="reveal grid gap-8 md:grid-cols-[1fr_.8fr] md:items-end"
        >
          <div>
            <div class="eyebrow !text-gold-light">
              REIGN IN WEALTH CONFERENCE
            </div>

            <h2 class="display mt-5 text-5xl md:text-7xl">
              THE EXPERIENCE
              <span class="text-gold-light">SPEAKS FOR ITSELF.</span>
            </h2>
          </div>

          <div>
            <p class="font-serif text-2xl leading-relaxed text-white/85 md:text-3xl">
              Last year, we gathered. This year, we're building with DOMINION.
            </p>

            <p class="mt-5 text-sm leading-7 text-white/55">
              Experience the moments, conversations, connections, and
              atmosphere that made our previous REIGN IN WEALTH Conference
              memorable.
            </p>
          </div>
        </div>

        <div class="reveal mt-10">
          <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
            <span class="eyebrow !text-gold-light">
              PREVIOUS CONFERENCE HIGHLIGHT
            </span>

            <span class="text-[10px] uppercase tracking-[.16em] text-white/40">
              Footage from a previous event
            </span>
          </div>

          <div
            class="relative overflow-hidden border border-white/10 bg-[#181914]"
          >
            <video
              controls
              playsinline
              preload="metadata"
              poster="/images/events/exp10.jpg"
              class="aspect-video w-full object-cover"
              aria-label="Highlight video from a previous Reign in Wealth Conference"
            >
              <source
                src="/cinematic/video2.mov"
                type="video/mov"
              />

              Your browser does not support HTML video.
              Please use another browser to watch the conference highlight.
            </video>

            <div class="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-4">
              <p class="text-xs text-white/50">
                Actual moments from a previous REIGN IN WEALTH Conference.
              </p>

              <span class="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-gold-light">
                <Play :size="13" />
                Watch the moments
              </span>
            </div>
          </div>
        </div>

        <div class="reveal mt-12 grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <div class="eyebrow !text-gold-light">
              WATCH THE MOMENTS. FEEL THE ENERGY.
            </div>

            <h3 class="display mt-4 text-4xl md:text-5xl">
              Imagine yourself in the room.
            </h3>

            <p class="mt-5 text-sm leading-7 text-white/55">
              From powerful teaching and real estate conversations to
              faith-filled moments and meaningful connections, this is more
              than an event. It's a community committed to growth, ownership,
              and impact.
            </p>

            <NuxtLink
              to="/tickets"
              class="button-gold mt-7"
            >
              JOIN US FOR DOMINION 2026
              <ArrowUpRight :size="16" />
            </NuxtLink>
          </div>

          <div class="grid grid-cols-2 gap-3 md:grid-cols-3">
            <div
              v-for="(image, index) in previousConferenceImages"
              :key="image"
              class="group relative aspect-[4/5] overflow-hidden bg-white/[.04]"
              :class="index === 0 ? 'md:col-span-2 md:row-span-1' : ''"
            >
              <img
                :src="image"
                :alt="`Previous Reign in Wealth Conference moment ${index + 1}`"
                loading="lazy"
                class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                @error="($event.target as HTMLImageElement).style.display = 'none'"
              />

              <div class="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
            </div>
          </div>
        </div>

        <div class="mt-16 border-t border-white/10 pt-12">
          <div class="reveal text-center">
            <div class="eyebrow justify-center !text-gold-light">
              <Quote :size="14" class="mr-2 inline-block" />
              REAL PEOPLE. REAL EXPERIENCES.
            </div>

            <h3 class="display mt-4 text-4xl md:text-6xl">
              Their experience. Their words.
            </h3>

            <p class="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/55">
              Hear from previous attendees about their experiences, the
              insights they gained, and the connections they made at
              REIGN IN WEALTH.
            </p>
          </div>

          <div class="mt-9 grid gap-4 md:grid-cols-3">
            <article
              v-for="testimonial in testimonials"
              :key="testimonial.name"
              class="reveal flex flex-col border border-white/10 bg-white/[.035] p-6 md:p-7"
            >
              <Quote :size="23" class="text-gold-light" />

              <blockquote class="mt-5 flex-1 font-serif text-xl leading-relaxed text-white/85">
                “{{ testimonial.quote }}”
              </blockquote>

              <div class="mt-6 border-t border-white/10 pt-4">
                <p class="text-sm font-bold text-white">
                  {{ testimonial.name }}
                </p>

                <p class="mt-1 text-[10px] uppercase tracking-[.16em] text-white/40">
                  {{ testimonial.role || 'Previous Attendee' }}
                </p>
              </div>
            </article>
          </div>

          <div class="mt-8 text-center">
            <NuxtLink
              to="/stories"
              class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-gold-light transition hover:text-white"
            >
              Explore more stories
              <ArrowUpRight :size="15" />
            </NuxtLink>
          </div>

          <div class="mt-10 text-center">
            <NuxtLink
              to="/tickets"
              class="button-primary"
            >
              GET YOUR TICKET
              <ArrowUpRight :size="16" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- THE DOMINION MESSAGE -->
    <section
      id="enter"
      class="relative overflow-hidden bg-ink text-white"
    >
      <div
        class="absolute inset-0 bg-cover bg-center opacity-35"
        style="background-image: url('https://images.pexels.com/photos/34661673/pexels-photo-34661673.jpeg?_gl=1*10petqq*_ga*MTcwODY2MDI4OS4xNzg1ODY3OTYz*_ga_8JE65Q40S6*czE3OTE1NTAyNzEkbzQkZzEkdDE3OTE1NTA2NzgkajU2JGwwJGgw')"
      />

      <div class="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/65" />
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

        <div class="reveal max-w-2xl text-sm leading-8 text-white/60 md:text-base">
          <p>
            Faith can give you the vision. But eventually, you have to put
            something behind it.
          </p>

          <p class="mt-5">
            DOMINION is for people who are ready to take that next step —
            to learn, make better decisions, build real assets, grow businesses,
            create opportunities, and take ownership of the life they're building.
          </p>

          <p class="mt-5 font-semibold text-white">
            Not for show. Not for appearances. For something that lasts.
          </p>

          <NuxtLink
            to="/experience"
            class="mt-8 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.16em] text-gold-light transition hover:text-white"
          >
            Explore the full conference experience
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
            Move from intention to action.
          </h2>

          <p class="mt-6 max-w-2xl text-sm leading-7 text-white/50 md:text-base">
            The weekend is built around four movements — each one asking you
            to look at where you are, what you're building, and what comes next.
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

    <!-- EXPLORE THE WEBSITE -->
    <section class="bg-sage/25 text-forest">
      <div
        class="section-pad grid gap-12 md:grid-cols-[1fr_.9fr] md:items-end"
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
              Explore the schedule, hotel information, four movements, and
              everything happening across the weekend.
            </p>

            <span class="mt-7 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.18em] text-primary">
              Explore
              <ArrowUpRight :size="13" />
            </span>
          </NuxtLink>

          <NuxtLink
            to="/people"
            class="group border border-forest/10 bg-cream-2 p-6 transition duration-500 hover:-translate-y-1 hover:border-gold/60"
          >
            <Users :size="18" class="text-gold-dark" />

            <h3 class="mt-10 font-serif text-2xl text-forest">
              The People
            </h3>

            <p class="mt-2 text-sm leading-6 text-forest/50">
              Meet the founder, speakers, and people behind the conference.
            </p>

            <span class="mt-7 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.18em] text-primary">
              Meet the people
              <ArrowUpRight :size="13" />
            </span>
          </NuxtLink>

          <NuxtLink
            to="/tickets"
            class="group border border-forest/10 bg-cream-2 p-6 transition duration-500 hover:-translate-y-1 hover:border-gold/60"
          >
            <CalendarDays :size="18" class="text-gold-dark" />

            <h3 class="mt-10 font-serif text-2xl text-forest">
              Your Ticket
            </h3>

            <p class="mt-2 text-sm leading-6 text-forest/50">
              Compare Regular, VIP, and Gala-only admission before choosing
              your experience.
            </p>

            <span class="mt-7 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.18em] text-primary">
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
              Find answers to practical questions before making your plans.
            </p>

            <span class="mt-7 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.18em] text-primary">
              Read the FAQ
              <ArrowUpRight :size="13" />
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- SPONSORSHIP AND DONATIONS -->
    <SupportSection />

    <!-- FOUNDER INTRODUCTION -->
    <section class="overflow-hidden bg-cream-2 text-forest">
      <div class="section-pad">
        <div class="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-center">
          <div class="reveal relative mx-auto w-full max-w-md">
            <div class="absolute -bottom-4 -right-4 h-full w-full border border-gold/40" />

            <div class="relative aspect-[4/5] overflow-hidden bg-[#DED9CC]">
              <img
                :src="site.founder.image"
                :alt="site.founder.name"
                loading="lazy"
                class="h-full w-full object-cover"
              />
            </div>
          </div>

          <div class="reveal">
            <div class="eyebrow">
              THE VISION BEHIND DOMINION
            </div>

            <h2 class="display mt-5 text-5xl md:text-7xl">
              Meet {{ site.founder.name }}.
            </h2>

            <p class="mt-3 text-xs font-bold uppercase tracking-[.15em] text-primary">
              {{ site.founder.role }}
            </p>

            <p class="mt-6 text-sm leading-8 text-forest/65 md:text-base">
              {{ site.founder.bio }}
            </p>

            <blockquote class="mt-7 border-l-2 border-primary pl-5 font-serif text-2xl italic text-forest">
              “{{ site.founder.quote }}”
            </blockquote>

            <NuxtLink
              to="/people"
              class="button-primary mt-8"
            >
              MEET THE PEOPLE BEHIND DOMINION
              <ArrowUpRight :size="16" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- FINAL TICKET CTA -->
    <section class="bg-ink text-white">
      <div
        class="section-pad flex flex-col gap-8 border-t border-white/10 md:flex-row md:items-end md:justify-between"
      >
        <div class="reveal max-w-3xl">
          <div class="eyebrow !text-gold-light">
            DECEMBER 11–12 · YONKERS, NEW YORK
          </div>

          <h2 class="display mt-4 text-5xl md:text-7xl">
            Your next chapter starts with a decision.
          </h2>

          <p class="mt-5 max-w-xl text-sm leading-7 text-white/55 md:text-base">
            Two days of faith, strategy, ownership, relationships, and
            conversations you can actually take home with you.
          </p>

          <p class="mt-5 text-sm font-semibold text-gold-light">
            Regular ${{ regularTicket?.price ?? 250 }} · VIP ${{ vipTicket?.price ?? 397 }} · Gala Only ${{ galaTicket?.price ?? 197 }}
          </p>

          <p class="mt-2 text-xs text-white/40">
            Regular and VIP conference tickets include the Saturday Fundraising Gala.
          </p>
        </div>

        <NuxtLink
          to="/tickets"
          class="button-primary shrink-0"
        >
          SECURE YOUR SEAT
          <ArrowUpRight :size="16" />
        </NuxtLink>
      </div>
    </section>
  </main>
</template>