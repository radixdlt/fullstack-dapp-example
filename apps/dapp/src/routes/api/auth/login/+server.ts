import type { RequestHandler } from './$types'
import { error, json } from '@sveltejs/kit'
import { authController } from '$lib/server/auth/controller'

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request, cookies, locals }) => {
  const requestBody = await request.json()
  const result = await authController.login(locals.context, requestBody, cookies)

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
