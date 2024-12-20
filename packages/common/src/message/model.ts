import { PrismaClient } from 'database'
import { ResultAsync } from 'neverthrow'
import { createApiError } from '../helpers/create-api-error'
import type { AppLogger } from '../helpers'

export type MessageModel = ReturnType<typeof MessageModel>

export type MessageModelMethods = ReturnType<MessageModel>

export const MessageModel = (db: PrismaClient) => (logger?: AppLogger) => {
  const add = (userId: string, data: Record<string, any>) =>
    ResultAsync.fromPromise(
      db.message.create({
        data: {
          userId,
          data: data
        }
      }),
      (error) => {
        logger?.error({ error, method: 'add', model: 'MessageModel' })
        return createApiError('failed to add message', 400)()
      }
    )

  const getAllUnseen = (userId: string) =>
    ResultAsync.fromPromise(
      db.message.findMany({
        where: {
          userId,
          seenAt: null
        }
      }),
      (error) => {
        logger?.error({ error, method: 'getAllUnseen', model: 'MessageModel' })
        return createApiError('failed to get unseen messages', 400)()
      }
    )

  const getByUserAndMessageIds = (userId: string, messageIds: number[]) =>
    ResultAsync.fromPromise(
      db.message.findMany({
        where: {
          userId,
          id: {
            in: messageIds
          }
        }
      }),
      (error) => {
        logger?.error({ error, method: 'getByUserAndMessageIds', model: 'MessageModel' })
        return createApiError('failed to get user messages by ids', 400)()
      }
    )

  const markAsSeen = (ids: number[], userId: string) =>
    ResultAsync.fromPromise(
      db.message.updateMany({
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
        logger?.error({ error, method: 'markAsSeen', model: 'MessageModel' })
        return createApiError('failed to mark message as seen', 400)()
      }
    )

  return {
    add,
    markAsSeen,
    getAllUnseen,
    getByUserAndMessageIds
  }
}
