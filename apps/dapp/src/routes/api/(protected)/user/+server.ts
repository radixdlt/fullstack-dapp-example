import { userController } from '$lib/server/user/controller'
import type { RequestHandler } from './$types'
import { routeHandler } from '$lib/server/route-handler'

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ locals }) =>
  routeHandler(() => userController.getUser(locals.context, locals.userId))
