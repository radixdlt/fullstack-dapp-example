import { radmorphController } from '$lib/server/radmorph/controller.js'
import { routeHandler } from '$lib/server/route-handler.js'

export const POST = async ({ request, locals }) => {
  const requestBody = await request.json()

  return routeHandler(() =>
    radmorphController.getRadmorphImage(locals.context, locals.userId, requestBody)
  )
}
