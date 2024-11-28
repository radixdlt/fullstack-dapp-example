import { AuthController } from '$lib/server/auth/controller'
import { type Handle } from '@sveltejs/kit'
import { config } from '$lib/config'
import {
  GatewayApi,
  TransactionModel,
  UserModel,
  UserQuestModel,
  appLogger,
  AccountAddressModel,
  Addresses,
  MessageModel,
  NotificationModel,
  EventModel,
  ImageModel
} from 'common'
import { dbClient } from '$lib/db'
import { RedisConnection, getQueues } from 'queues'
import type { ControllerDependencies } from '$lib/server/_types'
import { PUBLIC_NETWORK_ID } from '$env/static/public'
import { UserController } from '$lib/server/user/controller'
import { NotificationController } from '$lib/server/notification/controller'
import { UserQuestController } from '$lib/server/user-quest/controller'
import { AuthModel } from '$lib/server/auth/model'
import { JWT } from '$lib/server/auth/jwt'
import { MessageController } from '$lib/server/message/controller'
import { createPreflightResponse } from '$lib/server/helpers/cors'
import { createWellKnownResponse } from '$lib/server/helpers/create-well-known-response'
import {
  createInvalidQuestIdResponse,
  isValidQuestId
} from '$lib/server/helpers/quest-id-validation'
import { createUnauthorizedResponse } from '$lib/server/helpers/create-error-response'
import { ImageController } from '$lib/server/image/controller'

const networkId = +PUBLIC_NETWORK_ID

const queues = getQueues(config.redis)

const redisClient = new RedisConnection(config.redis)

const userModel = UserModel(dbClient)
const eventModel = EventModel({ db: dbClient, queues })
const authModel = AuthModel()
const userQuestModel = UserQuestModel(dbClient)
const transactionModel = TransactionModel(dbClient, queues)
const gatewayApi = GatewayApi(networkId, process.env.GATEWAY_URL)
const messageModel = MessageModel(dbClient)
const accountAddressModel = AccountAddressModel(redisClient)
const addresses = Addresses(networkId)
const notificationModel = NotificationModel(dbClient)
const imageModel = ImageModel(dbClient)

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.maintenanceMode = config.maintenanceMode

  const origin = event.request.headers.get('origin')

  if (event.request.method === 'OPTIONS') {
    return createPreflightResponse(origin)
  }



  if (event.url.pathname === '/.well-known/radix.json') {
    return createWellKnownResponse()
  }

  if (event.params.questId && !isValidQuestId(event.params.questId)) {
    return createInvalidQuestIdResponse()
  }
  const traceId = crypto.randomUUID()
  const logger = appLogger.child({
    traceId,
    path: event.url.pathname,
    httpMethod: event.request.method
  })

  event.locals.context = {
    traceId,
    logger
  }
  event.locals.clientIp =
    config.developmentIp ||
    event.request.headers.get('True-Client-IP') ||
    event.request.headers.get('x-forwarded-for') ||
    event.getClientAddress()

  const userModelWithLogger = userModel(logger)

  event.locals.dependencies = {
    userModel: userModelWithLogger,
    userQuestModel: userQuestModel(logger),
    transactionModel: transactionModel(logger),
    accountAddressModel: accountAddressModel(logger),
    gatewayApi,
    logger,
    dbClient,
    addresses,
    authModel,
    config,
    jwt: JWT(config.jwt),
    messageModel: messageModel(logger),
    notificationModel: notificationModel(logger),
    systemQueue: queues.System,
    eventQueue: queues.Event,
    eventModel: eventModel(logger),
    imageModel: imageModel(logger)
  } satisfies ControllerDependencies

  event.locals.controllers = {
    userController: UserController(event.locals.dependencies),
    userQuestController: UserQuestController(event.locals.dependencies),
    authController: AuthController(event.locals.dependencies),
    messageController: MessageController(event.locals.dependencies),
    notificationController: NotificationController(event.locals.dependencies),
    imageController: ImageController(event.locals.dependencies)
  }

  if (event.route.id?.includes('(protected)')) {
    const result = event.locals.controllers.authController
      .renewAuthToken(event.cookies)
      .andThen((authToken) =>
        event.locals.controllers.authController
          .verifyAuthToken(authToken)
          .map(({ userId, userType }) => ({ userId, authToken, userType }))
      )

    if (result.isErr()) {
      event.cookies.delete('jwt', { path: '/' })
      return createUnauthorizedResponse(result.error.reason)
    }

    event.locals.userId = result.value.userId
    event.locals.userType = result.value.userType
    event.locals.authToken = result.value.authToken

    const loggerWithUserId = appLogger.child({
      traceId,
      path: event.url.pathname,
      httpMethod: event.request.method,
      userId: event.locals.userId
    })
    event.locals.context.logger = loggerWithUserId

    const userExists = await dbClient.user
      .count({ where: { id: result.value.userId } })
      .then((count) => count > 0)

    if (!userExists) {
      event.locals.dependencies.jwt.removeRefreshTokenCookie(event.cookies)
      const response = await resolve(event, {})
      return response
    }

    const response = await resolve(event)
    return response
  }

  const response = await resolve(event, {})
  return response
}
