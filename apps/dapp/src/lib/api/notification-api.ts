import { fetchWrapper } from '$lib/helpers/fetch-wrapper'
import type { Notification } from 'common'

export type ApiNotification = { notificationId: number } & Omit<Notification, 'traceId'>

const getAll = () =>
  fetchWrapper<ApiNotification, { message: string }>(fetch('/api/notification')).map(
    ({ data }) => data
  )

const markAsSeen = (ids: number | number[]) =>
  fetchWrapper<void, { message: string }>(
    fetch(`/api/notification/seen`, {
      method: 'POST',
      body: JSON.stringify({
        notificationIds: Array.isArray(ids) ? ids : [ids]
      })
    })
  ).map(({ data }) => data)

export const notificationApi = {
  getAll,
  markAsSeen
} as const
