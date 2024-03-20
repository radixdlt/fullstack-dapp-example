import { routeHandler } from '$lib/server/route-handler'
import { userQuestController } from '$lib/server/user-quest/controller'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ locals }) =>
  routeHandler(() => userQuestController.getSavedProgress(locals.context, locals.userId))

export const DELETE: RequestHandler = async ({ locals }) =>
  routeHandler(() => userQuestController.deleteSavedProgress(locals.context, locals.userId))
