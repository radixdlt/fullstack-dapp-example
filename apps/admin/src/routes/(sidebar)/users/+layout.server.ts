import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
  const users = await locals.dbClient.user.findMany({ orderBy: { createdAt: 'desc' } })
  return { users }
}
