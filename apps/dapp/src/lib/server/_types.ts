/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  AppLogger,
  ApiError,
  UserModel,
  TransactionModel,
  AuditModel,
  GatewayApi,
  AccountAddressModel,
  UserQuestModel,
  Addresses,
  MessageModel,
  NotificationModel,
  MarketingModel,
  RadMorphModel,
  MailerLiteModel
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
import type { OneTimePasswordController } from '$lib/server/otp/controller'
import type { NotificationController } from '$lib/server/notification/controller'
import type { RadmorphController } from './radmorph/controller'

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
  oneTimePasswordController: OneTimePasswordController
  notificationController: NotificationController
  radmorphController: RadmorphController
}

export type ControllerDependencies = {
  userModel: ReturnType<UserModel>
  mailerLiteModel: ReturnType<MailerLiteModel>
  transactionModel: ReturnType<TransactionModel>
  auditModel: ReturnType<AuditModel>
  gatewayApi: ReturnType<typeof GatewayApi>
  userQuestModel: ReturnType<UserQuestModel>
  accountAddressModel: ReturnType<AccountAddressModel>
  messageModel: ReturnType<MessageModel>
  notificationModel: ReturnType<NotificationModel>
  marketingModel: ReturnType<MarketingModel>
  radMorphModel: ReturnType<RadMorphModel>
  logger: AppLogger
  dbClient: PrismaClient
  addresses: Addresses
  authModel: ReturnType<typeof AuthModel>
  config: Config
  jwt: JWT
}
