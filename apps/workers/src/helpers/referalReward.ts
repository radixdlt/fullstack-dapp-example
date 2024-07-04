import { PrismaClient, ReferralAction } from 'database'
import { ResultAsync } from 'neverthrow'
import { WorkerError } from '../_types'

export type ReferralRewardAction = ReturnType<typeof ReferralRewardAction>
export const ReferralRewardAction =
  (dbClient: PrismaClient) =>
  ({
    transactionId,
    userId,
    xrdValue,
    action
  }: {
    transactionId: string
    userId: string
    xrdValue: number
    action: ReferralAction
  }) =>
    ResultAsync.fromPromise(
      dbClient.referral.upsert({
        where: {
          eventId: transactionId,
          userId
        },
        create: {
          action,
          eventId: transactionId,
          userId,
          xrdValue
        },
        update: {}
      }),
      (error) => ({ reason: WorkerError.FailedToUpdateReferralReward, jsError: error })
    ).map(() => undefined)
