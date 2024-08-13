import { routeHandler } from '$lib/server/route-handler'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = ({ locals, params }) =>
  routeHandler(() => locals.controllers.goldenTicketController.getTicket(params.id))
