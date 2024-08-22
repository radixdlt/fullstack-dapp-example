import type { RequestHandler } from './$types'
import { error, json } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request, cookies, locals }) => {
  const requestBody = await request.json()

  const loginResult = await locals.controllers.authController.login(
    locals.context,
    requestBody,
    cookies
  )

  const goldenTicket = cookies.get('golden-ticket')

  if (loginResult.isErr()) error(loginResult.error.httpResponseCode, loginResult.error.reason)

  if (goldenTicket) {
    const claimTicketResult = await locals.controllers.goldenTicketController.claim(
      goldenTicket,
      loginResult.value.data.id
    )

    if (claimTicketResult.isErr())
      error(claimTicketResult.error.httpResponseCode, claimTicketResult.error.reason)

    cookies.delete('golden-ticket', { path: '/' })
  }

  const { authToken, headers, id } = loginResult.value.data

  return json(
    { authToken, id },
    {
      status: loginResult.value.httpResponseCode,
      headers
    }
  )
}
