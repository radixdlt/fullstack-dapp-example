import { ConnectionOptions, Queue } from 'bullmq'
import { ResultAsync } from 'neverthrow'
import { typedError } from 'common'

export * from 'bullmq'

export const Queues = { EventQueue: 'EventQueue' } as const

export type EventJob = {
  transactionId: string
  userId: string
  eventId: string
  questId?: string
  traceId: string
}

export const getQueues = (connection: ConnectionOptions) => {
  const eventQueue = new Queue<EventJob>(Queues.EventQueue, {
    connection
  })

  const addBulk = (items: EventJob[]) =>
    ResultAsync.fromPromise(
      eventQueue.addBulk(
        items.map((item) => ({ name: item.transactionId, data: item, jobId: item.transactionId }))
      ),
      typedError
    )

  return { eventQueue: { addBulk, queue: eventQueue } }
}
