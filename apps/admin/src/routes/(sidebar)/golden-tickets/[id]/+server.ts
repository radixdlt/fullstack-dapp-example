import { json } from '@sveltejs/kit'

export const GET = async ({ locals, params }) => {
  const ticket = await locals.dbClient.goldenTicket.findUnique({
    where: { id: params.id }
  })

  if (!ticket) return json({}, { status: 404 })

  return json(
    {
      ticket
    },
    { status: 200 }
  )
}
