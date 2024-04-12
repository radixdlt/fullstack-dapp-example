import type { RequestHandler } from './$types'

import { userQuestController } from '$lib/server/user-quest/controller'
import { routeHandler } from '$lib/server/route-handler'
import type { Quests } from 'content'

export const PUT: RequestHandler = async ({ params, locals }) =>
  routeHandler(() =>
    userQuestController.completeContentRequirement(
      locals.context,
      params.questId as keyof Quests,
      locals.userId,
      params.requirement
    )
  )
