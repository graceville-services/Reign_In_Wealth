<script setup lang="ts">
import { ArrowUpRight, Check, Sparkles } from 'lucide-vue-next'
import type { Ticket } from '~/data/site'

const props = defineProps<{
  ticket: Ticket
}>()

const emit = defineEmits<{
  buy: [ticket: Ticket]
}>()
</script>

<template>
  <article
    class="group relative flex h-full flex-col overflow-hidden border bg-black p-6 text-cream transition duration-500 md:p-8"
    :class="
      ticket.featured
        ? 'border-gold shadow-[0_25px_80px_rgba(197,164,109,.14)]'
        : 'border-white/15 hover:-translate-y-1 hover:border-white/30'
    "
  >
    <!-- VIP MARKER -->
    <div
      v-if="ticket.featured"
      class="absolute right-5 top-5 inline-flex items-center gap-2 border border-gold/40 bg-gold/10 px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[.16em] text-gold"
    >
      <Sparkles :size="12" />
      VIP
    </div>

    <div class="font-mono text-[9px] font-bold uppercase tracking-[.2em] text-gold">
      {{ ticket.eyebrow }}
    </div>

    <h3 class="mt-5 max-w-[82%] font-serif text-3xl leading-tight text-cream md:text-4xl">
      {{ ticket.name }}
    </h3>

    <p
      v-if="'headline' in ticket && ticket.headline"
      class="mt-3 text-sm font-semibold leading-6 text-gold"
    >
      {{ ticket.headline }}
    </p>

    <div class="mt-8 flex items-end gap-2">
      <span class="font-serif text-5xl leading-none text-cream">
        ${{ ticket.price }}
      </span>
      <span class="pb-1 text-[10px] font-bold uppercase tracking-[.14em] text-cream/55">
        USD
      </span>
    </div>

    <p class="mt-5 min-h-[84px] max-w-md text-sm leading-7 text-cream/75">
      {{ ticket.description }}
    </p>

    <div class="my-7 h-px bg-white/15" />

    <div class="font-mono text-[9px] font-bold uppercase tracking-[.18em] text-gold">
      What’s included
    </div>

    <ul class="mt-5 space-y-4">
      <li
        v-for="feature in ticket.features"
        :key="feature"
        class="flex gap-3 text-sm leading-6 text-cream/85"
      >
        <span class="mt-[3px] grid h-4 w-4 shrink-0 place-items-center border border-gold/60 text-gold">
          <Check :size="10" stroke-width="2.5" />
        </span>
        <span>{{ feature }}</span>
      </li>
    </ul>

    <div class="mt-auto pt-10">
      <button
        type="button"
        class="flex w-full items-center justify-center gap-2 bg-gold px-4 py-4 text-[10px] font-extrabold uppercase tracking-[.18em] text-black transition duration-300 hover:-translate-y-0.5 hover:bg-gold-light"
        @click="emit('buy', props.ticket)"
      >
        Get this ticket
        <ArrowUpRight :size="15" />
      </button>
    </div>
  </article>
</template>
