import { userController } from '$lib/server/user/controller'
import type { RequestHandler } from './$types'
import { routeHandler } from '$lib/server/route-handler'

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ locals }) =>
  routeHandler(() =>
    userController.mintHeroBadge(locals.context, {
      userId: locals.userId
    })
  )
