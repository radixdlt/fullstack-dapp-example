import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
  const items = await locals.dbClient.config.findMany({})

  const defaults = {
    transactionStreamStatus: 'Run'
  }

  const itemMap = items.reduce((acc, item) => ({ ...acc, [item.key]: item.value }), defaults)

  const withDefaults = Object.entries(itemMap).map(([key, value]) => ({ key, value }))

  locals.logger.debug({ method: 'loadConfig', items: withDefaults })

  return { items: withDefaults }
}
