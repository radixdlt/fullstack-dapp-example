import { routeHandler } from '$lib/server/route-handler'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = ({ locals }) => {
  return routeHandler(() => locals.controllers.notificationController.getUnseen(locals.userId))
}
