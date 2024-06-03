import { fetchWrapper } from '$lib/helpers/fetch-wrapper'
import type { Message } from 'common'

const getAll = () =>
  fetchWrapper<Message[], { message: string }>(fetch('/api/message')).map(({ data }) => data)

const markAsSeen = (ids: number | number[]) =>
  fetchWrapper<void, { message: string }>(
    fetch(`/api/message/seen`, {
      method: 'POST',
      body: JSON.stringify({
        messageIds: Array.isArray(ids) ? ids : [ids]
      })
    })
  ).map(({ data }) => data)

export type MessageApi = typeof messageApi
export const messageApi = {
  getAll,
  markAsSeen
} as const
