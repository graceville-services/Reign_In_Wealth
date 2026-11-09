import type { Ticket } from '~/data/site'

type Attendee = {
  name: string
  email: string
}

type CheckoutResponse = {
  url?: string
  sessionId?: string
  error?: string
}

const STORAGE_KEY = 'dominion_checkout'

export function useTicketCheckout() {
  const loading = ref(false)
  const error = ref('')

  const saveCheckoutSession = (
    ticket: Ticket,
    quantity: number,
    attendee: Attendee,
  ) => {
    if (!import.meta.client) return

    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ticketId: ticket.id,
          ticketName: ticket.name,
          quantity,
          attendeeName: attendee.name,
          attendeeEmail: attendee.email,
          createdAt: new Date().toISOString(),
        }),
      )
    } catch {
      // Checkout remains available when browser storage is blocked.
    }
  }

  const getSavedCheckout = () => {
    if (!import.meta.client) return null

    try {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  }

  const clearCheckoutSession = () => {
    if (!import.meta.client) return

    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // Browser storage may be unavailable.
    }
  }

  const checkout = async (
    ticket: Ticket,
    quantity: number,
    attendee: Attendee,
  ) => {
    loading.value = true
    error.value = ''

    try {
      // Remember the checkout in the browser.
      saveCheckoutSession(ticket, quantity, attendee)

      const result = await $fetch<CheckoutResponse>(
        '/api/checkout',
        {
          method: 'POST',

          body: {
            ticketId: ticket.id,
            quantity,
            attendee,
          },
        },
      )

      if (!result.url) {
        throw new Error(
          result.error || 'Checkout could not be started.',
        )
      }

      window.location.href = result.url
    } catch (err: any) {
      error.value =
        err?.data?.message ||
        err?.data?.statusMessage ||
        err?.message ||
        'Something went wrong. Please try again.'
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    checkout,
    getSavedCheckout,
    clearCheckoutSession,
  }
}