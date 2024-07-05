import { routeHandler } from '$lib/server/route-handler'

export const POST = async ({ locals }) => {
  return routeHandler(() => locals.radmorphController.populateImageOracle())
}
