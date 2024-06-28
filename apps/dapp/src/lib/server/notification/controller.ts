import type { ControllerDependencies } from '../_types'

export type NotificationController = ReturnType<typeof NotificationController>
export const NotificationController = ({ notificationModel }: ControllerDependencies) => {
  const markAsSeen = (notificationId: string, userId: string) =>
    notificationModel.markAsSeen(notificationId, userId).map((data) => ({
      data,
      httpResponseCode: 200
    }))

  const getUnseen = (userId: string) =>
    notificationModel.getAllUnseen(userId).map((notificatons) => ({
      data: notificatons,
      httpResponseCode: 200
    }))

  const create = (userId: string, notificationId: string) =>
    notificationModel.add(userId, notificationId).map((data) => ({
      data,
      httpResponseCode: 200
    }))

  return { markAsSeen, getUnseen, create }
}
