import { routeHandler } from '$lib/server/route-handler'
import { userQuestController } from '$lib/server/user-quest/controller'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ locals, params, request }) => {
  const requestBody = await request.json()
  return routeHandler(() =>
    userQuestController.addTrackedAccountAddress(
      params.questId,
      locals.userId,
      requestBody.accountAddress
    )
  )
}
