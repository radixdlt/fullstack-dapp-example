import { userController } from '$lib/server/user/controller'
import type { RequestHandler } from './$types'
import { routeHandler } from '$lib/server/route-handler'
import { createApiError } from 'common'
import { errAsync } from 'neverthrow'

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ locals }) =>
  routeHandler(() => userController.getUser(locals.context, locals.userId))

/** @type {import('./$types').RequestHandler} */
export const PUT: RequestHandler = async ({ locals, request, url }) => {
  const field = url.searchParams.get('value')
  const requestBody = await request.json()

  return routeHandler(() => {
    if (field === 'accountAddress')
      return userController.setAccountAddress(
        locals.context,
        locals.userId,
        requestBody.accountAddress,
        requestBody.proof
      )
    if (field === 'name')
      return userController.setUserName(locals.context, locals.userId, requestBody.name)

    return errAsync(createApiError(`invalid search param value: ${field}`, 400)())
  })
}
