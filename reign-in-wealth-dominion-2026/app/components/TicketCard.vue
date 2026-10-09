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
    :id="ticket.id === 'vip' ? 'vip' : undefined"
    class="group relative flex h-full flex-col overflow-hidden border p-6 text-cream transition duration-500 md:p-8"
    :class="
      ticket.featured
        ? 'border-gold/80 bg-[linear-gradient(160deg,#211b10_0%,#0c0b08_38%,#000_100%)] shadow-[0_20px_65px_rgba(197,164,109,.13)] ring-1 ring-gold/20 lg:-translate-y-2'
        : 'border-white/15 bg-black hover:-translate-y-1 hover:border-white/30'
    "
  >
    <!-- VIP ACCENT -->
    <div
      v-if="ticket.featured"
      class="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent"
    />

    <!-- VIP LABEL -->
    <div
      v-if="ticket.featured"
      class="mb-7 flex items-center justify-between gap-3 border-b border-gold/20 pb-4"
    >
      <div
        class="inline-flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[.16em] text-gold"
      >
        <Sparkles :size="13" />
        VIP EXPERIENCE
      </div>

      <span
        class="border border-gold/35 bg-gold/10 px-2.5 py-1.5 font-mono text-[8px] font-bold uppercase tracking-[.12em] text-gold"
      >
        Exclusive Access
      </span>
    </div>

    <div
      class="font-mono text-[9px] font-bold uppercase tracking-[.2em] text-gold"
    >
      {{ ticket.eyebrow }}
    </div>

    <h3
      class="mt-5 max-w-[90%] font-serif text-3xl leading-tight text-cream md:text-4xl"
    >
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

      <span
        class="pb-1 text-[10px] font-bold uppercase tracking-[.14em] text-cream/55"
      >
        USD
      </span>
    </div>

    <!-- VIP PRICE CONTEXT -->
    <p
      v-if="ticket.id === 'vip'"
      class="mt-3 inline-flex w-fit items-center gap-2 border border-gold/25 bg-gold/[.07] px-3 py-2 text-[10px] font-semibold text-gold"
    >
      <Sparkles :size="12" />
      $147 more than Regular · Includes all Regular benefits
    </p>

    <p class="mt-5 min-h-[84px] max-w-md text-sm leading-7 text-cream/75">
      {{ ticket.description }}
    </p>

    <div
      class="my-7 h-px"
      :class="ticket.featured ? 'bg-gold/25' : 'bg-white/15'"
    />

    <div
      class="font-mono text-[9px] font-bold uppercase tracking-[.18em] text-gold"
    >
      What’s included
    </div>

    <ul class="mt-5 space-y-4">
      <li
        v-for="feature in ticket.features"
        :key="feature"
        class="flex gap-3 text-sm leading-6 text-cream/85"
      >
        <span
          class="mt-[3px] grid h-4 w-4 shrink-0 place-items-center"
          :class="
            ticket.featured
              ? 'border border-gold bg-gold/10 text-gold'
              : 'border border-gold/60 text-gold'
          "
        >
          <Check :size="10" stroke-width="2.5" />
        </span>

        <span>{{ feature }}</span>
      </li>
    </ul>

    <!-- CTA -->
    <div class="mt-auto pt-10">
      <button
        type="button"
        class="flex w-full items-center justify-center gap-2 px-4 py-4 text-[10px] font-extrabold uppercase tracking-[.16em] transition duration-300 hover:-translate-y-0.5"
        :class="
          ticket.featured
            ? 'bg-gold text-black shadow-[0_8px_25px_rgba(197,164,109,.15)] hover:bg-gold-light'
            : 'border border-gold/50 bg-gold text-black hover:bg-gold-light'
        "
        @click="emit('buy', props.ticket)"
      >
        {{ ticket.id === 'vip' ? 'Unlock VIP Access' : 'Get this ticket' }}
        <ArrowUpRight :size="15" />
      </button>

      <p
        v-if="ticket.featured"
        class="mt-3 text-center text-[9px] uppercase tracking-[.13em] text-cream/45"
      >
        More access. More connection. One complete weekend.
      </p>
    </div>
  </article>
</template>