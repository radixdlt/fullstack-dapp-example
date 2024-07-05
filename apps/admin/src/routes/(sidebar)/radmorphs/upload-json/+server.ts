import { routeHandler } from '$lib/server/route-handler'

export const POST = async ({ request, locals }) => {
  const requestBody = await request.json()

  return routeHandler(() => locals.radmorphController.uploadRadmorphConfiguration(requestBody))
}
