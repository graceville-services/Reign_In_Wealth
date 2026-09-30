<script setup lang="ts">
import { Compass, Building2, ChartNoAxesCombined, Crown, ArrowUpRight } from 'lucide-vue-next'
const icons: Record<string, any> = { Compass, Building2, ChartNoAxesCombined, Crown }
defineProps<{ number: string; title: string; body: string; icon: string }>()
</script>
<template>
  <article class="group reveal border border-white/10 bg-white/[0.025] p-6 transition duration-500 hover:-translate-y-2 hover:border-gold/40 hover:bg-white/[0.045] md:p-8">
    <div class="flex items-start justify-between"><span class="font-mono text-[10px] text-gold">{{ number }}</span><component :is="icons[icon]" :size="19" class="text-white/35 transition group-hover:text-gold" /></div>
    <h3 class="display mt-16 text-4xl">{{ title }}</h3><p class="mt-4 text-sm leading-7 text-white/45">{{ body }}</p>
    <div class="mt-10 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.18em] text-white/30">Explore <ArrowUpRight :size="13" /></div>
  </article>
</template>
