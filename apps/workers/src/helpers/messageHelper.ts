import { PrismaClient } from 'database'
import { ResultAsync, ok } from 'neverthrow'
import { WorkerError, WorkerOutputError } from '../_types'
import { MessageApi, Message, AppLogger } from 'common'

export type MessageHelper = ReturnType<typeof MessageHelper>
export const MessageHelper =
  ({ dbClient, messageApi }: { dbClient: PrismaClient; messageApi: MessageApi }) =>
  (
    userId: string,
    message: Message,
    logger?: AppLogger
  ): ResultAsync<undefined, WorkerOutputError> =>
    ResultAsync.fromPromise(
      dbClient.message.create({
        data: {
          userId,
          data: message
        }
      }),
      (error): WorkerOutputError => {
        return {
          reason: WorkerError.FailedToCreateMessageInDb,
          jsError: {
            prismaError: error as Error,
            data: {
              userId,
              data: message
            }
          }
        }
      }
    )
      .andThen(({ id }) =>
        messageApi.send(userId, message, id).orElse((error) => {
          logger?.error({ method: 'messageApi.send.error', error })
          return ok(undefined)
        })
      )
      .map(() => undefined)
