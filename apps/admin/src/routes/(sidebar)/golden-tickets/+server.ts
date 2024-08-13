import { error, json } from '@sveltejs/kit'

export const POST = async ({ request, locals }) => {
  const { ownerId, amount, expiresAt } = await request.json()

  const result = await locals.goldenTicketModel.createBatch(amount, expiresAt, ownerId)

  if (result.isErr()) return error(500)

  return json({ createdTickets: result.value }, { status: 200 })
}

export const PATCH = async ({ request, locals }) => {
  const { batchId, expiresAt } = await request.json()

  const result = await locals.goldenTicketModel.setExpirationDateOnBatch(batchId, expiresAt)

  if (result.isErr()) return error(500)

  return json({}, { status: 200 })
}
