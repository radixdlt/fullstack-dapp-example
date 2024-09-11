import { error, json } from '@sveltejs/kit'

export const POST = async ({ request, locals }) => {
  const { ownerId, tickets, expiresAt, description } = await request.json()

  const result = await locals.goldenTicketModel.importBatch(
    JSON.parse(tickets),
    expiresAt,
    ownerId,
    description
  )

  if (result.isErr()) return error(500)

  return json({ createdTickets: result.value }, { status: 200 })
}
