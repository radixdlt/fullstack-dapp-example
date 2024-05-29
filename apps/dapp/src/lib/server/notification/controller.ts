import { dbClient } from '$lib/db'
import { NotificationModel } from 'common'
import type { ControllerMethodContext } from '../_types'

export const NotificationController = (notificationModel = NotificationModel(dbClient)) => {
  const markAsSeen = (context: ControllerMethodContext, notificationId: string, userId: string) =>
    notificationModel(context.logger)
      .markAsSeen(notificationId, userId)
      .map((data) => ({
        data,
        httpResponseCode: 200
      }))

  const getUnseen = (context: ControllerMethodContext, userId: string) =>
    notificationModel(context.logger)
      .getAllUnseen(userId)
      .map((notificatons) => ({
        data: notificatons,
        httpResponseCode: 200
      }))

  const create = (context: ControllerMethodContext, userId: string, notificationId: string) =>
    notificationModel(context.logger)
      .add(userId, notificationId)
      .map((data) => ({
        data,
        httpResponseCode: 200
      }))

  return { markAsSeen, getUnseen, create }
}

export const notificationController = NotificationController()
