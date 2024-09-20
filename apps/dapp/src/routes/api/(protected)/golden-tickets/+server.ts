import { routeHandler } from '$lib/server/route-handler.js'

export const GET = async ({ locals }) => {
  return routeHandler(() =>
    locals.controllers.goldenTicketController.getOwnedSilverTickets(locals.userId)
  )
}
