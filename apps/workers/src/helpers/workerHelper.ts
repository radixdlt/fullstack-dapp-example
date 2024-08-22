import { okAsync, ResultAsync } from 'neverthrow'
import { PrismaClient } from 'database'
import { WorkerError } from '../_types'

export const WorkerHelper = (dbClient: PrismaClient) => {
  const isErrorHandled = (error: unknown) =>
    error && typeof error === 'object' && (error as any).handled ? true : false

  const noop = () => okAsync(undefined)

  const determineIfJobShouldBeProcessed = (discriminator: string) =>
    ResultAsync.fromPromise(
      dbClient.transactionIntent
        .findUnique({
          where: { discriminator, status: { notIn: ['COMPLETED', 'FAILED_PERMANENT', 'PAUSED'] } }
        })
        .then((transactionIntent) => transactionIntent?.status),
      (error) => ({ reason: WorkerError.FailedToQueryDb, jsError: error })
    )

  return { isErrorHandled, noop, determineIfJobShouldBeProcessed }
}
