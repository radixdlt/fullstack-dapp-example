import { dbClient } from '$lib/db'
import { MessageModel, createApiError, type ApiError, type Message } from 'common'
import type { ControllerMethodContext, ControllerMethodOutput } from '../_types'
import { safeParse, array, number } from 'valibot'
import { ResultAsync, errAsync, okAsync } from 'neverthrow'

export const MessageController = (messageModel = MessageModel(dbClient)) => {
  const validateMessageId = (messageIds?: unknown[]): ResultAsync<number[], ApiError> => {
    const result = safeParse(array(number()), messageIds)

    return result.success
      ? okAsync(messageIds as number[])
      : errAsync(createApiError('invalid message ids', 400)())
  }

  const markAsSeen = (
    context: ControllerMethodContext,
    messageIds: number[],
    userId: string
  ): ControllerMethodOutput<{ count: number }> =>
    validateMessageId(messageIds).andThen((validatedMessageIds) =>
      messageModel(context.logger)
        .getByUserAndMessageIds(userId, validatedMessageIds)
        .andThen((userMessages) =>
          userMessages.length === validatedMessageIds.length
            ? messageModel(context.logger)
                .markAsSeen(validatedMessageIds, userId)
                .map((data) => ({
                  data,
                  httpResponseCode: 200
                }))
            : errAsync(createApiError('message ids dont belong to user', 400)())
        )
    )

  const getUnseen = (
    context: ControllerMethodContext,
    userId: string
  ): ControllerMethodOutput<Omit<Message, 'traceId'>[]> =>
    messageModel(context.logger)
      .getAllUnseen(userId)
      .map((notificatons) => ({
        data: notificatons.map(({ data, id }) => ({
          ...(data as Omit<Message, 'traceId'>),
          notificationId: id
        })),
        httpResponseCode: 200
      }))

  return { markAsSeen, getUnseen }
}

export const messageController = MessageController()
