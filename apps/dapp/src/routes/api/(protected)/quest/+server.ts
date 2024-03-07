import { routeHandler } from '$lib/server/route-handler.js'
import { userQuestController } from '$lib/server/user-quest/controller.js'

export const GET = async ({ locals }) =>
  routeHandler(() => userQuestController.getQuestsProgress(locals.context, locals.userId))
