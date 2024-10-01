import { error, json } from '@sveltejs/kit'

export const DELETE = async ({ locals, params }) => {
  await locals.dbClient.goldenTicket.deleteMany({ where: { batchId: params.batchId } })

  return json({}, { status: 200 })
}

export const GET = async ({ locals, params }) => {
  const tickets = await locals.dbClient.goldenTicket.findMany({
    where: { batchId: params.batchId }
  })

  return json(
    {
      tickets
    },
    { status: 200 }
  )
}

export const PATCH = async ({ request, locals, params }) => {
  const { expiresAt } = await request.json()

  const result = await locals.goldenTicketModel.setExpirationDateOnBatch(params.batchId, expiresAt)

  if (result.isErr()) return error(500)

  return json({}, { status: 200 })
}
