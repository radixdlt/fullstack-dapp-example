import { WorkerError } from 'common'
import { PrismaClient } from 'database'
import { ResultAsync } from 'neverthrow'

export const UserHelper = (dbClient: PrismaClient) => {
  const filterBlockedUsers = (userIds: string[]) =>
    ResultAsync.fromPromise(
      dbClient.user.findMany({
        select: { id: true },
        where: { id: { in: userIds }, blocked: false }
      }),
      (error) => ({
        reason: WorkerError.FailedToGetUserFromDb,
        jsError: error
      })
    ).map((users) => users.map((user) => user.id))

  return { filterBlockedUsers }
}
