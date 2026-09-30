<script setup lang="ts">
import { X, ShieldCheck, Minus, Plus, ArrowRight, LoaderCircle } from 'lucide-vue-next'
import type { Ticket } from '~/data/site'
const props = defineProps<{ open: boolean; ticket: Ticket | null }>()
const emit = defineEmits<{ close: []; success: [] }>()
const quantity = ref(1)
const name = ref('')
const email = ref('')
const { loading, error, checkout } = useTicketCheckout()
watch(() => props.ticket, () => { quantity.value = 1; error.value = '' })
const submit = async () => {
  if (!props.ticket || !name.value.trim() || !email.value.trim()) return
  await checkout(props.ticket.id, quantity.value, { name: name.value.trim(), email: email.value.trim() })
}
</script>
<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div v-if="open" class="fixed inset-0 z-[100] flex justify-end">
        <button class="absolute inset-0 bg-forest/35 backdrop-blur-sm" aria-label="Close checkout" @click="emit('close')" />
        <aside class="relative flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-forest/10 bg-cream p-5 shadow-2xl sm:p-8">
          <div class="flex items-center justify-between"><div><div class="eyebrow">SECURE CHECKOUT</div><h2 class="mt-2 font-serif text-3xl">Reserve your place.</h2></div><button class="grid h-10 w-10 place-items-center border border-forest/10" aria-label="Close" @click="emit('close')"><X :size="18" /></button></div>
          <div v-if="ticket" class="mt-8 border border-primary/20 bg-white/60 p-5"><div class="flex justify-between gap-5"><div><p class="font-mono text-[9px] uppercase tracking-[.18em] text-primary">Selected experience</p><p class="mt-2 font-serif text-2xl">{{ ticket.name }}</p></div><div class="text-right"><p class="font-serif text-2xl">${{ ticket.price * quantity }}</p><p class="text-[10px] text-forest/35">{{ quantity }} ticket{{ quantity > 1 ? 's' : '' }}</p></div></div></div>
          <form class="mt-8 flex flex-1 flex-col" @submit.prevent="submit">
            <div class="space-y-5"><label class="block"><span class="field-label">Full name</span><input v-model="name" required autocomplete="name" class="field" placeholder="Your name" /></label><label class="block"><span class="field-label">Email address</span><input v-model="email" required type="email" autocomplete="email" class="field" placeholder="you@example.com" /></label>
              <div><span class="field-label">Quantity</span><div class="flex items-center justify-between border border-forest/15 p-2"><button type="button" class="grid h-10 w-10 place-items-center bg-forest/5" :disabled="quantity <= 1" @click="quantity--"><Minus :size="15" /></button><span class="font-mono text-sm">{{ quantity }}</span><button type="button" class="grid h-10 w-10 place-items-center bg-forest/5" :disabled="quantity >= 8" @click="quantity++"><Plus :size="15" /></button></div></div>
            </div>
            <div class="mt-auto pt-8"><p v-if="error" class="mb-4 border border-red-400/20 bg-red-400/5 p-3 text-xs leading-5 text-red-200">{{ error }}</p><button :disabled="loading || !ticket" class="button-primary w-full py-4 disabled:cursor-not-allowed disabled:opacity-50"> <LoaderCircle v-if="loading" :size="16" class="animate-spin" /> <span v-else class="inline-flex items-center gap-2">Continue to secure payment <ArrowRight :size="16" /></span></button><div class="mt-4 flex items-center justify-center gap-2 text-[10px] text-forest/30"><ShieldCheck :size="14" /> Payments powered by Stripe</div></div>
          </form>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>
<style scoped>
@reference "~/assets/css/main.css";
.field-label { @apply mb-2 block font-mono text-[9px] font-medium uppercase tracking-[.18em] text-forest/45; }
.field { @apply w-full border border-forest/15 bg-white/40 px-4 py-3.5 text-sm text-forest outline-none transition placeholder:text-forest/25 focus:border-primary focus:bg-white/[.04]; }
.drawer-enter-active,.drawer-leave-active { transition: opacity .25s ease; } .drawer-enter-active aside,.drawer-leave-active aside { transition: transform .35s cubic-bezier(.2,.8,.2,1); } .drawer-enter-from,.drawer-leave-to { opacity: 0; } .drawer-enter-from aside,.drawer-leave-to aside { transform: translateX(100%); }
</style>
