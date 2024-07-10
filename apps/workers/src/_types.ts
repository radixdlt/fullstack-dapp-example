import { TransactionHelperError } from 'typescript-wallet'

export type WorkerError = (typeof WorkerError)[keyof typeof WorkerError]
export const WorkerError = {
  FailedToGetUserFromDb: 'FailedToGetUserFromDb',
  FailedToSubmitToRadixNetwork: 'FailedToSubmitToRadixNetwork',
  FailedToPollTransactionStatus: 'FailedToPollTransactionStatus',
  FailedToGetManifestBuilder: 'FailedToGetManifestBuilder',
  FailedToGetPartialRewards: 'FailedToGetPartialRewards',
  FailedToSendReferralRewards: 'FailedToSendReferralRewards',
  FailedToConvertStringManifest: 'FailedToConvertStringManifest',
  FailedToSetTransactionId: 'FailedToSetTransactionId',
  FailedToGetTotalRewardedUsdAmount: 'FailedToGetTotalRewardedUsdAmount',
  FailedToSetPendingStatus: 'FailedToSetPendingStatus',
  FailedToSetCompletedStatus: 'FailedToSetCompletedStatus',
  FailedToGetUserIdFromBadgeId: 'FailedToGetUserIdFromBadgeId',
  FailedToGetXrdPrice: 'FailedToGetXrdPrice',
  FailedToAddAuditEntry: 'FailedToAddAuditEntry',
  FailedToGetTransactionFromDb: 'FailedToGetTransactionFromDb',
  MissingTransactionInDb: 'MissingTransactionInDb',
  UnhandledJob: 'UnhandledJob',
  FeatureDisabled: 'FeatureDisabled',
  FailedToSendMessage: 'FailedToSendMessage',
  GatewayError: 'GatewayError',
  HeroBadgeAlreadyClaimed: 'HeroBadgeAlreadyClaimed',
  FailedToExecuteDbTransaction: 'FailedToExecuteDbTransaction',
  FailedToDeriveUserIdFromBadgeId: 'FailedToDeriveUserIdFromBadgeId',
  UserNotFound: 'UserNotFound',
  UserDisabledXrdDeposit: 'UserDisabledXrdDeposit',
  FailedToCreateMessageInDb: 'FailedToCreateMessageInDb',
  FailedToUpdateTransactionIntentStatus: 'FailedToUpdateTransactionIntentStatus',
  FailedToUpdateReferralReward: 'FailedToUpdateReferralReward',
  FailedToGetKeyPairs: 'FailedToGetKeyPairs',
  TransactionFailed: 'TransactionFailed'
} as const

export type WorkerOutputError = { reason: WorkerError | TransactionHelperError; jsError?: unknown }
