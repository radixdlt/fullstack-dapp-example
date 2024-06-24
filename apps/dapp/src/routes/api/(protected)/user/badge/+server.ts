import type { RequestHandler } from './$types'
import { routeHandler } from '$lib/server/route-handler'

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ locals }) =>
  routeHandler(() =>
    locals.controllers.userController.allowAccountAddressToMintHeroBadge(locals.context, {
      userId: locals.userId
    })
  )
