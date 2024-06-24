import { routeHandler } from '$lib/server/route-handler'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ locals }) =>
  routeHandler(() => locals.controllers.userQuestController.getSavedProgress(locals.userId))

export const DELETE: RequestHandler = async ({ locals }) =>
  routeHandler(() => locals.controllers.userQuestController.deleteSavedProgress(locals.userId))
