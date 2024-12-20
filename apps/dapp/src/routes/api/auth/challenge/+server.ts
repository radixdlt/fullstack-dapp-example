import type { RequestHandler } from './$types'
import { error, json } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ locals }) => {
  const result = await locals.controllers.authController.createChallenge(locals.context)

  if (result.isErr()) {
    locals.context.logger.error(result.error)
    error(result.error.httpResponseCode, result.error.reason)
  }

  return json(result.value.data, { status: result.value.httpResponseCode })
}
