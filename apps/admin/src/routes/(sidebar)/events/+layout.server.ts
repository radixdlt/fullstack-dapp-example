import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
  const events = await locals.dbClient.event.findMany({ take: 250, orderBy: { createdAt: 'desc' } })
  return { events }
}
