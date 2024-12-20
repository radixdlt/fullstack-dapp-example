import { createApiError, type ApiError, type Message } from 'common'
import type { ControllerDependencies, ControllerMethodOutput } from '../_types'
import { safeParse, array, number } from 'valibot'
import { ResultAsync, errAsync, okAsync } from 'neverthrow'

export type MessageController = ReturnType<typeof MessageController>
export const MessageController = ({ messageModel }: ControllerDependencies) => {
  const validateMessageId = (messageIds?: unknown[]): ResultAsync<number[], ApiError> => {
    const result = safeParse(array(number()), messageIds)

    return result.success
      ? okAsync(messageIds as number[])
      : errAsync(createApiError('invalid message ids', 400)())
  }

  const markAsSeen = (
    messageIds: number[],
    userId: string
  ): ControllerMethodOutput<{ count: number }> =>
    validateMessageId(messageIds).andThen((validatedMessageIds) =>
      messageModel.getByUserAndMessageIds(userId, validatedMessageIds).andThen((userMessages) =>
        userMessages.length === validatedMessageIds.length
          ? messageModel.markAsSeen(validatedMessageIds, userId).map((data) => ({
              data,
              httpResponseCode: 200
            }))
          : errAsync(createApiError('message ids dont belong to user', 400)())
      )
    )

  const getUnseen = (userId: string): ControllerMethodOutput<Message[]> =>
    messageModel
      .getAllUnseen(userId)
      .map((messages) =>
        messages.map(({ data, id }) => {
          const value = data as Message
          return { ...value, id } satisfies Message & { id: number }
        })
      )
      .map((messages) => ({ data: messages, httpResponseCode: 200 }))

  return { markAsSeen, getUnseen }
}
