import { json } from '@sveltejs/kit'
import type { TransactionJob } from 'queues'

export const POST = async ({ request, locals }) => {
  const requestBody = await request.json()

  const { ids }: { ids: string[] } = requestBody

  const transactions = await locals.dbClient.transactionIntent.findMany({
    take: 250,
    orderBy: { createdAt: 'desc' },
    where: { discriminator: { in: ids } }
  })

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
