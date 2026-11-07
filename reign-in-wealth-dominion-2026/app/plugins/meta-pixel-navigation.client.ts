export default defineNuxtPlugin((nuxtApp) => {
  let lastPath =
    window.location.pathname + window.location.search

  nuxtApp.hook('page:finish', () => {
    const currentPath =
      window.location.pathname + window.location.search

    if (currentPath === lastPath) return

    lastPath = currentPath

    const fbq = (
      window as Window & {
        fbq?: (...args: unknown[]) => void
      }
    ).fbq

    fbq?.('track', 'PageView')
  })
})