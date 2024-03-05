import { logger } from '../helpers/logger'
import { Worker, ConnectionOptions, Queues, getQueues } from 'queues'
import { EventId, QuestDefinitions } from 'content'
import { dbClient } from '../db-client'
import { NotificationApi, NotificationType, Notification } from 'common'
import { Logger } from 'pino'
import { config } from '../config'

const hasAllRequirements = async (
  questId: string | undefined,
  userId: string
): Promise<boolean> => {
  if (!questId || !userId) {
    logger.error({ method: 'hasAllRequirements', questId, userId })
    return false
  }
  const questDefinition = QuestDefinitions(config.networkId)[questId]
  const requirements = Object.keys(questDefinition.requirements)
  const completedRequirements = await dbClient.completedQuestRequirement.findMany({
    where: {
      userId,
      questId,
      requirementId: { in: requirements }
    }
  })

  logger.debug({ method: 'hasAllRequirements', questId, userId, completedRequirements })

  if (completedRequirements.length === requirements.length) {
    return true
  }

  return false
}

export const EventWorker = (
  connection: ConnectionOptions,
  dependencies: {
    notificationApi: NotificationApi
    transactionQueue: ReturnType<typeof getQueues>['transactionQueue']
    logger: Logger<never>
  }
) => {
  const { notificationApi, logger, transactionQueue } = dependencies
  const worker = new Worker<{
    questId?: string
    transactionId: string
    userId: string
    eventId: EventId
    traceId: string
  }>(
    Queues.EventQueue,
    async (job) => {
      logger.debug({ method: 'eventWorker.process', id: job.id, data: job.data })

      const { eventId, transactionId, traceId } = job.data

      switch (eventId) {
        case 'RewardDepositedEvent':
          await dbClient.questProgress.update({
            where: {
              questId_userId: {
                userId: job.data.userId,
                questId: job.data.questId!
              }
            },
            data: {
              status: 'REWARDS_DEPOSITED'
            }
          })
          notificationApi.send(job.data.userId, {
            type: 'QuestRewardsDeposited',
            questId: job.data.questId!,
            traceId: job.data.traceId
          })
          break
        case 'RewardClaimedEvent':
          await dbClient.questProgress.update({
            where: {
              questId_userId: {
                userId: job.data.userId,
                questId: job.data.questId!
              }
            },
            data: {
              status: 'REWARDS_CLAIMED'
            }
          })
          notificationApi.send(job.data.userId, {
            type: 'QuestRewardsClaimed',
            questId: job.data.questId!,
            traceId: job.data.traceId
          })
          break
        case 'DepositUserBadge':
          {
            await dbClient.$transaction([
              dbClient.event.update({
                where: { transactionId },
                data: { processedAt: new Date() }
              }),
              dbClient.notification.create({
                data: {
                  userId: job.data.userId,
                  data: {
                    type: 'QuestRequirementCompleted',
                    questId: job.data.questId,
                    requirementId: job.data.eventId
                  }
                }
              }),
              dbClient.completedQuestRequirement.create({
                data: {
                  userId: job.data.userId,
                  questId: job.data.questId!,
                  requirementId: job.data.eventId
                }
              })
            ])

            try {
              const hasAll = await hasAllRequirements(job.data.questId, job.data.userId)

              if (hasAll) {
                transactionQueue.addDepositRewards({
                  userId: job.data.userId,
                  questId: job.data.questId!,
                  traceId: job.data.traceId
                })
              }
            } catch (error) {
              logger.error({
                method: 'eventWorker.checkingRequirements',
                id: job.id,
                data: job.data,
                error
              })
            }

            const notification: Notification = {
              type: NotificationType.QuestRequirementCompleted,
              questId: job.data.questId!,
              requirementId: 'DepositUserBadge',
              traceId: job.data.traceId
            }
            await notificationApi
              .send(job.data.userId, notification)
              .map(({ status }) => {
                logger.debug({ method: 'notificationApi.send.response', notification, status })
              })
              .mapErr((error) => {
                logger.error({ method: 'notificationApi.send.error', notification, error })
              })
          }
          break

        default:
          break
      }
    },
    { connection }
  )

  worker.on('completed', (job) => {
    logger.debug({
      method: 'eventWorker.completed',
      id: job.id,
      data: job.data,
      traceId: job.data.traceId
    })
  })

  return worker
}
