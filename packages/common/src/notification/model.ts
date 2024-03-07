import { PrismaClient } from 'database'
import { ResultAsync } from 'neverthrow'
import { createApiError } from '../helpers/create-api-error'
import { AppLogger } from '../helpers'

export type NotificationModel = ReturnType<typeof NotificationModel>

export type NotificationModelMethods = ReturnType<NotificationModel>

export const NotificationModel = (db: PrismaClient) => (logger?: AppLogger) => {
  const add = (userId: string, data: Record<string, any>) =>
    ResultAsync.fromPromise(
      db.notification.create({
        data: {
          userId,
          data: data
        }
      }),
      (error) => {
        logger?.error({ error, method: 'add', model: 'NotificationModel' })
        return createApiError('failed to add notification', 400)()
      }
    )

  return {
    add
  }
}
