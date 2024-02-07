import type { RequestHandler } from './$types'
import { error, json } from '@sveltejs/kit'
import { authController } from '$lib/server/auth/controller'

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ locals }) => {
  const result = await authController.createChallenge(locals.context)

  if (result.isErr()) {
    locals.context.logger.error(result.error)
    error(result.error.httpResponseCode, result.error.reason)
  }

  return json(result.value.data, { status: result.value.httpResponseCode })
}
