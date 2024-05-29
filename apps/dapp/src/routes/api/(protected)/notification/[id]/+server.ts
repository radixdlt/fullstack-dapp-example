import { notificationController } from '$lib/server/notification/controller'
import { routeHandler } from '$lib/server/route-handler'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = ({ locals, params }) => {
  return routeHandler(() => notificationController.create(locals.context, locals.userId, params.id))
}
