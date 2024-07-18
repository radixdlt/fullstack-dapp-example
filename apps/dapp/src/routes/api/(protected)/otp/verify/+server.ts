import type { RequestHandler } from './$types'
import { routeHandler } from '$lib/server/route-handler'

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request, locals }) => {
  const requestBody = await request.json()

  return routeHandler(() =>
    locals.controllers.oneTimePasswordController.verifyOneTimePassword(
      locals.userId,
      requestBody.phoneNumber,
      requestBody.oneTimePassword,
      locals.clientIp
    )
  )
}
