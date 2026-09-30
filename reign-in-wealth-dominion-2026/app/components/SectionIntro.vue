<script setup lang="ts">
defineProps<{ eyebrow: string; title: string; body?: string; align?: 'left'|'center' }>()
</script>
<template>
  <div class="reveal" :class="align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'">
    <div class="eyebrow">{{ eyebrow }}</div>
    <h2 class="display mt-4 text-5xl leading-[.95] text-white md:text-7xl">{{ title }}</h2>
    <p v-if="body" class="mt-6 max-w-2xl text-sm leading-7 text-white/55 md:text-base" :class="align === 'center' ? 'mx-auto' : ''">{{ body }}</p>
  </div>
</template>
