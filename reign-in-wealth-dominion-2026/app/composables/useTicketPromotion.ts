/** Public offer availability; the redemption code stays on the server. */
export function useTicketPromotion() {
  const { data } = useFetch<{ enabled: boolean }>('/api/checkout/promotion', {
    key: 'dominion-ticket-promotion',
    default: () => ({ enabled: false }),
  })

  return computed(() => data.value?.enabled === true)
}
