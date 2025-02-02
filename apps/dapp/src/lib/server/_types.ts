/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  AppLogger,
  ApiError,
  UserModel,
  TransactionModel,
  GatewayApi,
  AccountAddressModel,
  UserQuestModel,
  Addresses,
  MessageModel,
  NotificationModel,
  EventModel,
  ImageModel
} from 'common'
import type { PrismaClient } from 'database'
import type { ResultAsync } from 'neverthrow'
import type { AuthModel } from './auth/model'
import type { Config } from '$lib/config'
import type { JWT } from './auth/jwt'
import type { UserController } from '$lib/server/user/controller'
import type { UserQuestController } from '$lib/server/user-quest/controller'
import type { AuthController } from '$lib/server/auth/controller'
import type { MessageController } from '$lib/server/message/controller'
import type { NotificationController } from '$lib/server/notification/controller'
import type { ImageController } from './image/controller'
import type { Queues } from 'queues'

export type ControllerMethodOutput<T = any> = ResultAsync<
  { data: T; httpResponseCode: number },
  ApiError
>

export type ControllerMethodContext = {
  logger: AppLogger
  traceId: string
}

export type Controllers = {
  userController: UserController
  userQuestController: UserQuestController
  authController: AuthController
  messageController: MessageController
  notificationController: NotificationController
  imageController: ImageController
}

export type ControllerDependencies = {
  userModel: ReturnType<UserModel>
  transactionModel: ReturnType<TransactionModel>
  gatewayApi: ReturnType<typeof GatewayApi>
  userQuestModel: ReturnType<UserQuestModel>
  accountAddressModel: ReturnType<AccountAddressModel>
  messageModel: ReturnType<MessageModel>
  notificationModel: ReturnType<NotificationModel>
  logger: AppLogger
  dbClient: PrismaClient
  addresses: Addresses
  imageModel: ReturnType<ImageModel>
  authModel: ReturnType<typeof AuthModel>
  config: Config
  jwt: JWT
  systemQueue: Queues['System']
  eventQueue: Queues['Event']
  eventModel: ReturnType<EventModel>
}
