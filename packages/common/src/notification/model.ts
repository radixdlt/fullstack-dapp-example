import { PrismaClient } from 'database'
import { ResultAsync } from 'neverthrow'
import { createApiError } from '../helpers/create-api-error'
import type { AppLogger } from '../helpers'

export type NotificationModel = ReturnType<typeof NotificationModel>

export type NotificationModelMethods = ReturnType<NotificationModel>

export const NotificationModel = (db: PrismaClient) => (logger?: AppLogger) => {
  const add = (userId: string, notificationId: string) => {
    return ResultAsync.fromPromise(
      db.notification.create({
        data: {
          userId,
          notificationId
        }
      }),
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

  const markAsSeen = (notificationId: string, userId: string) => {
    const seenAt = new Date()
    return ResultAsync.fromPromise(
      db.notification.upsert({
        where: {
          notificationId_userId: {
            notificationId,
            userId
          }
        },
        update: {
          seenAt
        },
        create: {
          notificationId,
          userId,
          seenAt
        }
      }),
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
    getAllUnseen
  }
}
