import { PrismaClient } from 'database'
import { WorkerError, WorkerOutputError } from '../_types'
import { ResultAsync } from 'neverthrow'

export type GetLastSubmittedTransaction = ReturnType<typeof GetLastSubmittedTransaction>
export const GetLastSubmittedTransaction =
  (dbClient: PrismaClient, transformTransactionId?: (id: string) => string) =>
  (
    discriminator: string
  ): ResultAsync<
    | {
        transactionId: string
        status: 'PENDING' | 'COMPLETED' | 'FAILED'
      }
    | undefined,
    WorkerOutputError
  > =>
    ResultAsync.fromPromise(
      dbClient.submittedTransaction.findFirst({
        select: { transactionId: true, status: true },
        where: {
          transactionIntent: discriminator
        },
        orderBy: { createdAt: 'desc' }
      }),
      (error) => ({ reason: WorkerError.FailedToGetSubmittedTransactions, jsError: error })
    ).map((transaction) =>
      transaction
        ? {
            transactionId: transformTransactionId
              ? transformTransactionId(transaction.transactionId)
              : transaction.transactionId,
            status: transaction.status as 'PENDING' | 'COMPLETED' | 'FAILED'
          }
        : undefined
    )
