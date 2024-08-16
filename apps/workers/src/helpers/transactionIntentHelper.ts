import { DepositGiftBoxRewardBufferQueue, TransactionJob, TransactionQueue } from 'queues'
import { ResultAsync } from 'neverthrow'
import { PrismaClient, QuestStatus } from 'database'

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
        if (data.type === 'DepositGiftBoxesReward') {
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

  const countQuestTogetherReferrals = (userId: string) =>
    ResultAsync.fromPromise(
      dbClient.user.findFirst({
        where: {
          id: userId ?? ''
        },
        include: {
          referredUsers: {
            where: {
              questProgress: {
                some: {
                  AND: [
                    // TODO: update to 'CreateRadmorphs'
                    { questId: 'TransferTokens' },
                    {
                      OR: [
                        { status: QuestStatus.REWARDS_CLAIMED },
                        { status: QuestStatus.COMPLETED }
                      ]
                    }
                  ]
                }
              }
            }
          }
        }
      }),
      (error) => ({ reason: 'FailedToCountQuestTogetherReferrals', jsError: error })
    ).map((user) => user?.referredUsers?.length ?? 0)

  return { add, countQuestTogetherReferrals }
}
