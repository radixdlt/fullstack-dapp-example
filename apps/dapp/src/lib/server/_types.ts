/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AppLogger } from 'common'
import type { NumericRange } from '@sveltejs/kit'
import type { ResultAsync } from 'neverthrow'

export type ApiError = ReturnType<ReturnType<typeof createApiError>>
export const createApiError =
  (reason: string, httpResponseCode: NumericRange<400, 599>) =>
  (
    jsError?: any
  ): { jsError?: Error; httpResponseCode: NumericRange<400, 599>; reason: string } => ({
    jsError,
    httpResponseCode,
    reason
  })

export type ControllerMethodOutput<T = any> = ResultAsync<
  { data: T; httpResponseCode: number },
  ApiError
>

export type ControllerMethodContext = {
  logger: AppLogger
}
