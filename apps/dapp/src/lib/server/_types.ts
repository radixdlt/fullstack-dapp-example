/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AppLogger, ApiError } from 'common'
import type { ResultAsync } from 'neverthrow'

export type ControllerMethodOutput<T = any> = ResultAsync<
  { data: T; httpResponseCode: number },
  ApiError
>

export type ControllerMethodContext = {
  logger: AppLogger
  traceId: string
}
