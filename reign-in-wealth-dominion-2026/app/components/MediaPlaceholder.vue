<script setup lang="ts">
import { Image, Play } from 'lucide-vue-next'
defineProps<{ src?: string; label: string; video?: boolean; class?: string }>()
</script>
<template>
  <div :class="['relative flex min-h-[240px] items-center justify-center overflow-hidden bg-[#141411]', $props.class]">
    <img v-if="src" :src="src" alt="" class="absolute inset-0 h-full w-full object-cover opacity-80" />
    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />
    <div class="relative z-10 flex flex-col items-center gap-3 text-center">
      <div class="grid h-12 w-12 place-items-center border border-white/20 bg-black/30 backdrop-blur"><Play v-if="video" :size="16" class="fill-current text-gold" /><Image v-else :size="18" class="text-gold" /></div>
      <span class="max-w-[180px] font-mono text-[9px] uppercase tracking-[.18em] text-white/55">{{ label }}</span>
    </div>
  </div>
</template>
