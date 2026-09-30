<script setup lang="ts">
import { ArrowUpRight, Quote } from 'lucide-vue-next'
import { site } from '~/data/site'
import CinematicMedia from '~/components/CinematicMedia.vue'
const { revealAll } = useReveal()
useHead({ title: 'Stories — DOMINION 2026' })
onMounted(() => revealAll())
</script>
<template>
  <div class="pt-[76px]"><section class="relative overflow-hidden bg-forest text-cream"><div class="absolute inset-0 opacity-30"><CinematicMedia :video="site.hero.video" :poster="site.hero.poster"/></div><div class="relative z-10 section-pad min-h-[560px] flex items-end"><div class="reveal max-w-4xl"><div class="eyebrow !text-primary-light">THE STORIES</div><h1 class="display mt-5 text-6xl md:text-8xl">Remember the room.</h1><p class="mt-6 max-w-2xl text-sm leading-8 text-cream/60">A cinematic space for past-event imagery, verified testimonials, recap films and the stories of people who moved from intention to action.</p></div></div></section>
    <section><div class="section-pad"><div class="grid gap-4 md:grid-cols-3"><article v-for="(quote, i) in site.testimonials" :key="i" class="reveal border border-forest/10 bg-white/40 p-7"><Quote :size="20" class="text-primary"/><p class="mt-8 font-serif text-2xl leading-tight">“{{ quote.quote }}”</p><div class="mt-10 border-t border-forest/10 pt-4"><div class="text-sm font-bold">{{ quote.name }}</div><div class="mt-1 text-xs text-forest/45">{{ quote.role }}</div></div></article></div></div></section>
    <section class="bg-sage/35"><div class="section-pad"><div class="reveal"><div class="eyebrow">PAST MOMENTS</div><h2 class="display mt-4 text-5xl md:text-7xl">The visual archive.</h2></div><div class="mt-12 grid auto-rows-[220px] grid-cols-2 gap-3 md:auto-rows-[280px] md:grid-cols-3"><div v-for="(image,i) in site.gallery" :key="image" class="reveal overflow-hidden border border-forest/10 bg-forest/5" :class="i === 0 ? 'col-span-2 row-span-2' : ''"><img :src="image" alt="DOMINION event placeholder" loading="lazy" class="h-full w-full object-cover transition duration-700 hover:scale-105"></div></div></div></section>
    <section class="bg-cream-2"><div class="section-pad text-center"><div class="reveal mx-auto max-w-3xl"><div class="eyebrow">NEXT CHAPTER</div><h2 class="display mt-4 text-5xl md:text-7xl">Your story can start here.</h2><NuxtLink to="/tickets" class="button-primary mt-8">Get your ticket <ArrowUpRight :size="15"/></NuxtLink></div></div></section>
  </div>
</template>
