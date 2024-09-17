import { routeHandler } from '$lib/server/route-handler'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ locals, params }) =>
  routeHandler(() => locals.controllers.notificationController.markAsSeen(params.id, locals.userId))

export const GET: RequestHandler = async ({ locals, params }) =>
  routeHandler(() =>
    locals.controllers.notificationController.hasSeenNotification(locals.userId, params.id)
  )
