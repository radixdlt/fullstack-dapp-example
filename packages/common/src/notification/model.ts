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

  const getByUserAndNotificationIds = (userId: string, notificationIds: number[]) =>
    ResultAsync.fromPromise(
      db.notification.findMany({
        where: {
          userId,
          id: {
            in: notificationIds
          }
        }
      }),
      (error) => {
        logger?.error({ error, method: 'getByUserAndNotificationIds', model: 'NotificationModel' })
        return createApiError('failed to get user notifications by ids', 400)()
      }
    )

  const markAsSeen = (ids: number[], userId: string) =>
    ResultAsync.fromPromise(
      db.notification.updateMany({
        where: {
          id: {
            in: ids
          },
          userId,
          seenAt: null
        },
        data: {
          seenAt: new Date()
        }
      }),
      (error) => {
        logger?.error({ error, method: 'markAsSeen', model: 'NotificationModel' })
        return createApiError('failed to mark notification as seen', 400)()
      }
    )

  return {
    add,
    markAsSeen,
    getAllUnseen,
    getByUserAndNotificationIds
  }
}
