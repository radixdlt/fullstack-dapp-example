import { error, json } from '@sveltejs/kit'
import type { ApiError } from 'common'
import { ResultAsync } from 'neverthrow'

export type ControllerMethodOutput<T = any> = ResultAsync<
  { data: T; httpResponseCode: number },
  ApiError
>

export const routeHandler = async (controllerCall: () => ControllerMethodOutput<unknown>) => {
  const result = await controllerCall()

  if (result.isErr()) {
    return error(result.error.httpResponseCode, result.error.reason)
  }

  return json(result.value.data || {}, { status: 200 })
}
