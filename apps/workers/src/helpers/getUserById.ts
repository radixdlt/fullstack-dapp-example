import { ResultAsync, err, ok } from 'neverthrow'
import { PrismaClient, User } from 'database'
import { WorkerOutputError, WorkerError } from '../_types'

export const getUserById = (
  userId: string,
  dbClient: PrismaClient
): ResultAsync<User, WorkerOutputError> =>
  ResultAsync.fromPromise(dbClient.user.findUnique({ where: { id: userId } }), (error) => ({
    reason: WorkerError.FailedToGetUserFromDb,
    jsError: error
  })).andThen((user) => (user ? ok(user) : err({ reason: WorkerError.UserNotFound })))
