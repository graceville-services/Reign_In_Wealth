<script setup lang="ts">
import { Plus, ArrowUpRight } from 'lucide-vue-next'
import { site } from '~/data/site'
const active = ref<number | null>(null)
useHead({ title: 'FAQ — DOMINION 2026' })
</script>
<template>
  <div class="pt-[76px]"><section class="bg-forest text-cream"><div class="section-pad grid gap-10 md:grid-cols-[1fr_.7fr] md:items-end"><div><div class="eyebrow !text-primary-light">QUESTIONS</div><h1 class="display mt-5 text-6xl md:text-8xl">Everything in one place.</h1></div><p class="text-sm leading-8 text-cream/60">Short answers, quick decisions, and no need to hunt through the whole site.</p></div></section><section><div class="section-pad"><div class="mx-auto max-w-4xl divide-y divide-forest/10 border-y border-forest/10"> <div v-for="(item,i) in site.faqs" :key="item[0]"><button class="flex w-full items-center justify-between gap-5 py-6 text-left" @click="active = active === i ? null : i"><span class="font-serif text-xl md:text-2xl">{{ item[0] }}</span><Plus :size="18" class="shrink-0 text-primary transition" :class="active === i ? 'rotate-45' : ''"/></button><Transition name="faq"><p v-if="active === i" class="max-w-3xl pb-7 pr-8 text-sm leading-7 text-forest/55">{{ item[1] }}</p></Transition></div></div><div class="mx-auto mt-14 max-w-4xl border border-forest/10 bg-white/45 p-7 md:flex md:items-center md:justify-between"><div><div class="eyebrow">STILL NEED HELP?</div><h2 class="mt-2 font-serif text-3xl">Go back to the full experience.</h2></div><NuxtLink to="/experience" class="button-primary mt-5 md:mt-0">Explore details <ArrowUpRight :size="15"/></NuxtLink></div></div></section></div>
</template>
<style scoped>.faq-enter-active,.faq-leave-active{transition:all .22s ease}.faq-enter-from,.faq-leave-to{opacity:0;transform:translateY(-6px)}</style>
