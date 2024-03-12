import { notificationController } from '$lib/server/notification/controller'
import { routeHandler } from '$lib/server/route-handler'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = ({ locals }) => {
  return routeHandler(() => notificationController.getUnseen(locals.context, locals.userId))
}
