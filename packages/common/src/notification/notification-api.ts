import { fetchWrapper } from 'common'

export const NotificationType = { QuestRequirementCompleted: 'QuestRequirementCompleted' } as const

type Notifications = {
  [NotificationType.QuestRequirementCompleted]: {
    questId: string
    requirementId: string
    traceId: string
  }
}

export type Notification = {
  [Key in keyof Notifications]: Notifications[Key] & { type: Key }
}[keyof Notifications]

export type NotificationApi = ReturnType<typeof NotificationApi>
export const NotificationApi = (baseUrl: string) => {
  return {
    send: (userId: string, data: Notification) =>
      fetchWrapper<undefined>(
        fetch(`${baseUrl}/api/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, data })
        })
      )
  }
}
