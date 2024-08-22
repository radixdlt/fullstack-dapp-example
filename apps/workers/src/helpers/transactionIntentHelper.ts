import { getQueues, TransactionJob } from 'queues'
import { ResultAsync } from 'neverthrow'
import { PrismaClient, QuestStatus } from 'database'
import { QuestTogetherConfig, WorkerError } from 'common'

export type TransactionIntentHelper = ReturnType<typeof TransactionIntentHelper>
export const TransactionIntentHelper = ({
  dbClient,
  queues
}: {
  dbClient: PrismaClient
  queues: ReturnType<typeof getQueues>
}) => {
  const add = ({
    discriminator,
    userId,
    ...data
  }: TransactionJob): ResultAsync<
    void,
    {
      reason: WorkerError
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
      (error) => ({ reason: WorkerError.FailedToUpsertTransactionIntent, jsError: error })
    )
      .andThen(() => {
        if (data.type === 'DepositGiftBoxesReward') {
          return queues.DepositGiftBoxReward.buffer
            .add([{ ...data, discriminator, userId }])
            .mapErr((error) => ({
              reason: WorkerError.FailedToAddJobToDepositGiftBoxRewardBufferQueue,
              jsError: error
            }))
        }

        return queues.Transaction.add([{ ...data, discriminator, userId }]).mapErr((error) => ({
          reason: WorkerError.FailedToAddJobToTransactionQueue,
          jsError: error
        }))
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
                    { questId: QuestTogetherConfig.triggerRewardAfterQuest },
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
      (error) => ({ reason: WorkerError.FailedToCountQuestTogetherReferrals, jsError: error })
    ).map((user) => user?.referredUsers?.length ?? 0)

  return { add, countQuestTogetherReferrals }
}
