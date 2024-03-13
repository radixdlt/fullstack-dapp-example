import type { RequestHandler } from './$types'

import { userQuestController } from '$lib/server/user-quest/controller'
import { routeHandler } from '$lib/server/route-handler'
import type { Quests } from 'content'

export const GET: RequestHandler = async ({ params, locals }) =>
  routeHandler(() =>
    userQuestController.completeQuest(locals.context, locals.userId, params.questId as keyof Quests)
  )
