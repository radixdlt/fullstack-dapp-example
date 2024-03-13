import { ResultAsync, okAsync } from 'neverthrow'
import { EventJob, Job, TransactionQueue } from 'queues'
import type { AppLogger, NotificationModel, UserQuestModel } from 'common'
import { NotificationApi, NotificationType } from 'common'
import { QuestDefinitions } from 'content'
import { config } from '../config'

export type EventWorkerController = ReturnType<typeof EventWorkerController>
export const EventWorkerController = ({
  notificationApi,
  userQuestModel,
  notificationModel,
  logger,
  transactionQueue
}: {
  notificationApi: NotificationApi
  userQuestModel: UserQuestModel
  notificationModel: NotificationModel
  logger: AppLogger
  transactionQueue: TransactionQueue
}) => {
  const hasAllRequirements = (childLogger: AppLogger, questId: string, userId: string) => {
    const questDefinition = QuestDefinitions(config.networkId)[questId]
    const requirements = Object.keys(questDefinition.requirements)
    return userQuestModel(childLogger)
      .findCompletedRequirements(userId, questId)
      .map((completedRequirements) => completedRequirements.length === requirements.length)
  }

  const handler = (job: Job<EventJob>) => {
    const { eventId, transactionId, traceId } = job.data

    const childLogger = logger.child({ traceId, transactionId, eventId })

    switch (eventId) {
      case 'RewardDepositedEvent':
        ResultAsync.combine([
          userQuestModel(childLogger).updateQuestStatus(
            job.data.questId!,
            job.data.userId,
            'REWARDS_DEPOSITED'
          ),
          notificationModel(childLogger).add(job.data.userId, {
            type: 'QuestRewardsDeposited',
            questId: job.data.questId
          })
        ]).andThen(() =>
          notificationApi.send(job.data.userId, {
            type: 'QuestRewardsDeposited',
            questId: job.data.questId!,
            traceId: job.data.traceId
          })
        )
        break
      case 'RewardClaimedEvent':
        ResultAsync.combine([
          userQuestModel(childLogger).updateQuestStatus(
            job.data.questId!,
            job.data.userId,
            'REWARDS_CLAIMED'
          ),
          notificationModel(childLogger).add(job.data.userId, {
            type: 'QuestRewardsDeposited',
            questId: job.data.questId
          })
        ]).andThen(() =>
          notificationApi.send(job.data.userId, {
            type: 'QuestRewardsClaimed',
            questId: job.data.questId!,
            traceId: job.data.traceId
          })
        )

        break
      case 'DepositUserBadge':
        ResultAsync.combine([
          userQuestModel(childLogger).addCompletedRequirement(
            job.data.questId!,
            job.data.userId,
            job.data.eventId
          ),
          notificationModel(childLogger).add(job.data.userId, {
            type: 'QuestRequirementCompleted',
            questId: job.data.questId,
            requirementId: job.data.eventId
          })
        ]).andThen(() =>
          ResultAsync.combineWithAllErrors([
            hasAllRequirements(childLogger, job.data.questId!, job.data.userId).andThen((hasAll) =>
              hasAll
                ? transactionQueue.add({
                    type: 'DepositReward',
                    userId: job.data.userId,
                    questId: job.data.questId!,
                    traceId: job.data.traceId
                  })
                : okAsync('')
            ),
            notificationApi.send(job.data.userId, {
              type: NotificationType.QuestRequirementCompleted,
              questId: job.data.questId!,
              requirementId: 'DepositUserBadge',
              traceId: job.data.traceId
            })
          ])
        )
        break

      default:
        logger.warn({
          method: 'eventWorker.handler',
          eventId,
          transactionId,
          traceId,
          message: 'Unhandled Event'
        })
        break
    }
  }

  return { handler }
}
