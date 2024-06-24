import type { RequestHandler } from './$types'
import { routeHandler } from '$lib/server/route-handler'
import { createApiError } from 'common'
import { errAsync } from 'neverthrow'

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ locals }) =>
  routeHandler(() => locals.controllers.userController.getUser(locals.userId))

/** @type {import('./$types').RequestHandler} */
export const PUT: RequestHandler = async ({ locals, request, url }) => {
  const field = url.searchParams.get('field')
  const requestBody = await request.json()

  return routeHandler(() => {
    if (field === 'accountAddress')
      return locals.controllers.userController.setAccountAddress(
        locals.context,
        locals.userId,
        requestBody.accountAddress,
        requestBody.proof
      )
    if (field === 'name')
      return locals.controllers.userController.setUserName(
        locals.context,
        locals.userId,
        requestBody.name
      )

    return errAsync(createApiError(`invalid search param value: ${field}`, 400)())
  })
}
