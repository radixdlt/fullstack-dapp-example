import { messageController } from '$lib/server/message/controller'
import { routeHandler } from '$lib/server/route-handler'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = ({ locals }) => {
  return routeHandler(() => messageController.getUnseen(locals.context, locals.userId))
}
