import { routeHandler } from '$lib/server/route-handler'
import { userController } from '$lib/server/user/controller'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ locals }) =>
  routeHandler(() => userController.getReferrals(locals.context, locals.userId))
