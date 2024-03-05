import type { RequestHandler } from './$types'
import { oneTimePasswordController } from '$lib/server/otp/controller'
import { routeHandler } from '$lib/server/route-handler'

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request, locals }) => {
  const requestBody = await request.json()

  return routeHandler(() =>
    oneTimePasswordController.verifyOneTimePassword(
      locals.context,
      locals.userId,
      requestBody.phoneNumber,
      requestBody.oneTimePassword
    )
  )
}
