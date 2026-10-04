<script setup lang="ts">
import { X, ArrowUpRight, Minus, Plus, ShieldCheck } from 'lucide-vue-next'
import type { Ticket } from '~/data/site'

const props = defineProps<{
  open: boolean
  ticket: Ticket | null
}>()

const emit = defineEmits<{
  close: []
}>()

const {
  checkout,
  loading,
  error,
} = useTicketCheckout()

const attendeeName = ref('')
const attendeeEmail = ref('')
const quantity = ref(1)

const total = computed(() => {
  if (!props.ticket) return 0

  return props.ticket.price * quantity.value
})

const canCheckout = computed(() => {
  return (
    !!props.ticket &&
    attendeeName.value.trim().length >= 2 &&
    attendeeEmail.value.includes('@') &&
    quantity.value >= 1 &&
    !loading.value
  )
})

const increaseQuantity = () => {
  if (quantity.value < 20) {
    quantity.value++
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const close = () => {
  if (loading.value) return

  emit('close')
}

const submitCheckout = async () => {
  if (!props.ticket || !canCheckout.value) return

  await checkout(
    props.ticket,
    quantity.value,
    {
      name: attendeeName.value.trim(),
      email: attendeeEmail.value.trim().toLowerCase(),
    },
  )
}

watch(
  () => props.open,
  (open) => {
    if (import.meta.client) {
      document.body.style.overflow = open ? 'hidden' : ''
    }

    if (open) {
      error.value = ''
    }
  },
)

onUnmounted(() => {
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open && ticket"
        class="fixed inset-0 z-[100] flex items-end justify-end"
      >
        <!-- Backdrop -->
        <button
          type="button"
          aria-label="Close checkout"
          class="absolute inset-0 bg-black/75 backdrop-blur-sm"
          @click="close"
        />

        <!-- Drawer -->
        <aside
          class="relative z-10 flex h-full w-full max-w-xl flex-col overflow-y-auto bg-cream text-ink shadow-2xl"
        >
          <!-- Header -->
          <div class="flex items-center justify-between border-b border-ink/10 px-6 py-5 md:px-8">
            <div>
              <div class="eyebrow text-gold-dark">
                SECURE CHECKOUT
              </div>

              <h2 class="display mt-2 text-3xl md:text-4xl">
                Your place in the room.
              </h2>
            </div>

            <button
              type="button"
              aria-label="Close"
              class="grid h-11 w-11 shrink-0 place-items-center border border-ink/10 text-ink transition hover:border-gold-dark hover:text-gold-dark"
              @click="close"
            >
              <X :size="19" />
            </button>
          </div>

          <!-- Content -->
          <div class="flex-1 px-6 py-7 md:px-8 md:py-9">

            <!-- Ticket -->
            <div class="border border-ink/10 bg-white/45 p-5">
              <div class="flex items-start justify-between gap-5">
                <div>
                  <div class="font-mono text-[9px] font-bold uppercase tracking-[.18em] text-gold-dark">
                    {{ ticket.eyebrow }}
                  </div>

                  <h3 class="mt-2 font-serif text-2xl">
                    {{ ticket.name }}
                  </h3>
                </div>

                <div class="font-serif text-2xl">
                  ${{ ticket.price }}
                </div>
              </div>

              <!-- Quantity -->
              <div class="mt-6 flex items-center justify-between border-t border-ink/10 pt-5">
                <div>
                  <div class="text-xs font-bold uppercase tracking-[.12em]">
                    Quantity
                  </div>

                  <div class="mt-1 text-xs text-ink/55">
                    How many seats?
                  </div>
                </div>

                <div class="flex items-center border border-ink/15">
                  <button
                    type="button"
                    class="grid h-10 w-10 place-items-center transition hover:bg-ink hover:text-cream"
                    :disabled="quantity <= 1"
                    @click="decreaseQuantity"
                  >
                    <Minus :size="14" />
                  </button>

                  <span class="grid h-10 w-12 place-items-center border-x border-ink/15 font-mono text-sm">
                    {{ quantity }}
                  </span>

                  <button
                    type="button"
                    class="grid h-10 w-10 place-items-center transition hover:bg-ink hover:text-cream"
                    :disabled="quantity >= 20"
                    @click="increaseQuantity"
                  >
                    <Plus :size="14" />
                  </button>
                </div>
              </div>

              <!-- Total -->
              <div class="mt-5 flex items-end justify-between border-t border-ink/10 pt-5">
                <span class="text-xs font-bold uppercase tracking-[.12em]">
                  Total
                </span>

                <span class="font-serif text-3xl">
                  ${{ total }}
                </span>
              </div>
            </div>

            <!-- Attendee -->
            <div class="mt-8">
              <div class="eyebrow text-gold-dark">
                ATTENDEE DETAILS
              </div>

              <div class="mt-5 space-y-5">

                <label class="block">
                  <span class="mb-2 block text-[10px] font-extrabold uppercase tracking-[.16em]">
                    Full name
                  </span>

                  <input
                    v-model="attendeeName"
                    type="text"
                    autocomplete="name"
                    placeholder="Your full name"
                    class="w-full border border-ink/15 bg-white px-4 py-4 text-sm outline-none transition placeholder:text-ink/30 focus:border-gold-dark"
                  />
                </label>

                <label class="block">
                  <span class="mb-2 block text-[10px] font-extrabold uppercase tracking-[.16em]">
                    Email address
                  </span>

                  <input
                    v-model="attendeeEmail"
                    type="email"
                    autocomplete="email"
                    placeholder="you@example.com"
                    class="w-full border border-ink/15 bg-white px-4 py-4 text-sm outline-none transition placeholder:text-ink/30 focus:border-gold-dark"
                  />

                  <p class="mt-2 text-xs leading-5 text-ink/50">
                    Your confirmation and private venue details will be sent to this email.
                  </p>
                </label>

              </div>
            </div>

            <!-- Non refundable -->
            <div class="mt-7 flex gap-3 border border-gold-dark/25 bg-gold/5 p-4">
              <ShieldCheck
                :size="17"
                class="mt-0.5 shrink-0 text-gold-dark"
              />

              <p class="text-xs leading-6 text-ink/70">
                By continuing, you acknowledge that ticket purchases are
                <strong class="text-ink">
                  non-refundable.
                </strong>
              </p>
            </div>

            <!-- Error -->
            <div
              v-if="error"
              class="mt-5 border border-red-900/20 bg-red-50 p-4 text-sm leading-6 text-red-900"
            >
              {{ error }}
            </div>
          </div>

          <!-- Footer -->
          <div class="border-t border-ink/10 bg-cream-2 px-6 py-5 md:px-8">
            <button
              type="button"
              :disabled="!canCheckout"
              class="flex w-full items-center justify-center gap-2 bg-gold px-5 py-4 text-[10px] font-extrabold uppercase tracking-[.18em] text-black transition hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-40"
              @click="submitCheckout"
            >
              <span v-if="loading">
                Taking you to secure checkout...
              </span>

              <span v-else>
                Continue to Stripe
                <ArrowUpRight
                  :size="15"
                  class="ml-1 inline"
                />
              </span>
            </button>

            <p class="mt-3 text-center text-[10px] leading-5 text-ink/45">
              Secure payment powered by Stripe.
            </p>
          </div>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>