import { userController } from '$lib/server/user/controller'
import type { RequestHandler } from './$types'
import { routeHandler } from '$lib/server/route-handler'

/** @type {import('./$types').RequestHandler} */
export const PUT: RequestHandler = async ({ locals, params, request }) => {
  const requestBody = await request.json()

  return routeHandler(() =>
    userController.setAccountAddress(
      locals.context,
      locals.userId,
      params.account,
      requestBody.proof
    )
  )
}
