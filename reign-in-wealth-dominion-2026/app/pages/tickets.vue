<script setup lang="ts">
import { ArrowUpRight, Check, ShieldCheck } from 'lucide-vue-next'
import { site, type Ticket } from '~/data/site'
import CheckoutDrawer from '~/components/CheckoutDrawer.vue'
const { revealAll } = useReveal()
const selectedTicket = ref<Ticket | null>(null)
useHead({ title: 'Tickets — DOMINION 2026' })
onMounted(() => revealAll())
</script>
<template>
  <div class="pt-[76px]"><section class="bg-forest text-cream"><div class="section-pad grid gap-10 md:grid-cols-[1fr_.65fr] md:items-end"><div class="reveal"><div class="eyebrow !text-primary-light">ADMISSION</div><h1 class="display mt-5 text-6xl md:text-8xl">Choose your way into DOMINION.</h1></div><div class="reveal"><p class="text-sm leading-8 text-cream/60">Separate ticket choices, no endless scrolling. Select an experience and continue to secure payment.</p></div></div></section>
    <section><div class="section-pad"><div class="grid gap-4 lg:grid-cols-3"><article v-for="ticket in site.tickets" :key="ticket.id" class="reveal relative flex flex-col border p-7 transition duration-500 hover:-translate-y-2" :class="ticket.featured ? 'border-primary bg-primary text-white soft-shadow' : 'border-forest/10 bg-white/50'"><div v-if="ticket.featured" class="absolute right-5 top-5 rounded-full bg-white/20 px-3 py-1 font-mono text-[9px] uppercase tracking-[.15em]">Featured</div><div class="font-mono text-[9px] font-bold uppercase tracking-[.2em]" :class="ticket.featured ? 'text-white/70' : 'text-primary'">{{ ticket.eyebrow }}</div><h2 class="mt-4 font-serif text-3xl">{{ ticket.name }}</h2><div class="mt-7 font-serif text-5xl">${{ ticket.price }}</div><p class="mt-4 min-h-[72px] text-sm leading-6" :class="ticket.featured ? 'text-white/70' : 'text-forest/50'">{{ ticket.description }}</p><div class="my-7 h-px" :class="ticket.featured ? 'bg-white/20' : 'bg-forest/10'"/><ul class="space-y-3 text-sm"><li v-for="feature in ticket.features" :key="feature" class="flex gap-3"><Check :size="15" class="mt-0.5 shrink-0" :class="ticket.featured ? 'text-white' : 'text-primary'"/><span :class="ticket.featured ? 'text-white/80' : 'text-forest/65'">{{ feature }}</span></li></ul><button class="mt-8 flex w-full items-center justify-center gap-2 border px-4 py-4 text-xs font-extrabold uppercase tracking-[.16em] transition" :class="ticket.featured ? 'border-white bg-white text-forest hover:bg-transparent hover:text-white' : 'border-forest/15 hover:border-primary hover:text-primary'" @click="selectedTicket = ticket">Buy ticket <ArrowUpRight :size="15"/></button></article></div><div class="mt-8 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[.16em] text-forest/35"><ShieldCheck :size="14" class="text-primary"/> Secure checkout via Stripe</div></div></section>
    <CheckoutDrawer :open="!!selectedTicket" :ticket="selectedTicket" @close="selectedTicket = null"/>
  </div>
</template>
