import { json } from '@sveltejs/kit'
import type { TransactionJob } from 'queues'

export const POST = async ({ request, locals }) => {
  const requestBody = await request.json()

  const { ids, all }: { ids: string[]; all: boolean } = requestBody

  let skip = 0
  let completed = false

  const where = all ? { status: 'ERROR' } : { discriminator: { in: ids } }

  while (!completed) {
    const transactions = await locals.dbClient.transactionIntent.findMany({
      take: 25,
      skip,
      orderBy: { createdAt: 'desc' },
      where
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

    if (all) {
      skip += 25
      completed = transactions.length < 25
    } else {
      completed = true
    }
  }

  return json({}, { status: 200 })
}
