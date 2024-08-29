import type { RequestHandler } from './$types'
import { error, json } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request, cookies, locals }) => {
  const requestBody = await request.json()

  const result = await locals.controllers.authController.login(locals.context, {
    ip: locals.clientIp,
    personaProof: requestBody.personaProof,
    cookies,
    userAgent: request.headers.get('user-agent') || '',
    acceptLanguage: request.headers.get('accept-language') || ''
  })

  if (result.isErr()) error(result.error.httpResponseCode, result.error.reason)

  const { authToken, headers } = result.value.data

  return json(
    { authToken },
    {
      status: result.value.httpResponseCode,
      headers
    }
  )
}
