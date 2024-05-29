import { fetchWrapper } from '$lib/helpers/fetch-wrapper'
import type { Message } from 'common'

export type MessageApi = { messageId: number } & Omit<Message, 'traceId'>

const getAll = () =>
  fetchWrapper<MessageApi, { message: string }>(fetch('/api/message')).map(({ data }) => data)

const markAsSeen = (ids: number | number[]) =>
  fetchWrapper<void, { message: string }>(
    fetch(`/api/message/seen`, {
      method: 'POST',
      body: JSON.stringify({
        messageIds: Array.isArray(ids) ? ids : [ids]
      })
    })
  ).map(({ data }) => data)

export const messageApi = {
  getAll,
  markAsSeen
} as const
