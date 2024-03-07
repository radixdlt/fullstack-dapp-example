import { ResultAsync, okAsync } from 'neverthrow'
import { EventJob, Job, TransactionQueue } from 'queues'
import type { AppLogger } from 'common'
import {
  NotificationApi,
  UserQuestModelMethods,
  NotificationModelMethods,
  NotificationType
} from 'common'
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
  userQuestModel: UserQuestModelMethods
  notificationModel: NotificationModelMethods
  logger: AppLogger
  transactionQueue: TransactionQueue
}) => {
  const hasAllRequirements = (questId: string, userId: string) => {
    const questDefinition = QuestDefinitions(config.networkId)[questId]
    const requirements = Object.keys(questDefinition.requirements)
    return userQuestModel
      .findCompletedRequirements(userId, questId)
      .map((completedRequirements) => completedRequirements.length === requirements.length)
  }

  const handler = (job: Job<EventJob>) => {
    const { eventId, transactionId, traceId } = job.data

    switch (eventId) {
      case 'RewardDepositedEvent':
        ResultAsync.combine([
          userQuestModel.updateQuestStatus(job.data.questId!, job.data.userId, 'REWARDS_DEPOSITED'),
          notificationModel.add(job.data.userId, {
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
          userQuestModel.updateQuestStatus(job.data.questId!, job.data.userId, 'REWARDS_CLAIMED'),
          notificationModel.add(job.data.userId, {
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
          userQuestModel.addCompletedRequirement(
            job.data.questId!,
            job.data.userId,
            job.data.eventId
          ),
          notificationModel.add(job.data.userId, {
            type: 'QuestRequirementCompleted',
            questId: job.data.questId,
            requirementId: job.data.eventId
          })
        ])
          .andThen(() => hasAllRequirements(job.data.questId!, job.data.userId))
          .andThen((hasAll) =>
            hasAll
              ? transactionQueue
                  .addDepositRewards({
                    userId: job.data.userId,
                    questId: job.data.questId!,
                    traceId: job.data.traceId
                  })
                  .andThen(() =>
                    notificationApi.send(job.data.userId, {
                      type: NotificationType.QuestRequirementCompleted,
                      questId: job.data.questId!,
                      requirementId: 'DepositUserBadge',
                      traceId: job.data.traceId
                    })
                  )
              : okAsync('')
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
