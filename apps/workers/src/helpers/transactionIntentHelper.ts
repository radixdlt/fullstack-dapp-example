import { TransactionJob, TransactionQueue } from 'queues'
import { ResultAsync } from 'neverthrow'
import { PrismaClient } from 'database'

export type TransactionIntentHelper = ReturnType<typeof TransactionIntentHelper>
export const TransactionIntentHelper = ({
  dbClient,
  transactionQueue
}: {
  dbClient: PrismaClient
  transactionQueue: TransactionQueue
}) => {
  const add = ({
    discriminator,
    userId,
    ...data
  }: TransactionJob): ResultAsync<
    void,
    {
      reason: string
      jsError: unknown
    }
  > =>
    ResultAsync.fromPromise(
      dbClient.transactionIntent.upsert({
        where: {
          discriminator,
          userId
        },
        create: {
          discriminator,
          userId,
          data
        },
        update: {}
      }),
      (error) => ({ reason: 'FailedToAddTransactionIntentInDb', jsError: error })
    )
      .andThen(() =>
        transactionQueue
          .add({ ...data, discriminator, userId })
          .mapErr((error) => ({ reason: 'FailedToAddJobToTransactionQueue', jsError: error }))
      )
      .map(() => undefined)

  return { add }
}
