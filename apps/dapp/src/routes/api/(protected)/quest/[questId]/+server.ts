import type { RequestHandler } from './$types'
import { userQuestController } from '$lib/server/user-quest/controller'
import { routeHandler } from '$lib/server/route-handler'

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request, locals, params }) => {
  const requestBody = await request.json()
  const progress = requestBody.progress

  return routeHandler(() =>
    userQuestController.setQuestProgress(locals.context, locals.userId, params.questId, progress)
  )
}

export const GET: RequestHandler = async ({ params, locals }) =>
  routeHandler(() =>
    userQuestController.getQuestProgress(locals.context, locals.userId, params.questId)
  )
