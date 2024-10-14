import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
  const batches = await locals.goldenTicketModel.getAllBatches()

  if (batches.isErr()) error(500)

  return {
    batches: batches.value,
    baseUrl: process.env.PUBLIC_RADQUEST_API_URL as string,
    userId: locals.userId
  }
}
