import { json } from '@sveltejs/kit'
import { loadQuests } from 'content'

export const POST = async ({ locals, request }) => {
  const requestBody = await request.json()

  const { searchTerm }: { searchTerm: string } = requestBody

  const items = await locals.dbClient.marketing.findMany({
    orderBy: { user: { createdAt: 'desc' } },
    include: {
      user: {
        select: { createdAt: true, country: true, questProgress: true, accountAddress: true }
      }
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

  return json(
    {
      items: items.map((item) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { questProgress, ...user } = item.user

        const userQuestProgress = item.user.questProgress.reduce<Record<string, string>>(
          (acc, curr) => {
            return { ...acc, [curr.questId]: curr.status }
          },
          {}
        )

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...withoutId } = item

        const questStatus = Object.keys(loadQuests('en')).reduce((acc, curr) => {
          return { ...acc, [`questProgress:${curr}`]: userQuestProgress[curr] ?? 'NOT_STARTED' }
        }, {})

        return {
          ...withoutId,
          user: {
            ...user,
            ...questStatus
          }
        }
      })
    },
    { status: 200 }
  )
}
