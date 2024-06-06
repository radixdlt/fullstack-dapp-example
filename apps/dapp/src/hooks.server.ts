import { authController } from '$lib/server/auth/controller'
import type { Handle } from '@sveltejs/kit'
import { config } from '$lib/config'
import { appLogger } from 'common'
import { QuestDefinitions } from 'content'
import { UserType } from 'database'

const NetworkQuestDefinitions = QuestDefinitions()

export const handle: Handle = async ({ event, resolve }) => {
  const origin = event.request.headers.get('origin')

  if (event.request.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': origin || '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    })
  }
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
        callbackPath: '/connect',
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
        authController
          .verifyAuthToken(authToken)
          .map(({ userId, userType }) => ({ userId, authToken, userType }))
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

    if (event.route.id?.includes('(admin)')) {
      if (result.value.userType !== UserType.ADMIN) {
        return new Response(JSON.stringify({ error: 'Unauthorized', status: 403 }), {
          headers: {
            'content-type': 'application/json'
          },
          status: 403
        })
      }
    }

    event.locals.userId = result.value.userId
    event.locals.userType = result.value.userType
    event.locals.authToken = result.value.authToken

    const response = await resolve(event)
    response.headers.set('Access-Control-Allow-Origin', origin || '*')
    response.headers.set('Access-Control-Allow-Credentials', 'true')
    return response
  }

  const response = await resolve(event, {})
  return response
}
