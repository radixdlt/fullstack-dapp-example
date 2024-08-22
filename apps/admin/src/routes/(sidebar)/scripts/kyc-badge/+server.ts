import { json } from '@sveltejs/kit'

export const POST = async ({ locals }) => {
  await locals.systemQueue.add([{ type: 'UpdateKycBadgeAddress', id: crypto.randomUUID() }])

  return json({}, { status: 200 })
}
