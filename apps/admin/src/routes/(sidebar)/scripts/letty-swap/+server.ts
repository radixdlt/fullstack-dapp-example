import { json } from '@sveltejs/kit'

export const POST = async ({ locals }) => {
  await locals.systemQueue.addBulk([
    { type: 'UpdateLettySwapDappDefinition', traceId: crypto.randomUUID() }
  ])

  return json({}, { status: 200 })
}
