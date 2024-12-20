import { routeHandler } from '$lib/server/route-handler.js'

export const GET = async ({ locals }) =>
  routeHandler(() => locals.controllers.userQuestController.getQuestsProgress(locals.userId))
