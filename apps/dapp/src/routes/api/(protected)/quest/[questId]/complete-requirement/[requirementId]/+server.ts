import { userQuestController } from '$lib/server/user-quest/controller'
import { routeHandler } from '$lib/server/route-handler'
import type { Quests } from 'content'
import type { RequestHandler } from './$types'

export const PUT: RequestHandler = async ({ params, locals }) =>
  routeHandler(() =>
    userQuestController.completeRequirement(
      locals.context,
      params.questId as keyof Quests,
      params.requirementId as string,
      locals.userId
    )
  )
