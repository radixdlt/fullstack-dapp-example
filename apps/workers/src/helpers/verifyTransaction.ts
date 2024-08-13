import { GatewayApi } from 'common'
import { ResultAsync, errAsync, okAsync } from 'neverthrow'
import { WorkerError, WorkerOutputError } from '../_types'
import type { TransactionStatusResponse } from '@radixdlt/babylon-gateway-api-sdk'

type VerifyTransactionOutput = {
  shouldSubmitTransaction: boolean
  shouldPollTransaction: boolean
  transactionId: string
}

export const isTryingToSetImageOnBurntRadGem =
  (discriminator: string) =>
  (
    transactionId: string,
    response: TransactionStatusResponse
  ): VerifyTransactionOutput | undefined => {
    if (
      response?.error_message === 'SystemError(KeyValueEntryLocked)' &&
      discriminator.startsWith('CombinedElementsAddRadgemImage')
    )
      return {
        shouldSubmitTransaction: false,
        shouldPollTransaction: false,
        transactionId
      }

    return
  }

export const reachedMaxOpenedGiftBoxes = (
  transactionId: string,
  response: TransactionStatusResponse
): VerifyTransactionOutput | undefined => {
  if (response?.error_message?.includes('User has reached the maximum number of rewards records'))
    return {
      shouldSubmitTransaction: false,
      shouldPollTransaction: false,
      transactionId
    }
  return
}

export const questAlreadyCompleted = (
  transactionId: string,
  response: TransactionStatusResponse
): VerifyTransactionOutput | undefined => {
  if (response?.error_message?.includes('Quest already completed'))
    return {
      shouldSubmitTransaction: false,
      shouldPollTransaction: false,
      transactionId
    }
  return
}

export type VerifyTransactionHandler = (
  transactionId: string,
  response: TransactionStatusResponse
) => VerifyTransactionOutput | undefined

const defaultHandler = (
  transactionId: string,
  response: TransactionStatusResponse
): VerifyTransactionOutput => {
  switch (response.intent_status) {
    case 'CommittedSuccess':
      return {
        shouldSubmitTransaction: false,
        shouldPollTransaction: false,
        transactionId
      }
    case 'Pending':
    case 'CommitPendingOutcomeUnknown':
    case 'LikelyButNotCertainRejection':
    case 'Unknown':
      return {
        shouldSubmitTransaction: false,
        shouldPollTransaction: true,
        transactionId
      }

    case 'CommittedFailure':
    case 'PermanentlyRejected':
      return {
        shouldSubmitTransaction: true,
        shouldPollTransaction: false,
        transactionId
      }

    default:
      return {
        shouldSubmitTransaction: false,
        shouldPollTransaction: false,
        transactionId
      }
  }
}

export type VerifyTransaction = ReturnType<typeof VerifyTransaction>
export const VerifyTransaction =
  (gatewayApi: GatewayApi, handlers: VerifyTransactionHandler[]) =>
  (transactionId: string): ResultAsync<VerifyTransactionOutput, WorkerOutputError> =>
    gatewayApi
      .callApi('getStatus', transactionId)
      .map((response) => {
        for (const handler of handlers) {
          const result = handler(transactionId, response)
          if (result) return result
        }

        return defaultHandler(transactionId, response)
      })
      .orElse((error) => {
        switch (error.details?.type) {
          case 'NotSyncedUpError':
          case 'InternalServerError':
            return errAsync({ reason: WorkerError.GatewayError, jsError: error })

          case 'AccountLockerNotFoundError':
          case 'EntityNotFoundError':
          case 'InvalidEntityError':
          case 'InvalidRequestError':
          case 'InvalidTransactionError':
          case 'TransactionNotFoundError':
            return okAsync({
              shouldSubmitTransaction: false,
              shouldPollTransaction: false,
              transactionId
            })

          default:
            return okAsync({
              shouldSubmitTransaction: false,
              shouldPollTransaction: false,
              transactionId
            })
        }
      })
