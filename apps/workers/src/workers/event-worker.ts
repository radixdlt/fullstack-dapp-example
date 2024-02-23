import { logger } from '../helpers/logger'
import { Worker, ConnectionOptions, Queues } from 'queues'
import { EventId } from 'content'
import { dbClient } from '../db-client'

export const EventWorker = (connection: ConnectionOptions) => {
  const worker = new Worker<{
    questId?: string
    transactionId: string
    userId: string
    eventId: EventId
  }>(
    Queues.EventQueue,
    async (job) => {
      logger.debug(job.data)

      const { eventId, transactionId } = job.data

      switch (eventId) {
        case 'DepositUserBadge':
          await dbClient.$transaction([
            dbClient.event.update({ where: { transactionId }, data: { processedAt: new Date() } }),
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
