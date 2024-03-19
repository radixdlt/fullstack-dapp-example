import type { RequestHandler } from './$types'
import { userQuestController } from '$lib/server/user-quest/controller'
import { routeHandler } from '$lib/server/route-handler'
import type { Quests } from 'content'

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ locals, params }) => {
  return routeHandler(() =>
    userQuestController.setQuestProgress(
      locals.context,
      locals.userId,
      params.questId as keyof Quests
    )
  )
}

export const GET: RequestHandler = async ({ params, locals }) =>
  routeHandler(() =>
    userQuestController.getQuestProgress(
      locals.context,
      locals.userId,
      params.questId as keyof Quests
    )
  )
