import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
  const tickets = await locals.goldenTicketModel.getAll()

  if (tickets.isErr()) error(500)

  return {
    tickets: tickets.value,
    baseUrl: process.env.PUBLIC_RADQUEST_API_URL as string,
    userId: locals.userId
  }
}
