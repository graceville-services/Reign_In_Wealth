<script setup lang="ts">
const props = defineProps<{
  video: string
  poster?: string
  background?: boolean
}>()

const videoRef = ref<HTMLVideoElement | null>(null)

onMounted(() => {
  const video = videoRef.value

  if (!video) return

  const playVideo = () => {
    video.play().catch(() => {
      // Autoplay can be blocked by the browser.
      // The poster image will remain visible in that case.
    })
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(playVideo, { timeout: 1500 })
  } else {
    setTimeout(playVideo, 300)
  }
})
</script>

<template>
  <div
    :class="[
      'relative overflow-hidden',
      background ? 'h-full w-full' : 'h-full w-full'
    ]"
  >
    <video
      ref="videoRef"
      :poster="poster"
      :src="video"
      muted
      loop
      playsinline
      preload="metadata"
      autoplay
      class="absolute inset-0 h-full w-full object-cover"
    />

    <div
      v-if="background"
      class="absolute inset-0 bg-forest/10 mix-blend-multiply"
    />
  </div>
</template>