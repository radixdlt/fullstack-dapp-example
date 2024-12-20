import { json } from '@sveltejs/kit'

export const POST = async ({ request, locals }) => {
  const requestBody = await request.json()

  const { searchTerm }: { searchTerm: string } = requestBody

  const users = await locals.dbClient.user.findMany({
    take: 250,
    orderBy: { createdAt: 'desc' },
    where: searchTerm
      ? {
          OR: [{ accountAddress: { contains: searchTerm } }, { id: { contains: searchTerm } }]
        }
      : {}
  })

  return json({ users }, { status: 200 })
}
