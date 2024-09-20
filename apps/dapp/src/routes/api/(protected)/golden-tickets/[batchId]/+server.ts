import { routeHandler } from '$lib/server/route-handler.js'

export const PUT = async ({ locals, request, params }) => {
  const { expiresAt, description } = await request.json()

  return routeHandler(() =>
    locals.controllers.goldenTicketController.updateSilverTicketBatch(
      locals.userId,
      params.batchId,
      expiresAt,
      description
    )
  )
}
