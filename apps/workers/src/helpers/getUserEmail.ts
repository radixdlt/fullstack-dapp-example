import { WorkerError } from 'common'
import { PrismaClient } from 'database'
import { ResultAsync } from 'neverthrow'

export const getUserEmail = (userId: string, dbClient: PrismaClient) =>
  ResultAsync.fromPromise(dbClient.userEmail.findUnique({ where: { userId } }), (error) => ({
    reason: WorkerError.FailedToGetUserEmail,
    jsError: error
  }))
