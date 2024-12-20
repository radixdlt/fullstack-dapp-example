import { json } from '@sveltejs/kit'
import type { EventStatus } from 'database'

export const POST = async ({ request, locals }) => {
  const { status, userId } = await request.json()

  const statuses = Object.entries(status)
    .filter(([_, value]) => value)
    .map(([key]) => key.toUpperCase() as EventStatus)

  const [events, count] = await Promise.all([
    locals.dbClient.event.findMany({
      take: 250,
      orderBy: { createdAt: 'desc' },
      where: {
        status: {
          in: statuses
        },
        userId: userId ? { equals: userId } : undefined
      }
    }),
    await locals.dbClient.event.count()
  ])

  return json({ data: events, count }, { status: 200 })
}
