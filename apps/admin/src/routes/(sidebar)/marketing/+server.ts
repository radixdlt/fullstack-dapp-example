import { json } from '@sveltejs/kit'

export const POST = async ({ request, locals }) => {
  const requestBody = await request.json()

  const { searchTerm }: { searchTerm: string } = requestBody

  const items = await locals.dbClient.marketing.findMany({
    take: 250,
    orderBy: { user: { createdAt: 'desc' } },
    include: {
      user: { select: { createdAt: true, country: true, questProgress: true } }
    },
    where: searchTerm
      ? {
          OR: [
            { utm_campaign: { contains: searchTerm } },
            { utm_content: { contains: searchTerm } },
            { utm_id: { contains: searchTerm } },
            { utm_medium: { contains: searchTerm } },
            { utm_source: { contains: searchTerm } },
            { utm_term: { contains: searchTerm } }
          ]
        }
      : {}
  })

  return json({ items }, { status: 200 })
}
