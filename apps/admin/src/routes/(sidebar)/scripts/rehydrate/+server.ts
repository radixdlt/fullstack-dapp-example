import { json } from '@sveltejs/kit'
import { EventId } from 'common'
import type { TransactionJob } from 'queues'

export const POST = async ({ locals }) => {
  const events = await locals.dbClient.event.findMany({ where: { status: { not: 'COMPLETED' } } })

  const transactions = await locals.dbClient.transactionIntent.findMany({
    where: { status: { not: 'COMPLETED' } }
  })

  for (const event of events) {
    const data = event.data as Record<string, unknown>
    const type = event.id as EventId
    const jobData = {
      data,
      eventId: event.id,
      type,
      transactionId: event.transactionId,
      userId: event.userId,
      traceId: crypto.randomUUID()
    }
    locals.logger.debug({ method: 'retryingEventJob', jobData })
    await locals.eventQueue.queue.remove(jobData.transactionId)
    await locals.eventQueue.addJob(jobData)
  }

  for (const transaction of transactions) {
    const data = transaction.data as TransactionJob
    const jobData = {
      ...data,
      discriminator: transaction.discriminator,
      userId: transaction.userId,
      traceId: crypto.randomUUID()
    }
    locals.logger.debug({ method: 'retryingTransactionJob', jobData })
    await locals.eventQueue.queue.remove(jobData.discriminator)
    await locals.transactionQueue.add(jobData)
  }

  return json({}, { status: 200 })
}
