import { PrismaClient } from 'database'
import { ResultAsync, ok } from 'neverthrow'
import { WorkerError, WorkerOutputError } from '../_types'
import { MessageApi, Message } from 'common'

export type SendMessage = ReturnType<typeof SendMessage>
export const SendMessage =
  ({ dbClient, messageApi }: { dbClient: PrismaClient; messageApi: MessageApi }) =>
  (userId: string, message: Message) =>
    ResultAsync.fromPromise(
      dbClient.message.create({
        data: {
          userId,
          data: JSON.stringify(message)
        }
      }),
      (error): WorkerOutputError => ({
        reason: WorkerError.FailedToCreateMessageInDb,
        jsError: error as Error
      })
    ).andThen(({ id }) => messageApi.send(userId, message, id).orElse(() => ok(undefined)))
