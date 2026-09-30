export function useTicketCheckout() {
  const loading = ref(false)
  const error = ref('')
  const checkout = async (ticketId: string, quantity: number, attendee: { name: string; email: string }) => {
    loading.value = true
    error.value = ''
    try {
      const result = await $fetch<{ url?: string; error?: string }>('/api/checkout', {
        method: 'POST',
        body: { ticketId, quantity, attendee }
      })
      if (!result.url) throw new Error(result.error || 'Checkout could not be started.')
      window.location.href = result.url
    } catch (err: any) {
      error.value = err?.data?.message || err?.message || 'Something went wrong. Please try again.'
    } finally {
      loading.value = false
    }
  }
  return { loading, error, checkout }
}
