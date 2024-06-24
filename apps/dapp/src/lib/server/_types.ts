/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  AppLogger,
  ApiError,
  UserModel,
  TransactionModel,
  AuditModel,
  GatewayApi,
  AccountAddressModel,
  UserQuestModel
} from 'common'
import type { ResultAsync } from 'neverthrow'

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
  accountAddressModel: AccountAddressModel
}
