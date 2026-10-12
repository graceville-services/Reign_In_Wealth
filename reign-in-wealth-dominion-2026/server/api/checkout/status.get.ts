
import { processPaidSession } from '../../utils/dominion-registration'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const sessionId = String(query.session_id || '')

  if (!sessionId || !sessionId.startsWith('cs_')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'A valid checkout session is required.',
    })
  }

  try {
    return await processPaidSession(sessionId)
  } catch (error) {
    console.error('Checkout status processing failed:', error)

    throw createError({
      statusCode: 502,
      statusMessage:
        'We could not verify your payment yet. Please try again shortly.',
    })
  }
})
