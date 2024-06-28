import { routeHandler } from '$lib/server/route-handler'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ locals, request }) => {
  const requestBody = await request.json()
  return routeHandler(() =>
    locals.controllers.notificationController.markAsSeen(requestBody.notificationId, locals.userId)
  )
}
