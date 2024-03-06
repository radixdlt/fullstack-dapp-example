import { authController } from '$lib/server/auth/controller'
import type { Handle } from '@sveltejs/kit'
import { config } from '$lib/config'
import { appLogger } from 'common'
import { PUBLIC_NETWORK_ID } from '$env/static/public'
import { QuestDefinitions } from 'content'

const NetworkQuestDefinitions = QuestDefinitions(parseInt(PUBLIC_NETWORK_ID))

export const handle: Handle = async ({ event, resolve }) => {
  const traceId = crypto.randomUUID()
  event.locals.context = {
    traceId,
    logger: appLogger.child({
      traceId,
      path: event.url.pathname,
      method: event.request.method
    })
  }

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

  if (event.params.questId) {
    if (!Object.keys(NetworkQuestDefinitions).includes(event.params.questId)) {
      return new Response(JSON.stringify({ error: 'invalid quest id', status: 400 }), {
        headers: {
          'content-type': 'application/json'
        },
        status: 400
      })
    }
  }

  if (event.route.id?.includes('(protected)')) {
    const result = authController
      .renewAuthToken(event.cookies)
      .andThen((authToken) =>
        authController.verifyAuthToken(authToken).map((userId) => ({ userId, authToken }))
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

    event.locals.userId = result.value.userId
    event.locals.authToken = result.value.authToken

    return await resolve(event)
  }

  const response = await resolve(event, {})
  return response
}
