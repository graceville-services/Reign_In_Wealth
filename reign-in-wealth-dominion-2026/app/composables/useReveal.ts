export function useReveal() {
  const revealAll = () => {
    if (import.meta.server) return
    const items = document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)')
    if (!items.length) return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' })
    items.forEach(el => observer.observe(el))
    return observer
  }
  return { revealAll }
}
