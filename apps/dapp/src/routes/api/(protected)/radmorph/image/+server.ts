import { routeHandler } from '$lib/server/route-handler.js'

export const POST = async ({ request, locals }) => {
  const requestBody = await request.json()

  return routeHandler(() =>
    locals.controllers.imageController.getRadmorphImage(locals.context, locals.userId, requestBody)
  )
}
