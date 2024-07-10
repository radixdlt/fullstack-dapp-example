import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
  const images = await locals.dbClient.image.findMany({})
  return { images }
}
