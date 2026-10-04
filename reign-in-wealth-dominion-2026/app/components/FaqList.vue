<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

defineProps<{
  items: string[][]
  theme?: 'dark' | 'light'
}>()

const active = ref<number | null>(null)
</script>

<template>
  <div
    class="divide-y border-y"
    :class="
      theme === 'dark'
        ? 'divide-white/10 border-white/10'
        : 'divide-ink/10 border-ink/10'
    "
  >
    <div
      v-for="(item, i) in items"
      :key="item[0]"
    >
      <button
        type="button"
        class="group flex w-full items-center justify-between gap-6 py-6 text-left"
        @click="active = active === i ? null : i"
      >
        <span
          class="max-w-3xl font-serif text-xl leading-tight transition md:text-2xl"
          :class="
            theme === 'dark'
              ? 'text-cream group-hover:text-gold'
              : 'text-ink group-hover:text-gold-dark'
          "
        >
          {{ item[0] }}
        </span>

        <span
          class="grid h-9 w-9 shrink-0 place-items-center border transition"
          :class="
            active === i
              ? 'border-gold bg-gold text-black'
              : theme === 'dark'
                ? 'border-white/15 text-white/50 group-hover:border-gold group-hover:text-gold'
                : 'border-ink/15 text-ink/45 group-hover:border-gold-dark group-hover:text-gold-dark'
          "
        >
          <Plus
            :size="17"
            class="transition-transform duration-300"
            :class="active === i ? 'rotate-45' : ''"
          />
        </span>
      </button>

      <Transition name="faq">
        <div
          v-if="active === i"
          class="pb-7 pr-10"
        >
          <p
            class="max-w-3xl text-sm leading-7"
            :class="
              theme === 'dark'
                ? 'text-white/50'
                : 'text-ink/55'
            "
          >
            {{ item[1] }}
          </p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.faq-enter-active,
.faq-leave-active {
  overflow: hidden;
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}

.faq-enter-from,
.faq-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

</style>