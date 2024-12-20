import { json } from '@sveltejs/kit'

export const POST = async ({ locals }) => {
  await locals.queues.System.add([
    { type: 'UpdateLettySwapDappDefinition', id: crypto.randomUUID() }
  ])

  return json({}, { status: 200 })
}
