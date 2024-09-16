import { json } from '@sveltejs/kit'

export const DELETE = async ({ locals, params }) => {
  await locals.dbClient.goldenTicket.deleteMany({ where: { batchId: params.batchId } })

  return json({}, { status: 200 })
}
