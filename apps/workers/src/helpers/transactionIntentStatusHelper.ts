import { PrismaClient, TransactionIntentStatus } from 'database'
import { WorkerError } from '../_types'
import { ResultAsync } from 'neverthrow'

export const TransactionIntentStatusHelper = (dbClient: PrismaClient) => {
  const Single = (discriminator: string) => (status: TransactionIntentStatus, error?: string) =>
    ResultAsync.fromPromise(
      dbClient.transactionIntent.update({
        where: { discriminator },
        data: { status, error }
      }),
      (error) => ({ reason: WorkerError.FailedToUpdateTransactionIntentStatus, jsError: error })
    ).map(() => undefined)

  const Batch =
    (batchId: string, itemDiscriminators: string[]) =>
    ({ status, error }: { status: TransactionIntentStatus; error?: string }) =>
      ResultAsync.fromPromise(
        dbClient.batchedTransactionIntent.update({
          where: { id: batchId },
          data: { status, error }
        }),
        (error) => ({ reason: WorkerError.FailedToUpdateTransactionIntentStatus, jsError: error })
      )
        .andThen(() =>
          ResultAsync.fromPromise(
            dbClient.transactionIntent.updateMany({
              where: { discriminator: { in: itemDiscriminators } },
              data: { status, error }
            }),
            (error) => ({
              reason: WorkerError.FailedToUpdateTransactionIntentStatus,
              jsError: error
            })
          )
        )
        .map(() => undefined)

  return { Single, Batch }
}
