import { userQuestController } from '$lib/server/user-quest/controller'
import { routeHandler } from '$lib/server/route-handler'
import type { Quests } from 'content'
import type { RequestHandler } from './$types'

export const PUT: RequestHandler = async ({ params, locals }) =>
  routeHandler(() =>
    userQuestController.completeContentRequirement(
      locals.context,
      params.questId as keyof Quests,
      locals.userId
    )
  )
