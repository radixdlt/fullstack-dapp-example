import { dbClient } from '$lib/db'
import { NotificationModel, createApiError, type ApiError, type Notification } from 'common'
import type { ControllerMethodContext, ControllerMethodOutput } from '../_types'
import { safeParse, array, number } from 'valibot'
import { ResultAsync, errAsync, okAsync } from 'neverthrow'

export const NotificationController = (notificationModel = NotificationModel(dbClient)) => {
  const validateNotificationId = (notificationIds?: unknown[]): ResultAsync<number[], ApiError> => {
    const result = safeParse(array(number()), notificationIds)

    return result.success
      ? okAsync(notificationIds as number[])
      : errAsync(createApiError('invalid notification ids', 400)())
  }

  const markAsSeen = (
    context: ControllerMethodContext,
    notificationIds: number[],
    userId: string
  ): ControllerMethodOutput<{ count: number }> =>
    validateNotificationId(notificationIds).andThen((validatedNotificationIds) =>
      notificationModel(context.logger)
        .getByUserAndNotificationIds(userId, validatedNotificationIds)
        .andThen((userNotifications) =>
          userNotifications.length === validatedNotificationIds.length
            ? notificationModel(context.logger)
                .markAsSeen(validatedNotificationIds, userId)
                .map((data) => ({
                  data,
                  httpResponseCode: 200
                }))
            : errAsync(createApiError('notification ids dont belong to user', 400)())
        )
    )

  const getUnseen = (
    context: ControllerMethodContext,
    userId: string
  ): ControllerMethodOutput<Omit<Notification, 'traceId'>[]> =>
    notificationModel(context.logger)
      .getAllUnseen(userId)
      .map((notificatons) => ({
        data: notificatons.map(({ data, id }) => ({
          ...(data as Omit<Notification, 'traceId'>),
          notificationId: id
        })),
        httpResponseCode: 200
      }))

  return { markAsSeen, getUnseen }
}

export const notificationController = NotificationController()
