import { error, json } from '@sveltejs/kit'

export const POST = async ({ request, locals }) => {
  const { ownerId, tickets, expiresAt } = await request.json()

  console.log('tickets', tickets)

  const result = await locals.goldenTicketModel.importBatch(JSON.parse(tickets), expiresAt, ownerId)

  if (result.isErr()) return error(500)

  return json({ createdTickets: result.value }, { status: 200 })
}
