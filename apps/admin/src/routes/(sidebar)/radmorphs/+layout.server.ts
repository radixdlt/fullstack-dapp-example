import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
  const radMorphImages = await locals.dbClient.radMorphImage.findMany({})
  return { radMorphImages }
}
