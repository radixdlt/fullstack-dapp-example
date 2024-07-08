import { routeHandler } from '$lib/server/route-handler'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ locals }) =>
  routeHandler(() =>
    locals.controllers.userController.doesTransactionExist(
      locals.userId,
      `PopulateResources:${locals.userId}`
    )
  )
