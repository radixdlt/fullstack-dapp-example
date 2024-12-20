import { routeHandler } from '$lib/server/route-handler'
import type { QuestId } from 'content'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ locals, params }) => {
  return routeHandler(() =>
    locals.controllers.userQuestController.saveProgress(
      locals.userId,
      params.questId as QuestId,
      parseInt(params.progress)
    )
  )
}
