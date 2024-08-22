import { okAsync } from 'neverthrow'

export const WorkerHelper = () => {
  const isErrorHandled = (error: unknown) =>
    error && typeof error === 'object' && (error as any).handled ? true : false

  const noop = () => okAsync(undefined)

  return { isErrorHandled, noop }
}
