import { ResultAsync, err, ok } from 'neverthrow'
import { PrismaClient, User } from 'database'
import { WorkerOutputError, WorkerError } from '../_types'

export const getUserById = (
  userId: string,
  dbClient: PrismaClient,
  include: any = {}
): ResultAsync<User, WorkerOutputError> =>
  ResultAsync.fromPromise(
    dbClient.user.findUnique({ where: { id: userId }, include }),
    (error) => ({
      reason: WorkerError.FailedToGetUserFromDb,
      jsError: error
    })
  ).andThen((user) => (user ? ok(user) : err({ reason: WorkerError.UserNotFound })))
