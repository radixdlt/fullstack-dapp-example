import { routeHandler } from '$lib/server/route-handler'
import { userQuestController } from '$lib/server/user-quest/controller'
import type { QuestId } from 'content'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ locals, params, request }) => {
  const requestBody = await request.json()
  return routeHandler(() =>
    userQuestController.saveProgress(
      locals.context,
      locals.userId,
      params.questId as QuestId,
      parseInt(params.progress),
      requestBody.accountAddress
    )
  )
}
