import { routeHandler } from '$lib/server/route-handler'
import type { RequestHandler } from './$types'

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request, locals }) => {
  const requestBody = await request.json()

  return routeHandler(() =>
    locals.controllers.oneTimePasswordController.sendOneTimePassword(requestBody.phoneNumber)
  )
}
