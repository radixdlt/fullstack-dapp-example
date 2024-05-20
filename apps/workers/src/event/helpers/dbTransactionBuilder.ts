import { Prisma, PrismaClient } from 'database'
import { ResultAsync } from 'neverthrow'

export type DbOperation = Prisma.PrismaPromise<any>

export type DbTransactionBuilder = ReturnType<typeof DbTransactionBuilder>
export const DbTransactionBuilder = ({ dbClient }: { dbClient: PrismaClient }) => {
  const operations: Prisma.PrismaPromise<any>[] = []

  const add = (...operations: DbOperation[]) => {
    for (const operation of operations) {
      operations.push(operation)
    }

    return api
  }

  const exec = () =>
    ResultAsync.fromPromise(dbClient.$transaction(operations), (error) => error as Error)

  const api = { add, exec }

  return api
}
