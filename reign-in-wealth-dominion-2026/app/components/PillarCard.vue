<script setup lang="ts">
import {
  Compass,
  Building2,
  ChartNoAxesCombined,
  ArrowUpRight,
} from 'lucide-vue-next'

const icons: Record<string, any> = {
  Compass,
  Building2,
  ChartNoAxesCombined,
}

defineProps<{
  number: string
  title: string
  body: string
  icon: string
}>()
</script>

<template>
  <article
    class="group reveal relative overflow-hidden border border-white/10 bg-white/[.025] p-7 transition duration-500 hover:-translate-y-1 hover:border-gold/35 hover:bg-white/[.04] md:p-8"
  >
    <!-- NUMBER -->
    <div class="flex items-start justify-between">
      <span class="font-mono text-[10px] tracking-[.14em] text-gold">
        {{ number }}
      </span>

      <component
        v-if="icons[icon]"
        :is="icons[icon]"
        :size="19"
        stroke-width="1.4"
        class="text-white/25 transition duration-500 group-hover:text-gold"
      />
    </div>

    <!-- TITLE -->
    <h3 class="display mt-20 text-4xl md:text-[2.7rem]">
      {{ title }}
    </h3>

    <!-- BODY -->
    <p class="mt-4 max-w-sm text-sm leading-7 text-white/45">
      {{ body }}
    </p>

    <!-- BOTTOM DETAIL -->
    <div
      class="mt-10 flex items-center gap-3 border-t border-white/10 pt-4"
    >
      <span
        class="h-px w-7 bg-gold/50 transition-all duration-500 group-hover:w-12"
      />

      <span
        class="font-mono text-[9px] uppercase tracking-[.18em] text-white/30"
      >
        {{ title }}
      </span>
    </div>
  </article>
</template>