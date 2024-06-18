import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
  const configMap = new Map<string, boolean>([['radGemMintingEnabled', false]])
  const items = await locals.dbClient.config.findMany({})

  items.forEach((item) => {
    if (configMap.has(item.key)) configMap.set(item.key, item.value === 'true')
  })

  return { configMap }
}
