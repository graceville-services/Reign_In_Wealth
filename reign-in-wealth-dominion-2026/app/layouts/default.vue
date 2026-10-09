<script setup lang="ts">
import { Menu, X, ArrowUpRight, Hotel } from 'lucide-vue-next'
import { site } from '~/data/site'

const open = ref(false)
const scrolled = ref(false)
const route = useRoute()

const links = [
  ['Experience', '/experience'],
  ['People', '/people'],
  ['Stories', '/stories'],
  ['Sponsor', '/support'],
  ['FAQ', '/faq'],
]

const go = (href: string) => {
  open.value = false
  navigateTo(href)
}

onMounted(() => {
  const onScroll = () => {
    scrolled.value = window.scrollY > 24
  }

  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
  })
})

const active = (href: string) => {
  if (href === '/') return route.path === '/'
  return route.path === href || route.path.startsWith(`${href}/`)
}
</script>

<template>
  <div class="min-h-screen bg-black text-cream">
    <!-- HEADER -->
    <header
      class="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      :class="
        scrolled
          ? 'border-b border-white/10 bg-black/90 shadow-[0_10px_50px_rgba(0,0,0,.35)] backdrop-blur-xl'
          : 'bg-transparent'
      "
    >
      <div
        class="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-5 md:px-8"
      >
        <!-- LOGO -->
        <button
          class="group flex h-full items-center"
          aria-label="Go to homepage"
          @click="go('/')"
        >
          <img
            src="/images/logo.png"
            alt="Reign in Wealth"
            class="block h-auto w-[125px] object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:w-[140px] md:w-[155px]"
          />
        </button>

        <!-- DESKTOP NAV -->
        <nav class="hidden items-center gap-7 lg:flex">
          <NuxtLink
            v-for="[label, href] in links"
            :key="href"
            :to="href"
            class="nav-link-dark"
            :class="active(href) ? '!text-gold' : ''"
          >
            {{ label }}
          </NuxtLink>

          <!-- HOTEL BOOKING -->
          <a
            :href="site.hotel.bookingUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="nav-link-dark inline-flex items-center gap-1.5 whitespace-nowrap transition hover:!text-gold"
          >
            Book a Hotel
            <Hotel :size="15" />
            <ArrowUpRight :size="14" />
          </a>
        </nav>

        <!-- ACTIONS -->
        <div class="flex items-center gap-2">
          <NuxtLink
            to="/tickets"
            class="button-gold !hidden sm:!inline-flex"
          >
            Tickets
            <ArrowUpRight :size="16" />
          </NuxtLink>

          <button
            class="grid h-11 w-11 place-items-center border border-white/15 bg-white/[.04] text-cream backdrop-blur-sm transition hover:border-gold/50 hover:text-gold lg:hidden"
            :aria-label="open ? 'Close menu' : 'Open menu'"
            @click="open = !open"
          >
            <X v-if="open" :size="19" />
            <Menu v-else :size="19" />
          </button>
        </div>
      </div>

      <!-- MOBILE MENU -->
      <Transition name="menu">
        <div
          v-if="open"
          class="border-t border-white/10 bg-black/98 px-5 pb-7 pt-3 shadow-2xl backdrop-blur-xl lg:hidden"
        >
          <NuxtLink
            v-for="[label, href] in links"
            :key="href"
            :to="href"
            class="block border-b border-white/10 py-4 text-left text-sm font-semibold"
            :class="active(href) ? 'text-gold' : 'text-cream/80'"
            @click="open = false"
          >
            {{ label }}
          </NuxtLink>

          <!-- MOBILE HOTEL BOOKING -->
          <a
            :href="site.hotel.bookingUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-between border-b border-white/10 py-4 text-sm font-semibold text-cream/80 transition hover:text-gold"
            @click="open = false"
          >
            <span class="inline-flex items-center gap-2">
              <Hotel :size="17" />
              Book a Hotel
            </span>

            <ArrowUpRight :size="16" />
          </a>

          <NuxtLink
            to="/tickets"
            class="button-gold mt-5 w-full"
            @click="open = false"
          >
            Get Your Ticket
            <ArrowUpRight :size="16" />
          </NuxtLink>
        </div>
      </Transition>
    </header>

    <main>
      <slot />
    </main>

    <!-- FOOTER -->
    <footer class="border-t border-white/10 bg-black px-5 py-14 text-cream md:px-8">
      <div
        class="mx-auto grid max-w-[1500px] gap-12 md:grid-cols-[1.2fr_.8fr_.8fr]"
      >
        <!-- BRAND -->
        <div>
          <NuxtLink
            to="/"
            class="group inline-flex items-center"
          >
            <img
              src="/images/logo.png"
              alt="Reign in Wealth"
              class="block h-auto w-[145px] object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </NuxtLink>

          <p class="mt-5 max-w-md text-sm leading-7 text-cream/50">
            A weekend for people ready to turn vision into ownership,
            strategy into action, and purpose into something that lasts.
          </p>
        </div>

        <!-- EXPLORE -->
        <div>
          <div class="eyebrow !text-gold">EXPLORE</div>

          <div class="mt-5 grid gap-3 text-sm text-cream/55">
            <NuxtLink
              v-for="[label, href] in links"
              :key="href"
              :to="href"
              class="transition hover:text-gold"
            >
              {{ label }}
            </NuxtLink>

            <!-- FOOTER HOTEL BOOKING -->
            <a
              :href="site.hotel.bookingUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 transition hover:text-gold"
            >
              Book a Hotel
              <ArrowUpRight :size="14" />
            </a>
          </div>
        </div>

        <!-- CONFERENCE -->
        <div>
          <div class="eyebrow !text-gold">DOMINION 2026</div>

          <div class="mt-5 space-y-3 text-sm leading-6 text-cream/50">
            <p>December 11–12, 2026</p>
            <p>Yonkers, New York</p>
            <p>Faith · Ownership · Strategy · Impact</p>
          </div>

          <NuxtLink
            to="/tickets"
            class="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-gold transition hover:text-gold-light"
          >
            Enter DOMINION
            <ArrowUpRight :size="14" />
          </NuxtLink>
        </div>
      </div>

      <div
        class="mx-auto mt-14 flex max-w-[1500px] flex-col gap-3 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[.18em] text-cream/25 sm:flex-row sm:justify-between"
      >
        <span>© 2026 Reign in Wealth</span>
        <span>Occupy · Build · Multiply · Reign</span>
      </div>
    </footer>
  </div>
</template>