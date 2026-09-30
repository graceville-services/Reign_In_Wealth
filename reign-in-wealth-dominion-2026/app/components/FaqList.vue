<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
defineProps<{ items: string[][] }>()
const active = ref<number | null>(null)
</script>
<template>
  <div class="divide-y divide-white/10 border-y border-white/10">
    <div v-for="(item, i) in items" :key="item[0]">
      <button class="flex w-full items-center justify-between gap-5 py-5 text-left" @click="active = active === i ? null : i"><span class="text-sm font-semibold md:text-base">{{ item[0] }}</span><Plus :size="17" class="shrink-0 text-gold transition" :class="active === i ? 'rotate-45' : ''" /></button>
      <Transition name="faq"><p v-if="active === i" class="max-w-3xl pb-6 pr-8 text-sm leading-7 text-white/45">{{ item[1] }}</p></Transition>
    </div>
  </div>
</template>
<style scoped>.faq-enter-active,.faq-leave-active{transition:all .2s ease}.faq-enter-from,.faq-leave-to{opacity:0;transform:translateY(-5px)}</style>
