import { config } from '$lib/config'
import type { RequestHandler } from './$types'
import { error, json } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request, cookies, locals }) => {
  const requestBody = await request.json()

  if (config.dapp.maxUserPerIp != 0) {
    const preventFraudResult = await locals.controllers.authController.preventFraud(locals.clientIp)

    if (preventFraudResult.isErr())
      error(preventFraudResult.error.httpResponseCode, preventFraudResult.error.reason)
  }

  const result = await locals.controllers.authController.login(locals.context, requestBody, cookies)

  if (result.isErr()) error(result.error.httpResponseCode, result.error.reason)

  const { authToken, headers } = result.value.data

  return json(
    { authToken },
    {
      status: result.value.httpResponseCode,
      headers
    }
  )
}
