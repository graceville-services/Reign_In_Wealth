<script setup lang="ts">
import { Menu, X, ArrowUpRight } from 'lucide-vue-next'
import { site } from '~/data/site'
const open = ref(false)
const scrolled = ref(false)
const route = useRoute()
const links = [
  ['Experience', '/experience'], ['People', '/people'], ['Schedule', '/experience#schedule'], ['Stories', '/stories'],['Sponsors','/support'], ['Tickets', '/tickets'], ['Stay', '/experience#stay'], ['FAQ', '/faq']
]
const go = (href: string) => { open.value = false; navigateTo(href) }
onMounted(() => {
  const onScroll = () => { scrolled.value = window.scrollY > 24 }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
})
const active = (href: string) => route.path === href || (href.includes('#') && route.path === href.split('#')[0])
</script>
<template>
  <div class="min-h-screen bg-cream text-forest selection:bg-primary selection:text-white">
    <header class="fixed inset-x-0 top-0 z-50 transition-all duration-500" :class="scrolled ? 'border-b border-forest/10 bg-cream/90 shadow-[0_10px_40px_rgba(31,61,35,.08)] backdrop-blur-xl' : 'bg-transparent'">
      <div class="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-5 md:px-8">
        <button class="group flex items-center gap-3" @click="go('/')">
          <span class="grid h-10 w-10 place-items-center border border-primary/60 bg-white/30 text-primary"><span class="font-serif text-lg">R</span></span>
          <span class="hidden text-left sm:block"><span class="block text-[9px] font-mono tracking-[.24em] text-forest/45">REIGN IN WEALTH</span><span class="text-xs font-extrabold tracking-[.18em]">DOMINION '26</span></span>
        </button>
        <nav class="hidden items-center gap-5 lg:flex">
          <NuxtLink v-for="[label, href] in links" :key="href" :to="href" class="nav-link" :class="active(href) ? 'text-primary' : ''">{{ label }}</NuxtLink>
        </nav>
        <div class="flex items-center gap-2">
          <NuxtLink to="/tickets" class="button-primary !hidden sm:!inline-flex">Get Tickets <ArrowUpRight :size="16" /></NuxtLink>
          <button class="grid h-11 w-11 place-items-center border border-forest/15 bg-white/25 lg:hidden" :aria-label="open ? 'Close menu' : 'Open menu'" @click="open = !open"><X v-if="open" :size="19" /><Menu v-else :size="19" /></button>
        </div>
      </div>
      <Transition name="menu"><div v-if="open" class="border-t border-forest/10 bg-cream/98 px-5 pb-6 pt-3 shadow-xl lg:hidden">
        <NuxtLink v-for="[label, href] in links" :key="href" :to="href" class="block border-b border-forest/10 py-4 text-left text-sm font-bold" @click="open = false">{{ label }}</NuxtLink>
        <NuxtLink to="/tickets" class="button-primary mt-5 w-full" @click="open = false">Get Tickets <ArrowUpRight :size="16" /></NuxtLink>
      </div></Transition>
    </header>
    <main><slot /></main>
    <footer class="border-t border-forest/10 bg-forest px-5 py-12 text-cream md:px-8">
      <div class="mx-auto flex max-w-[1500px] flex-col justify-between gap-10 md:flex-row">
        <div><div class="font-serif text-3xl">Reign in Wealth</div><p class="mt-2 max-w-md text-sm leading-7 text-cream/60">Faith, ownership, strategy and impact. DOMINION 2026.</p></div>
        <div class="grid grid-cols-2 gap-x-10 gap-y-3 text-xs text-cream/55 sm:grid-cols-3"><NuxtLink v-for="[label, href] in links" :key="href" :to="href" class="transition hover:text-primary-light">{{ label }}</NuxtLink></div>
      </div>
      <div class="mx-auto mt-12 flex max-w-[1500px] flex-col gap-3 border-t border-cream/10 pt-5 text-[10px] uppercase tracking-[.18em] text-cream/30 sm:flex-row sm:justify-between"><span>© 2026 Reign in Wealth</span><span>Occupy · Build · Multiply · Reign</span></div>
    </footer>
  </div>
</template>
