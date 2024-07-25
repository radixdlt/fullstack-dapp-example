import { json } from '@sveltejs/kit'

export const POST = async ({ request, locals }) => {
  const { userId } = await request.json()

  const [events, count] = await Promise.all([
    locals.dbClient.audit.findMany({
      take: 250,
      where: {
        userId: userId ? { equals: userId } : undefined
      }
    }),
    await locals.dbClient.audit.count()
  ])

  return json({ data: events, count }, { status: 200 })
}
