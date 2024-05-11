import { userController } from '$lib/server/user/controller'
import type { RequestHandler } from './$types'
import { routeHandler } from '$lib/server/route-handler'

/** @type {import('./$types').RequestHandler} */
export const PUT: RequestHandler = async ({ locals, params }) => {
  return routeHandler(() => userController.setUserName(locals.context, locals.userId, params.name))
}
