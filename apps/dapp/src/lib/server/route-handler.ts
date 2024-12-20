import { error, json } from '@sveltejs/kit'
import type { ControllerMethodOutput } from './_types'

export const routeHandler = async (controllerCall: () => ControllerMethodOutput<unknown>) => {
  const result = await controllerCall()

  if (result.isErr()) {
    return error(result.error.httpResponseCode, result.error.reason)
  }

  return json(result.value.data || {}, { status: 200 })
}
