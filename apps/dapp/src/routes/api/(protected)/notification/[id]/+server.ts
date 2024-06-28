import { routeHandler } from '$lib/server/route-handler'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = ({ locals, params }) => {
  return routeHandler(() =>
    locals.controllers.notificationController.create(locals.userId, params.id)
  )
}
