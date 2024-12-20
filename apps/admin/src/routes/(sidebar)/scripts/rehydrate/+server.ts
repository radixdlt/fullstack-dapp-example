import { json } from '@sveltejs/kit'
import { EventId, Priority } from 'common'
import type { TransactionIntent } from 'database'
import type { TransactionJob } from 'queues'

export const POST = async ({ locals, request }) => {
  const events = await locals.dbClient.event.findMany({ where: { status: { not: 'COMPLETED' } } })

  const errors = await request.json().then((data) => data.errors)

  let transactions: TransactionIntent[]

  if (errors) {
    transactions = await locals.dbClient.transactionIntent.findMany({
      where: { status: { not: 'COMPLETED' }, error: { in: errors } }
    })
  } else {
    transactions = await locals.dbClient.transactionIntent.findMany({
      where: { status: { not: 'COMPLETED' } }
    })
  }

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
    await locals.queues.Event.queue.remove(jobData.transactionId)
    await locals.queues.Event.add([jobData])
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

    await locals.transactionIntentHelper.addToQueue(jobData, Priority.Low)
  }

  return json({}, { status: 200 })
}
