import type { RequestHandler } from './$types'
import { error, json } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request, cookies, locals }) => {
  const requestBody = await request.json()

  const loginResult = await locals.controllers.authController.login(locals.context, {
    ip: locals.clientIp,
    personaProof: requestBody.personaProof,
    cookies,
    userAgent: request.headers.get('user-agent') || '',
    acceptLanguage: request.headers.get('accept-language') || ''
  })

  if (loginResult.isErr()) error(loginResult.error.httpResponseCode, loginResult.error.reason)

  const { authToken, headers, id, status, vpn } = loginResult.value.data

  return json(
    { authToken, id, status, vpn },
    {
      status: loginResult.value.httpResponseCode,
      headers
    }
  )
}
