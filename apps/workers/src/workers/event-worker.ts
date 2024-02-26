import { logger } from '../helpers/logger'
import { Worker, ConnectionOptions, Queues } from 'queues'
import { EventId } from 'content'
import { dbClient } from '../db-client'
import { NotificationApi, NotificationType, Notification } from 'common'
import { Logger } from 'pino'

export const EventWorker = (
  connection: ConnectionOptions,
  dependencies: {
    notificationApi: NotificationApi
    logger: Logger<never>
  }
) => {
  const { notificationApi, logger } = dependencies
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

      const { eventId, transactionId } = job.data

      switch (eventId) {
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
              })
            ])

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
    logger.debug(`${job.id} has completed!`)
  })

  return worker
}
