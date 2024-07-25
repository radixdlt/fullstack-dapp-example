import { json } from '@sveltejs/kit'
import type { EventStatus } from 'database'

export const POST = async ({ request, locals }) => {
  const { status, userId } = await request.json()

  const statuses = Object.entries(status)
    .filter(([_, value]) => value)
    .map(([key]) => key.toUpperCase() as EventStatus)

  const data = await locals.dbClient.transactionIntent.findMany({
    take: 250,
    orderBy: { createdAt: 'desc' },
    include: { transactions: true, user: true },
    where: {
      status: {
        in: statuses
      },
      userId: userId ? { equals: userId } : undefined
    }
  })

  return json({ data }, { status: 200 })
}
