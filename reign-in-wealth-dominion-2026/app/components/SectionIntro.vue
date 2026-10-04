<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    body?: string
    align?: 'left' | 'center'
    theme?: 'dark' | 'light'
  }>(),
  {
    align: 'left',
    theme: 'light',
  },
)
</script>

<template>
  <div
    class="reveal"
    :class="[
      align === 'center'
        ? 'mx-auto max-w-3xl text-center'
        : 'max-w-3xl',
      theme === 'dark'
        ? 'text-cream'
        : 'text-ink',
    ]"
  >
    <div
      class="eyebrow"
      :class="theme === 'dark' ? '!text-gold' : 'text-gold-dark'"
    >
      {{ eyebrow }}
    </div>

    <h2
      class="display mt-4 text-5xl leading-[.95] md:text-7xl"
    >
      {{ title }}
    </h2>

    <p
      v-if="body"
      class="mt-6 max-w-2xl text-sm leading-7 md:text-base"
      :class="
        theme === 'dark'
          ? 'text-white/55'
          : 'text-ink/55'
      "
      :style="align === 'center' ? 'margin-left:auto;margin-right:auto' : undefined"
    >
      {{ body }}
    </p>
  </div>
</template>