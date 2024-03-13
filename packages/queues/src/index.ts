import { ConnectionOptions, Queue } from 'bullmq'
import { ResultAsync } from 'neverthrow'
import { typedError } from 'common'

export * from 'bullmq'

export const Queues = {
  EventQueue: 'EventQueue',
  TransactionQueue: 'TransactionQueue'
} as const

export type EventJob = {
  questId?: string
  userId: string
  eventId: string
  traceId: string
  transactionId?: string
}

export type DepositRewardTransactionJob = {
  type: 'DepositReward'
  traceId: string
  userId: string
  questId: string
}

export type TransactionJob = DepositRewardTransactionJob

type TQueues = ReturnType<typeof getQueues>
export type TransactionQueue = TQueues['transactionQueue']
export type EventQueue = TQueues['eventQueue']

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

  const addTransactionJob = (item: TransactionJob) =>
    ResultAsync.fromPromise(transactionQueue.add(item.traceId, item), typedError)

  return {
    eventQueue: { addBulk, queue: eventQueue },
    transactionQueue: { queue: transactionQueue, add: addTransactionJob }
  }
}
