import type { RequestHandler } from './$types'
import { routeHandler } from '$lib/server/route-handler'
import type { QuestId } from 'content'

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ locals, params }) => {
  return routeHandler(() =>
    locals.controllers.userQuestController.startQuest(locals.userId, params.questId as QuestId)
  )
}

export const GET: RequestHandler = async ({ params, locals }) =>
  routeHandler(() =>
    locals.controllers.userQuestController.getQuestProgress(
      locals.userId,
      params.questId as QuestId
    )
  )
