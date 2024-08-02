import type { RequestHandler } from './$types'
import { routeHandler } from '$lib/server/route-handler'
import { config } from '$lib/config'
import { error } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request, locals }) => {
  const requestBody = await request.json()

  if (config.dapp.maxUserPerIp !== 0) {
    const preventFraudResult = await locals.controllers.authController.preventFraud(locals.clientIp)

    if (preventFraudResult.isErr()) {
      return error(preventFraudResult.error.httpResponseCode, preventFraudResult.error.reason)
    }
  }

  return routeHandler(() =>
    locals.controllers.oneTimePasswordController.verifyOneTimePassword(
      locals.userId,
      requestBody.phoneNumber,
      requestBody.oneTimePassword,
      locals.clientIp
    )
  )
}
