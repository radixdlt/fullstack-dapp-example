import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const PUT: RequestHandler = async ({ locals, request }) => {
  const { radGemMintingEnabled } = await request.json()

  await locals.dbClient.config.upsert({
    create: { key: 'radGemMintingEnabled', value: radGemMintingEnabled },
    update: { value: radGemMintingEnabled },
    where: { key: 'radGemMintingEnabled' }
  })

  return json({}, { status: 200 })
}
