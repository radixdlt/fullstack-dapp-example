import { userController } from '$lib/server/user/controller'
import { error, json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ locals }) => {
  const { userId } = locals
  const result = await userController.getUser(locals.context, userId)

  if (result.isErr()) {
    error(result.error.httpResponseCode, result.error.reason)
  }

  return json(result.value, { status: 200 })
}
