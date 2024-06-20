import type { RequestHandler } from './$types'
import { dbClient } from '$lib/db'
import { error, json } from '@sveltejs/kit'
import { isDevEnvironment } from '$lib/helpers/is-dev-environment'
import { authController } from '$lib/server/auth/controller'

export const POST: RequestHandler = async ({ locals, cookies }) => {
  if (!isDevEnvironment()) return json({}, { status: 403 })

  await dbClient.user.update({ data: { type: 'ADMIN' }, where: { id: locals.userId } })

  const result = authController.createRefreshTokenCookie(locals.userId, 'ADMIN', cookies)

  if (result.isErr()) error(500, 'FailedToCreateRefreshTokenCookie')

  return json(
    {},
    {
      status: 200,
      headers: result.value
    }
  )
}
