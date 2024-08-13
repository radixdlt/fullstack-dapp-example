import { ResultAsync } from 'neverthrow'
import { WorkerError, WorkerOutputError } from '../_types'
import { PrismaClient } from 'database'

export const UpsertSubmittedTransaction =
  (discriminator: string, dbClient: PrismaClient) =>
  (
    transactionId: string,
    status: 'PENDING' | 'COMPLETED' | 'FAILED'
  ): ResultAsync<any, WorkerOutputError> =>
    ResultAsync.fromPromise(
      dbClient.submittedTransaction.upsert({
        create: { transactionId, transactionIntent: discriminator, status },
        update: { status },
        where: { transactionId, transactionIntent: discriminator }
      }),
      (error) => ({ reason: WorkerError.FailedToUpdateSubmittedTransaction, jsError: error })
    ).map(() => undefined)

export const UpsertSubmittedTransactions =
  (discriminators: string[], dbClient: PrismaClient) =>
  (transactionId: string, status: 'PENDING' | 'COMPLETED' | 'FAILED') =>
    ResultAsync.fromPromise(
      dbClient.submittedTransaction
        .count({ where: { transactionId: `${transactionId}:0` } })
        .then((count) => {
          if (count === 0) {
            return dbClient.submittedTransaction.createMany({
              data: discriminators.map((discriminator, index) => ({
                transactionId: `${transactionId}:${index}`,
                transactionIntent: discriminator,
                status
              }))
            })
          } else {
            return dbClient.submittedTransaction.updateMany({
              where: { transactionIntent: { in: discriminators } },
              data: { status }
            })
          }
        }),
      (error) => ({ reason: WorkerError.FailedToUpdateTransactionIntentStatus, jsError: error })
    ).map(() => undefined)
