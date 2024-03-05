import { ConnectionOptions, Queue } from 'bullmq'
import { ResultAsync } from 'neverthrow'
import { typedError } from 'common'

export * from 'bullmq'

export const Queues = {
  EventQueue: 'EventQueue',
  TransactionQueue: 'TransactionQueue'
} as const

export type EventJob = {
  userId: string
  eventId: string
  transactionId?: string
  questId?: string
  traceId: string
}

export type TransactionJob = {
  traceId: string
  userId: string
  questId: string
}

export const getQueues = (connection: ConnectionOptions) => {
  const eventQueue = new Queue<EventJob>(Queues.EventQueue, {
    connection
  })

  const transactionQueue = new Queue<TransactionJob>(Queues.TransactionQueue, {
    connection
  })

  const addBulk = (items: EventJob[]) =>
    ResultAsync.fromPromise(
      eventQueue.addBulk(
        items.map((item) => ({ name: item.traceId, data: item, opts: { jobId: item.traceId } }))
      ),
      typedError
    )

  const addDepositRewardsJob = (item: TransactionJob) =>
    ResultAsync.fromPromise(transactionQueue.add(item.traceId, item), typedError)

  return {
    eventQueue: { addBulk, queue: eventQueue },
    transactionQueue: { queue: transactionQueue, addDepositRewards: addDepositRewardsJob }
  }
}
