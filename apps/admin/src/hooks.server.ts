import { error, type Handle } from '@sveltejs/kit'
import { env as privateEnv } from '$env/dynamic/private'
import { verifyJwt } from '$lib/verify-jwt'

export const handle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname === '/health') {
    return new Response(JSON.stringify({ ok: true }), {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }

  const { JWT_SECRET } = privateEnv
  const jwt = event.cookies.get('jwt')

  if (jwt) {
    const result = verifyJwt(jwt, JWT_SECRET)

    if (result.isErr() || result.value.userType !== 'ADMIN') return error(401)

    const { userId, userType } = result.value

    event.locals.userId = userId
    event.locals.userType = userType

    return resolve(event, {})
  }

  return error(401)
}
