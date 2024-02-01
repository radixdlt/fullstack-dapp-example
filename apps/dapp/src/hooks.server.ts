import { authController } from '$lib/server/auth/controller'
import type { Handle } from '@sveltejs/kit'
import { config } from '$lib/config'

export const handle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname === '/.well-known/radix.json') {
    return new Response(
      JSON.stringify({
        dApps: [
          {
            dAppDefinitionAddress: config.dapp.dAppDefinitionAddress
          }
        ]
      }),
      {
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  }

  if (event.route.id?.includes('(protected)')) {
    const result = authController
      .renewAuthToken(event.cookies)
      .andThen((authToken) =>
        authController
          .verifyAuthToken(authToken)
          .map((identityAddress) => ({ identityAddress, authToken }))
      )

    if (result.isErr()) {
      event.cookies.delete('jwt', { path: '/' })
      return new Response(JSON.stringify({ error: result.error.reason, status: 401 }), {
        headers: {
          'content-type': 'application/json'
        },
        status: 401
      })
    }

    event.locals.identityAddress = result.value.identityAddress
    event.locals.authToken = result.value.authToken

    return await resolve(event)
  }

  const response = await resolve(event, {})
  return response
}
