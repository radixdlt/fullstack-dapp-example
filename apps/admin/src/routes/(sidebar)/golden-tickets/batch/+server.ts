import { error, json } from '@sveltejs/kit'

export const POST = async ({ request, locals }) => {
  const { ownerId, amount, expiresAt, description } = await request.json()

  const result = await locals.goldenTicketModel.createBatch(amount, expiresAt, ownerId, description)

  if (result.isErr()) return error(500)

  return json({ createdTickets: result.value }, { status: 200 })
}
