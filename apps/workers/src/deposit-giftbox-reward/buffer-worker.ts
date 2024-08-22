import {
  Worker,
  ConnectionOptions,
  Queues,
  DepositGiftBoxRewardQueue,
  DepositGiftBoxesRewardJob
} from 'queues'
import { AppLogger } from 'common'
import { config } from '../config'
import { dbClient } from '../db-client'
import { BufferWorker } from '../helpers/bufferWorker'

export const DepositGiftBoxRewardBufferWorker = async (
  connection: ConnectionOptions,
  dependencies: {
    logger: AppLogger
    DepositGiftBoxRewardQueue: DepositGiftBoxRewardQueue
  }
) => {
  const { logger, DepositGiftBoxRewardQueue } = dependencies

  const worker = new Worker<DepositGiftBoxesRewardJob>(
    Queues.DepositGiftBoxRewardBufferQueue,
    null,
    {
      connection,
      concurrency: config.worker.depositGiftBoxRewardBuffer.concurrency
    }
  )

  const token = crypto.randomUUID()

  await BufferWorker<DepositGiftBoxRewardQueue>({
    queue: DepositGiftBoxRewardQueue,
    dbClient,
    token,
    getNextJob: () => worker.getNextJob(token),
    batchSize: config.worker.depositGiftBoxRewardBuffer.batchSize,
    batchInterval: config.worker.depositGiftBoxRewardBuffer.batchInterval,
    logger
  })()
}
