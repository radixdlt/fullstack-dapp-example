import { ConnectionOptions, Queue } from 'bullmq'

export * from 'bullmq'

export const Queues = { EventQueue: 'EventQueue' } as const

export const getQueues = (connection: ConnectionOptions) => {
  const eventQueue = new Queue<{
    transactionId: string
    userId: string
    eventId: string
    questId?: string
  }>(Queues.EventQueue, {
    connection
  })

  return { eventQueue }
}
