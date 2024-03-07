import { routeHandler } from '$lib/server/route-handler'
import { oneTimePasswordController } from '$lib/server/otp/controller'
import type { RequestHandler } from './$types'

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request, locals }) => {
  const requestBody = await request.json()

  return routeHandler(() =>
    oneTimePasswordController.sendOneTimePassword(locals.context, requestBody.phoneNumber)
  )
}
