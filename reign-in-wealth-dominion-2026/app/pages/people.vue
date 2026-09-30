<script setup lang="ts">
import { ArrowUpRight, Instagram } from 'lucide-vue-next'
import { site } from '~/data/site'
const { revealAll } = useReveal()
useHead({ title: 'People & Stories — DOMINION 2026' })
onMounted(() => revealAll())
</script>
<template>
  <div class="pt-[76px]"><section class="bg-forest text-cream"><div class="section-pad"><div class="reveal max-w-4xl"><div class="eyebrow !text-primary-light">THE PEOPLE</div><h1 class="display mt-5 text-6xl md:text-8xl">People make the room.</h1><p class="mt-7 max-w-2xl text-sm leading-8 text-cream/60 md:text-base">Meet the founder, the voices shaping the weekend, and the community stories that belong here.</p></div></div></section>
    <section><div class="section-pad grid gap-12 md:grid-cols-[.8fr_1.2fr] md:items-center"><div class="reveal flex min-h-[420px] items-end bg-gradient-to-br from-primary/20 to-forest/10 p-7"><div><div class="eyebrow">FOUNDER & VISIONARY</div><div class="font-serif text-4xl">{{ site.founder.name }}</div><p class="mt-2 text-xs text-forest/50">{{ site.founder.role }}</p></div></div><div class="reveal"><p class="font-serif text-3xl italic leading-tight text-primary">“{{ site.founder.quote }}”</p><p class="mt-7 text-sm leading-8 text-forest/60">{{ site.founder.bio }}</p><a :href="site.socials.instagram" target="_blank" rel="noopener" class="mt-7 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.16em] text-primary">Instagram <Instagram :size="15"/></a></div></div></section>
    <section class="bg-sage/35"><div class="section-pad"><div class="reveal"><div class="eyebrow">SPEAKERS</div><h2 class="display mt-4 text-5xl md:text-7xl">Announcements are coming.</h2></div><div class="mt-12 grid gap-4 md:grid-cols-3"><article v-for="speaker in site.speakers" :key="speaker.image" class="reveal overflow-hidden border border-forest/10 bg-cream-2"><img :src="speaker.image" :alt="speaker.name" class="h-72 w-full object-cover" loading="lazy"><div class="p-6"><div class="font-mono text-[9px] uppercase tracking-[.18em] text-primary">{{ speaker.expertise }}</div><h3 class="mt-3 font-serif text-2xl">{{ speaker.name }}</h3><p class="mt-1 text-xs text-forest/45">{{ speaker.title }}</p><p class="mt-4 text-sm leading-6 text-forest/55">{{ speaker.bio }}</p></div></article></div></div></section>
    <section class="bg-cream-2"><div class="section-pad"><div class="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><div class="eyebrow">COMMUNITY VOICES</div><h2 class="display mt-4 text-5xl md:text-6xl">Stories belong here.</h2></div><NuxtLink to="/stories" class="button-outline">View stories <ArrowUpRight :size="15"/></NuxtLink></div></div></section>
  </div>
</template>
