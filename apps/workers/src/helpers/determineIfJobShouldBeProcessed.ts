import { PrismaClient } from 'database'
import { WorkerError } from '../_types'
import { ResultAsync } from 'neverthrow'

export const determineIfJobShouldBeProcessed = (discriminator: string, dbClient: PrismaClient) =>
  ResultAsync.fromPromise(
    dbClient.transactionIntent
      .findUnique({
        where: { discriminator, status: { notIn: ['COMPLETED', 'FAILED_PERMANENT', 'PAUSED'] } }
      })
      .then((transactionIntent) => transactionIntent?.status),
    (error) => ({ reason: WorkerError.FailedToQueryDb, jsError: error })
  )
