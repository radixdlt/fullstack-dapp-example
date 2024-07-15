import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
  const items = await locals.dbClient.config.findMany({})

  return { items }
}
