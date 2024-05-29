import { messageController } from '$lib/server/message/controller'
import { routeHandler } from '$lib/server/route-handler'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ locals, request }) => {
  const requestBody = await request.json()
  return routeHandler(() =>
    messageController.markAsSeen(locals.context, requestBody.messageIds, locals.userId)
  )
}
