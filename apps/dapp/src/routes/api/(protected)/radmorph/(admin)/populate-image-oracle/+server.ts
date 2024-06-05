import { radmorphController } from '$lib/server/radmorph/controller.js'
import { routeHandler } from '$lib/server/route-handler.js'

export const POST = async ({ locals }) => {
  return routeHandler(() => radmorphController.populateImageOracle(locals.context))
}
