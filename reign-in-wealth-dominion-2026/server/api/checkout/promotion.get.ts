import { promotionStatus } from '../../utils/ticket-pricing.ts'

export default defineEventHandler((event) => {
  setResponseHeader(event, 'Cache-Control', 'no-store')
  return promotionStatus()
})
