import { authController } from '$lib/server/auth/controller'
import type { Handle } from '@sveltejs/kit'
import { config } from '$lib/config'
import {
  AuditModel,
  GatewayApi,
  TransactionModel,
  UserModel,
  UserQuestModel,
  appLogger,
  AccountAddressModel
} from 'common'
import { QuestDefinitions } from 'content'
import { UserType } from 'database'
import { dbClient } from '$lib/db'
import { RedisConnection, getQueues } from 'queues'
import type { ControllerDependencies } from '$lib/server/_types'
import { PUBLIC_NETWORK_ID } from '$env/static/public'
import { UserController } from '$lib/server/user/controller'
import { UserQuestController } from '$lib/server/user-quest/controller'

const NetworkQuestDefinitions = QuestDefinitions()

const { transactionQueue } = getQueues(config.redis)

const redisClient = new RedisConnection(config.redis)

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
  const logger = appLogger.child({
    traceId,
    path: event.url.pathname,
    method: event.request.method
  })

  event.locals.context = {
    traceId,
    logger: appLogger.child({
      traceId,
      path: event.url.pathname,
      method: event.request.method
    })
  }

  const userModel = UserModel(dbClient)(logger)
  const userQuestModel = UserQuestModel(dbClient)(logger)
  const transactionModel = TransactionModel(dbClient, transactionQueue)(logger)
  const auditModel = AuditModel(dbClient)(logger)
  const gatewayApi = GatewayApi(+PUBLIC_NETWORK_ID)
  const accountAddressModel = AccountAddressModel(redisClient, logger)

  event.locals.dependencies = {
    userModel,
    userQuestModel,
    transactionModel,
    auditModel,
    gatewayApi,
    accountAddressModel
  } satisfies ControllerDependencies

  event.locals.controllers = {
    userController: UserController(event.locals.dependencies),
    userQuestController: UserQuestController(event.locals.dependencies)
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
