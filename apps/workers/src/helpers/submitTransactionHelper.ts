import { ResultAsync, okAsync, errAsync, err } from 'neverthrow'
import { TransactionHelper } from 'typescript-wallet'
import { WorkerError, WorkerOutputError } from '../_types'
import { VerifyTransaction } from './verifyTransaction'

export type SubmitTransactionHelper = ReturnType<typeof SubmitTransactionHelper>
export const SubmitTransactionHelper = ({
  updateStatus,
  getLastSubmittedTransaction,
  createManifest,
  transactionHelper,
  verifyTransaction
}: {
  updateStatus: (
    transactionId: string,
    status: 'PENDING' | 'COMPLETED' | 'FAILED'
  ) => ResultAsync<undefined, WorkerOutputError>
  getLastSubmittedTransaction: (
    discriminator: string
  ) => ResultAsync<
    { transactionId: string; status: 'PENDING' | 'COMPLETED' | 'FAILED' } | undefined,
    WorkerOutputError
  >
  createManifest: () => ResultAsync<string, WorkerOutputError>
  transactionHelper: TransactionHelper
  verifyTransaction: VerifyTransaction
}) => {
  const pollTransactionId = (transactionId: string) =>
    transactionHelper
      .pollTransactionStatus(transactionId)
      .orElse((error) => updateStatus(transactionId, 'FAILED').andThen(() => err(error)))
      .andThen(() => updateStatus(transactionId, 'COMPLETED'))

  const submitTransaction = (manifest: string) =>
    transactionHelper
      .submitTransaction(manifest, {
        onTransactionId: (transactionId) => updateStatus(transactionId, 'PENDING')
      })
      .orElse((error) =>
        error.transactionId
          ? updateStatus(error.transactionId, 'FAILED').andThen(() => err(error))
          : err(error)
      )
      .andThen((response) => updateStatus(response.transactionId, 'COMPLETED'))

  const determineIfTransactionShouldBeSubmitted = (
    discriminator: string
  ): ResultAsync<
    {
      shouldSubmitTransaction: boolean
      shouldPollTransaction: boolean
      transactionId?: string
    },
    WorkerOutputError
  > => {
    return getLastSubmittedTransaction(discriminator).andThen((submittedTransaction) => {
      if (!submittedTransaction)
        return okAsync({
          shouldSubmitTransaction: true,
          shouldPollTransaction: false,
          transactionId: undefined
        })

      if (submittedTransaction.status === 'COMPLETED')
        return okAsync({
          shouldSubmitTransaction: false,
          shouldPollTransaction: false,
          transactionId: submittedTransaction.transactionId
        })

      return verifyTransaction(submittedTransaction.transactionId)
    })
  }

  return (discriminator: string) =>
    determineIfTransactionShouldBeSubmitted(discriminator).andThen(
      ({ shouldSubmitTransaction, shouldPollTransaction, transactionId }) => {
        if (shouldSubmitTransaction) return createManifest().andThen(submitTransaction)
        else if (transactionId)
          return shouldPollTransaction
            ? pollTransactionId(transactionId)
            : updateStatus(transactionId, 'COMPLETED')
        else return errAsync({ reason: WorkerError.UnhandledTransactionState })
      }
    )
}
