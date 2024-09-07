import { PrismaClient } from 'database'
import { ResultAsync } from 'neverthrow'
import { createApiError } from '../helpers/create-api-error'
import type { AppLogger } from '../helpers'

export type NotificationModel = ReturnType<typeof NotificationModel>

export type NotificationModelMethods = ReturnType<NotificationModel>

export const NotificationModel = (db: PrismaClient) => (logger?: AppLogger) => {
  const add = (userId: string, notificationId: string) => {
    return ResultAsync.fromPromise(
      (async () => {
        const notifications = await db.notification.count({
          where: {
            userId,
            notificationId
          }
        })

        if (notifications > 0) return

        return db.notification.create({
          data: {
            userId,
            notificationId
          }
        })
      })(),
      (error) => {
        logger?.error({
          error,
          method: 'add',
          model: 'NotificationModel',
          data: {
            userId,
            notificationId
          }
        })
        return createApiError('failed to add notification', 400)()
      }
    )
  }

  const getAllUnseen = (userId: string) =>
    ResultAsync.fromPromise(
      db.notification.findMany({
        where: {
          userId,
          seenAt: null
        }
      }),
      (error) => {
        logger?.error({ error, method: 'getAllUnseen', model: 'NotificationModel' })
        return createApiError('failed to get unseen notifications', 400)()
      }
    )

  const hasSeenNotification = (userId: string, notificationId: string) =>
    ResultAsync.fromPromise(
      db.notification.count({
        where: {
          userId,
          notificationId,
          NOT: {
            seenAt: null
          }
        }
      }),
      (error) => {
        logger?.error({
          error,
          method: 'getSeen',
          model: 'NotificationModel',
          data: { notificationId, userId }
        })
        return createApiError('failed to get seen notification', 400)()
      }
    ).map((count) => count > 0)

  const markAsSeen = (notificationId: string, userId: string) => {
    const seenAt = new Date()

    return ResultAsync.fromPromise(
      (async () => {
        const notifications = await db.notification.count({
          where: {
            userId,
            notificationId,
            seenAt: null
          }
        })

        if (notifications === 0) return

        return db.notification.update({
          where: {
            notificationId_userId: {
              notificationId,
              userId
            }
          },
          data: {
            seenAt
          }
        })
      })(),
      (error) => {
        logger?.error({
          error,
          method: 'markAsSeen',
          model: 'NotificationModel',
          data: { notificationId, userId }
        })
        return createApiError('failed to mark notification as seen', 400)()
      }
    )
  }

  return {
    add,
    markAsSeen,
    getAllUnseen,
    hasSeenNotification
  }
}
