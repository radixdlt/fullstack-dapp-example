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
  Addresses
} from 'common'
import type { PrismaClient } from 'database'
import type { ResultAsync } from 'neverthrow'
import type { AuthModel } from './auth/model'
import type { Config } from '$lib/config'
import type { JWT } from './auth/jwt'

export type ControllerMethodOutput<T = any> = ResultAsync<
  { data: T; httpResponseCode: number },
  ApiError
>

export type ControllerMethodContext = {
  logger: AppLogger
  traceId: string
}

export type ControllerDependencies = {
  userModel: ReturnType<UserModel>
  transactionModel: ReturnType<TransactionModel>
  auditModel: ReturnType<AuditModel>
  gatewayApi: ReturnType<typeof GatewayApi>
  userQuestModel: ReturnType<UserQuestModel>
  accountAddressModel: ReturnType<AccountAddressModel>
  logger: AppLogger
  dbClient: PrismaClient
  addresses: Addresses
  authModel: ReturnType<typeof AuthModel>
  config: Config
  jwt: JWT
}
