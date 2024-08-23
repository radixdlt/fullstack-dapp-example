import { json } from '@sveltejs/kit'

export const POST = async ({ locals }) => {
  await locals.systemQueue.add([{ type: 'UpdateLettySwapDappDefinition', id: crypto.randomUUID() }])

  return json({}, { status: 200 })
}
