import { routeHandler } from '$lib/server/route-handler'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ params, locals }) =>
  routeHandler(() => locals.controllers.userController.getNameByReferralCode(params.referralCode))
