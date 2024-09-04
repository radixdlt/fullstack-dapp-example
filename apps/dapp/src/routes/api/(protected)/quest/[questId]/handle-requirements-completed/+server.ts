import type { RequestHandler } from './$types'

import { routeHandler } from '$lib/server/route-handler'
import type { Quests } from 'content'

export const GET: RequestHandler = async ({ params, locals }) =>
  routeHandler(() =>
    locals.controllers.userQuestController.handleAllRequirementsCompleted({
      userId: locals.userId,
      questId: params.questId as keyof Quests,
      traceId: locals.context.traceId
    })
  )
