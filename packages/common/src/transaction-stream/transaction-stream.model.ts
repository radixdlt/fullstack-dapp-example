import { typedError } from 'common'
import { PrismaClient } from 'database'
import { ResultAsync } from 'neverthrow'

export type TransactionStreamStatus =
  (typeof TransactionStreamStatus)[keyof typeof TransactionStreamStatus]
export const TransactionStreamStatus = { Stop: 'Stop', Running: 'Run' } as const

export type TransactionStreamModel = ReturnType<typeof TransactionStreamModel>
export const TransactionStreamModel = (dbClient: PrismaClient) => {
  const setLatestStateVersion = (stateVersion: number) =>
    ResultAsync.fromPromise(
      dbClient.config.upsert({
        where: { key: 'latestStateVersion' },
        create: { key: 'latestStateVersion', value: `${stateVersion}` },
        update: { value: `${stateVersion}` }
      }),
      typedError
    )

  const setTransactionStreamStatus = (status: TransactionStreamStatus) =>
    ResultAsync.fromPromise(
      dbClient.config.upsert({
        where: { key: 'transactionStreamStatus' },
        create: { key: 'transactionStreamStatus', value: status },
        update: { value: status }
      }),
      typedError
    )

  const getTransactionStreamStatus = () =>
    ResultAsync.fromPromise(
      dbClient.config
        .findFirst({
          where: { key: 'transactionStreamStatus' }
        })
        .then((item) =>
          item ? (item.value as TransactionStreamStatus) : TransactionStreamStatus.Running
        ),
      typedError
    )

  const getLatestProcessedStateVersion = () =>
    ResultAsync.fromPromise(
      dbClient.config
        .findFirst({
          where: { key: 'latestStateVersion' }
        })
        .then((item) => (item ? parseInt(item.value) : undefined)),
      typedError
    )

  return {
    setLatestStateVersion,
    getLatestProcessedStateVersion,
    setTransactionStreamStatus,
    getTransactionStreamStatus
  }
}
