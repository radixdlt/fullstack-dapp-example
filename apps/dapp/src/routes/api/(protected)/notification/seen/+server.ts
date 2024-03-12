import { notificationController } from '$lib/server/notification/controller'
import { routeHandler } from '$lib/server/route-handler'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ locals, request }) => {
  const requestBody = await request.json()
  return routeHandler(() =>
    notificationController.markAsSeen(locals.context, requestBody.notificationIds, locals.userId)
  )
}
