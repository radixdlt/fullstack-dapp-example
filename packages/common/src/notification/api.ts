import { fetchWrapper } from '../helpers/fetch-wrapper'
import { AppLogger } from '../helpers/logger'

export const NotificationType = {
  QuestRequirementCompleted: 'QuestRequirementCompleted',
  QuestRewardsDeposited: 'QuestRewardsDeposited',
  QuestRewardsClaimed: 'QuestRewardsClaimed'
} as const

export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType]

type Notifications = {
  [NotificationType.QuestRequirementCompleted]: {
    questId: string
    requirementId: string
    traceId: string
  }
  [NotificationType.QuestRewardsDeposited]: {
    questId: string
    traceId: string
  }
  [NotificationType.QuestRewardsClaimed]: {
    questId: string
    traceId: string
  }
}

export type Notification = {
  [Key in keyof Notifications]: Notifications[Key] & { type: Key }
}[keyof Notifications]

export type NotificationApi = ReturnType<typeof NotificationApi>
export const NotificationApi = ({ baseUrl, logger }: { baseUrl: string; logger?: AppLogger }) => {
  return {
    send: (userId: string, data: Notification) =>
      fetchWrapper<undefined>(
        fetch(`${baseUrl}/api/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, data })
        })
      )
        .map(({ status }) => {
          logger?.debug({ method: 'notificationApi.send.response', data, status })
        })
        .mapErr((error) => {
          logger?.error({ method: 'notificationApi.send.error', data, error })
        })
  }
}
