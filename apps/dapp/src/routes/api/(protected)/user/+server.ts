import type { RequestHandler } from './$types'
import { routeHandler } from '$lib/server/route-handler'
import { createApiError } from 'common'
import { errAsync, ResultAsync } from 'neverthrow'
import type { UserFieldData } from '$lib/api/user-api'

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ locals }) =>
  routeHandler(() => locals.controllers.userController.getUser(locals.userId))

/** @type {import('./$types').RequestHandler} */
export const PUT: RequestHandler = async ({ locals, request }) => {
  const requestBody = await request.json()

  return routeHandler(() => {
    return ResultAsync.combineWithAllErrors(
      requestBody.fields.map((data: UserFieldData) => {
        if (data.field === 'accountAddress')
          return locals.controllers.userController.setAccountAddress(
            locals.userId,
            data.accountAddress,
            data.proof
          )
        if (data.field === 'name')
          return locals.controllers.userController.setUserName(locals.userId, data.name)

        if (data.field === 'email')
          return locals.controllers.userController.setEmail(
            locals.userId,
            data.email,
            data.newsletter
          )

        return errAsync(createApiError(`invalid field value: ${(data as any).field}`, 400)())
      })
    )
      .map((result) => ({ data: result, httpResponseCode: 200 }))
      .mapErr((error) => {
        locals.context.logger.error({ method: 'setUserFields.error', requestBody, error })
        return createApiError('Failed to update one or more fields', 500)(error)
      })
  })
}
