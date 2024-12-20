import { PrismaClient, TransactionIntentStatus } from 'database'
import { ResultAsync } from 'neverthrow'
import { WorkerError, WorkerOutputError } from '../_types'

export type SetTransactionIntentStatus = ReturnType<typeof SetTransactionIntentStatus>
export const SetTransactionIntentStatus =
  (dbClient: PrismaClient) =>
  (
    { userId, discriminator }: { userId: string; discriminator: string },
    status: TransactionIntentStatus,
    error?: string
  ): ResultAsync<void, WorkerOutputError> =>
    ResultAsync.fromPromise(
      dbClient.transactionIntent.update({
        where: {
          userId,
          discriminator
        },
        data: {
          status,
          error
        }
      }),
      (error) => ({ jsError: error, reason: WorkerError.FailedToUpdateTransactionIntentStatus })
    ).map(() => undefined)
