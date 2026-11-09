import { CheckoutProblem, quoteTicket } from '../../utils/ticket-pricing.ts'

export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'Cache-Control', 'no-store')

  try {
    return quoteTicket(await readBody(event))
  } catch (error) {
    if (error instanceof CheckoutProblem) {
      throw createError({ statusCode: error.statusCode, statusMessage: error.message, data: { code: error.code } })
    }
    throw error
  }
})
