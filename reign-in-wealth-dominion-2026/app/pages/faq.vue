<script setup lang="ts">
import { Plus, ArrowUpRight } from 'lucide-vue-next'
import { site } from '~/data/site'

const active = ref<number | null>(null)

useHead({
  title: 'FAQ — DOMINION 2026',
})
</script>

<template>
  <div class="pt-[76px]">
    <!-- HERO -->
    <section
      class="relative min-h-[240px] overflow-hidden bg-black text-cream"
    >
      <!-- Background image -->
      <div
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('https://images.pexels.com/photos/221164/pexels-photo-221164.jpeg?_gl=1*i6zjbj*_ga*MTcxMTE5NTQyNy4xNzkxMTI0MDU0*_ga_8JE65Q40S6*czE3OTExMjQwNTQkbzEkZzEkdDE3OTExMjQwNjAkajU0JGwwJGgw')"
      ></div>

      <!-- Cinematic overlays -->
      <div class="absolute inset-0 bg-black/55"></div>

      <div
        class="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/60"
      ></div>

      <!-- Content -->
      <div class="relative z-10">
        <div class="section-pad">
          <div class="max-w-4xl">
            <div class="eyebrow !text-gold">
              QUESTIONS
            </div>

            <h1 class="display mt-5 text-6xl md:text-8xl">
              Before you come.
            </h1>

            <p class="mt-7 max-w-2xl text-sm leading-8 text-cream/65 md:text-base">
              The practical details, in one place.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="bg-cream text-ink">
      <div class="section-pad">
        <div class="mx-auto max-w-4xl border-y border-ink/10">

          <div
            v-for="(item, i) in site.faqs"
            :key="item[0]"
            class="border-b border-ink/10 last:border-b-0"
          >
            <button
              type="button"
              class="group flex w-full items-center justify-between gap-6 py-7 text-left"
              @click="active = active === i ? null : i"
            >
              <span
                class="max-w-3xl font-serif text-xl leading-tight text-ink transition-colors duration-300 group-hover:text-gold-dark md:text-2xl"
              >
                {{ item[0] }}
              </span>

              <span
                class="grid h-9 w-9 shrink-0 place-items-center border transition-all duration-300"
                :class="
                  active === i
                    ? 'border-gold bg-gold text-black'
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
                class="overflow-hidden pb-7 pr-10"
              >
                <p class="max-w-3xl text-sm leading-7 text-ink/55">
                  {{ item[1] }}
                </p>
              </div>
            </Transition>
          </div>

        </div>

        <!-- CTA -->
        <div
          class="mx-auto mt-14 max-w-4xl border border-ink/10 bg-white/50 p-7 md:flex md:items-center md:justify-between"
        >
          <div>
            <div class="eyebrow text-gold-dark">
              STILL HAVE QUESTIONS?
            </div>

            <h2 class="mt-2 font-serif text-3xl text-ink">
              Start with the experience.
            </h2>
          </div>

          <NuxtLink
            to="/experience"
            class="button-gold mt-5 md:mt-0"
          >
            Explore the weekend
            <ArrowUpRight :size="15" />
          </NuxtLink>
        </div>
      </div>
    </section>
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