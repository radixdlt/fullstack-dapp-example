import { json } from '@sveltejs/kit'
import { EventId } from 'common'

export const POST = async ({ request, locals }) => {
  const requestBody = await request.json()

  const { ids }: { ids: string[] } = requestBody

  const events = await locals.dbClient.event.findMany({ where: { transactionId: { in: ids } } })

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

  return json({}, { status: 200 })
}
