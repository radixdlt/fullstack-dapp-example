import { QuestId } from 'content'
import { EventId } from 'common'
import { Prisma, PrismaClient } from 'database'
import { ResultAsync } from 'neverthrow'
import { WorkerError, WorkerOutputError } from '../_types'

export type DbOperation = () => Prisma.PrismaPromise<any>

export type DbTransactionBuilder = ReturnType<typeof DbTransactionBuilder>
export const DbTransactionBuilder = ({ dbClient }: { dbClient: PrismaClient }) => {
  const operations: DbOperation[] = []

  const add = (...values: DbOperation[]) => {
    for (const operation of values) {
      operations.push(operation)
    }

    return api
  }

  const questRequirementCompleted = ({
    questId,
    requirementId,
    userId,
    transactionId
  }: {
    userId: string
    questId: QuestId
    requirementId: EventId
    transactionId: string
  }) => {
    operations.push(
      () =>
        dbClient.completedQuestRequirement.create({
          data: {
            userId,
            questId,
            requirementId
          }
        }),
      () =>
        dbClient.event.update({
          where: {
            transactionId
          },
          data: {
            questId,
            userId
          }
        })
    )

    return api
  }

  const helpers = { questRequirementCompleted } as const

  const exec = () =>
    ResultAsync.fromPromise(
      dbClient.$transaction(async () => {
        const results = []
        for (const operation of operations) {
          results.push(await operation())
        }
        return results
      }),
      (error): WorkerOutputError => ({
        reason: WorkerError.FailedToExecuteDbTransaction,
        jsError: error as Error
      })
    )

  const api = { add, exec, helpers }

  return api
}
