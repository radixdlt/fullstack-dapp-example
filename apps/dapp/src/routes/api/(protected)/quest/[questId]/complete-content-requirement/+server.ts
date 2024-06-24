import { routeHandler } from '$lib/server/route-handler'
import type { Quests } from 'content'
import type { RequestHandler } from './$types'

export const PUT: RequestHandler = async ({ params, locals }) =>
  routeHandler(() =>
    locals.controllers.userQuestController.completeContentRequirement(
      params.questId as keyof Quests,
      locals.userId
    )
  )
