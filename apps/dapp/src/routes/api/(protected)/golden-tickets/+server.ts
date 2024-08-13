import { routeHandler } from '$lib/server/route-handler'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = ({ locals }) =>
  routeHandler(() => locals.controllers.goldenTicketController.getAll())
