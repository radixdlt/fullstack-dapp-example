import { userController } from '$lib/server/user/controller'
import { error, json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request, locals }) => {
  const { accountAddress }: { accountAddress: string } = await request.json()

  const result = await userController.mintUserBadge({ userId: locals.userId, accountAddress })

  if (result.isErr()) {
    throw error(result.error.httpResponseCode, result.error.reason)
  }

  return json(
    {},
    {
      status: result.value.httpResponseCode
    }
  )
}
