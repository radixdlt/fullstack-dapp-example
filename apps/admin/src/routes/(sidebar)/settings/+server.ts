import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const PUT: RequestHandler = async ({ locals, request }) => {
  const { radMorphMintingEnabled } = await request.json()

  await locals.dbClient.config.upsert({
    create: { key: 'radMorphMintingEnabled', value: radMorphMintingEnabled },
    update: { value: radMorphMintingEnabled },
    where: { key: 'radMorphMintingEnabled' }
  })

  return json({}, { status: 200 })
}
