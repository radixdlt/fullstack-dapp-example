import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const PUT: RequestHandler = async ({ locals, request }) => {
  const body = await request.json()

  const [key, value] = Object.entries(body)[0] as [string, string]

  await locals.dbClient.config.upsert({
    create: { key, value },
    update: { value },
    where: { key }
  })

  return json({}, { status: 200 })
}
