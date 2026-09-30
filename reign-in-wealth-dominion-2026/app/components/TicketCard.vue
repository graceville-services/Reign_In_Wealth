<script setup lang="ts">
import { Check, ArrowUpRight, Star } from 'lucide-vue-next'
import type { Ticket } from '~/data/site'
const props = defineProps<{ ticket: Ticket }>()
const emit = defineEmits<{ buy: [ticket: Ticket] }>()
</script>
<template>
  <article class="group relative flex flex-col overflow-hidden border p-6 transition duration-500 hover:-translate-y-2 md:p-8" :class="ticket.featured ? 'border-gold/70 bg-gold text-ink ticket-shadow' : 'border-white/10 bg-white/[0.025] hover:border-white/25'">
    <div v-if="ticket.featured" class="absolute right-4 top-4 flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-[.15em]"><Star :size="12" fill="currentColor" /> Featured</div>
    <div class="font-mono text-[9px] font-bold uppercase tracking-[.2em]" :class="ticket.featured ? 'text-ink/55' : 'text-gold'">{{ ticket.eyebrow }}</div>
    <h3 class="mt-4 font-serif text-3xl">{{ ticket.name }}</h3>
    <div class="mt-7 flex items-end gap-1"><span class="font-serif text-5xl">${{ ticket.price }}</span><span class="pb-2 text-xs" :class="ticket.featured ? 'text-ink/50' : 'text-white/35'">USD</span></div>
    <p class="mt-4 min-h-[72px] text-sm leading-6" :class="ticket.featured ? 'text-ink/65' : 'text-white/50'">{{ ticket.description }}</p>
    <div class="my-7 h-px" :class="ticket.featured ? 'bg-ink/15' : 'bg-white/10'" />
    <ul class="space-y-3 text-sm"><li v-for="feature in ticket.features" :key="feature" class="flex gap-3"><Check :size="15" class="mt-0.5 shrink-0" :class="ticket.featured ? 'text-ink' : 'text-gold'" /><span :class="ticket.featured ? 'text-ink/75' : 'text-white/65'">{{ feature }}</span></li></ul>
    <button class="mt-8 flex w-full items-center justify-center gap-2 border px-4 py-4 text-xs font-extrabold uppercase tracking-[.16em] transition" :class="ticket.featured ? 'border-ink bg-ink text-white hover:bg-transparent hover:text-ink' : 'border-white/15 hover:border-gold hover:text-gold'" @click="emit('buy', props.ticket)">Buy Ticket <ArrowUpRight :size="15" /></button>
  </article>
</template>
