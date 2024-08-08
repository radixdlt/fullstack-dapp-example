import { DepositGiftBoxRewardBufferQueue, TransactionJob, TransactionQueue } from 'queues'
import { ResultAsync } from 'neverthrow'
import { PrismaClient } from 'database'

export type TransactionIntentHelper = ReturnType<typeof TransactionIntentHelper>
export const TransactionIntentHelper = ({
  dbClient,
  transactionQueue,
  DepositGiftBoxRewardBufferQueue
}: {
  dbClient: PrismaClient
  transactionQueue: TransactionQueue
  DepositGiftBoxRewardBufferQueue: DepositGiftBoxRewardBufferQueue
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
      .andThen(() => {
        if (data.type === 'DepositGiftBoxReward') {
          return DepositGiftBoxRewardBufferQueue.addBulk([
            { ...data, discriminator, userId }
          ]).mapErr((error) => ({
            reason: 'FailedToAddJobToDepositGiftBoxRewardBufferQueue',
            jsError: error
          }))
        }

        return transactionQueue
          .add({ ...data, discriminator, userId })
          .mapErr((error) => ({ reason: 'FailedToAddJobToTransactionQueue', jsError: error }))
      })
      .map(() => undefined)

  const countQuestTogetherXrdDeposits = (userId: string) =>
    ResultAsync.fromPromise(
      dbClient.transactionIntent.count({
        where: {
          AND: [
            {
              userId
            },
            {
              discriminator: {
                startsWith: `QuestTogether:`
              }
            },
            {
              data: {
                path: ['type'],
                equals: 'DepositXrdReward'
              }
            }
          ]
        }
      }),
      (error) => ({ reason: 'FailedToCountQuestTogetherXrdDeposits', jsError: error })
    )

  return { add, countQuestTogetherXrdDeposits }
}
