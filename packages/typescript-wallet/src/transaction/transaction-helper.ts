import { TransactionStatusResponse } from '@radixdlt/radix-dapp-toolkit'
import {
  ManifestBuilder,
  Message,
  NotarizedTransaction,
  PrivateKey,
  PublicKey,
  RadixEngineToolkit,
  TransactionBuilder,
  TransactionBuilderIntentSignaturesStep,
  TransactionHeader,
  TransactionManifest,
  bucket,
  decimal,
  generateRandomNonce
} from '@radixdlt/radix-engine-toolkit'
import { typedError, GatewayApi, AppLogger } from 'common'
import { ResultAsync, err, ok, okAsync } from 'neverthrow'
import { secureRandom } from '../helpers'

export type TransactionHelperError =
  (typeof TransactionHelperError)[keyof typeof TransactionHelperError]
export const TransactionHelperError = {
  FailedToConvertStringManifest: 'FailedToConvertStringManifest',
  FailedToGetTransactionIntentHash: 'FailedToGetTransactionIntentHash',
  GatewayError: 'GatewayError',
  FailedToSignTransaction: 'FailedToSignTransaction',
  FailedToNotarizeTransaction: 'FailedToNotarizeTransaction',
  FailedToCompileNotarizedTransaction: 'FailedToCompileNotarizedTransaction',
  TransactionFailed: 'TransactionFailed',
  FailedToSubmitTransaction: 'FailedToSubmitTransaction',
  FailedToExecuteTransactionIdCallback: 'FailedToExecuteTransactionIdCallback'
} as const

export type TransactionHelper = ReturnType<typeof TransactionHelper>

export const TransactionHelper = ({
  networkId,
  onSignature,
  logger
}: {
  networkId: number
  onSignature: (
    builder: TransactionBuilderIntentSignaturesStep
  ) => ResultAsync<TransactionBuilderIntentSignaturesStep, Error>
  logger?: AppLogger
}) => {
  const gatewayClient = GatewayApi(networkId)

  const submitNotarizedTransactionHex = (notarized_transaction_hex: string) =>
    ResultAsync.fromPromise(
      gatewayClient.gatewayApiClient.transaction.innerClient.transactionSubmit({
        transactionSubmitRequest: {
          notarized_transaction_hex
        }
      }),
      (error) => ({ reason: TransactionHelperError.FailedToSubmitTransaction, jsError: error })
    )

  const transformStringManifest = (stringManifest: string, blobs: Uint8Array[] = []) =>
    ResultAsync.fromPromise(
      RadixEngineToolkit.Instructions.convert(
        { kind: 'String', value: stringManifest },
        networkId,
        'Parsed'
      ),
      typedError
    )
      .map((instructions) => ({ instructions, blobs }))
      .mapErr((error) => {
        logger?.error(stringManifest)

        return {
          reason: TransactionHelperError.FailedToConvertStringManifest,
          jsError: error
        }
      })

  const getTransactionIntentHash = (notarizedTransaction: NotarizedTransaction) =>
    ResultAsync.fromPromise(
      RadixEngineToolkit.Intent.hash(notarizedTransaction.signedIntent.intent),
      (error) => ({
        reason: TransactionHelperError.FailedToGetTransactionIntentHash,
        jsError: error
      })
    )

  const buildTransaction = (transactionManifest: TransactionManifest, message?: Message) =>
    createSignedNotarizedTransaction(transactionManifest, message).andThen((notarizedTransaction) =>
      ResultAsync.combine([
        compileNotarizedTransaction(notarizedTransaction),
        getTransactionIntentHash(notarizedTransaction)
      ]).map(([compiledTransactionHex, { id }]) => ({
        notarizedTransaction,
        transactionId: id,
        compiledTransactionHex
      }))
    )

  const createTransactionHeader = (notaryPublicKey: PublicKey) =>
    gatewayClient
      .callApi('getCurrent')
      .map((value) => value.ledger_state.epoch)
      .map(
        (epoch): TransactionHeader => ({
          networkId /* The network that this transaction is destined to */,
          startEpochInclusive:
            epoch /* The start epoch (inclusive) of when this transaction becomes valid */,
          endEpochExclusive:
            epoch + 2 /* The end epoch (exclusive) of when this transaction is no longer valid */,
          nonce: generateRandomNonce() /* A random nonce */,
          notaryPublicKey /* The public key of the notary */,
          notaryIsSignatory:
            true /* Whether the notary signature is also considered as an intent signature */,
          tipPercentage: 0 /* The percentage of fees that goes to validators */
        })
      )
      .mapErr((error) => ({ reason: TransactionHelperError.GatewayError, jsError: error }))

  const getTransactionBuilder = () => ResultAsync.fromSafePromise(TransactionBuilder.new())

  const createNotaryKeyPair = () => new PrivateKey.Ed25519(secureRandom(32))

  const createSignedNotarizedTransaction = (
    transactionManifest: TransactionManifest,
    message?: Message
  ): ResultAsync<
    NotarizedTransaction,
    {
      reason: 'GatewayError' | 'FailedToSignTransaction' | 'FailedToNotarizeTransaction'
      jsError: unknown
    }
  > => {
    const notaryPrivateKey = createNotaryKeyPair()
    return ResultAsync.combine([
      getTransactionBuilder(),
      createTransactionHeader(notaryPrivateKey.publicKey())
    ])
      .map(([builder, transactionHeader]) => builder.header(transactionHeader))
      .map((builder) => (message ? builder.message(message) : builder))
      .map((builder) => builder.manifest(transactionManifest))
      .andThen((builder) =>
        onSignature(builder).mapErr((error) => ({
          reason: TransactionHelperError.FailedToSignTransaction,
          jsError: error
        }))
      )
      .andThen((builder) =>
        ResultAsync.fromPromise(builder.notarize(notaryPrivateKey), (error) => ({
          reason: TransactionHelperError.FailedToNotarizeTransaction,
          jsError: error
        }))
      )
  }

  const compileNotarizedTransaction = (notarizedTransaction: NotarizedTransaction) =>
    ResultAsync.fromPromise(
      RadixEngineToolkit.NotarizedTransaction.compile(notarizedTransaction),
      typedError
    )
      .map((byteArray) => Buffer.from(byteArray).toString('hex'))
      .mapErr((error) => ({
        reason: TransactionHelperError.FailedToCompileNotarizedTransaction,
        jsError: error as Error
      }))

  const submitTransaction = (
    transactionManifest: TransactionManifest | string,
    optional?: Partial<{
      blobs: Uint8Array[]
      message: Message
      onTransactionId: (transactionId: string) => ResultAsync<any, unknown>
    }>
  ): ResultAsync<
    { transactionId: string; response: TransactionStatusResponse },
    { reason: TransactionHelperError; transactionId?: string }
  > => {
    const message = optional?.message
    const onTransactionId = optional?.onTransactionId ?? (() => okAsync(undefined))
    if (typeof transactionManifest === 'string') logger?.trace({ transactionManifest })
    return (
      typeof transactionManifest === 'string'
        ? transformStringManifest(transactionManifest, optional?.blobs)
        : okAsync(transactionManifest)
    ).andThen((transactionManifest) =>
      buildTransaction(transactionManifest, message).andThen(
        ({ compiledTransactionHex, transactionId }) =>
          onTransactionId(transactionId)
            .mapErr((error) => ({
              reason: TransactionHelperError.FailedToExecuteTransactionIdCallback,
              jsError: error,
              transactionId
            }))
            .andThen(() =>
              submitNotarizedTransactionHex(compiledTransactionHex).andThen(() =>
                pollTransactionStatus(transactionId).map((response) => ({
                  transactionId,
                  response
                }))
              )
            )
      )
    )
  }

  const getTransactionStatus = (txId: string) =>
    ResultAsync.fromPromise(
      gatewayClient.gatewayApiClient.transaction.getStatus(txId),
      (error) => error as Error
    )

  const pollTransactionStatus = (transactionId: string) =>
    ResultAsync.fromPromise<
      TransactionStatusResponse,
      { jsError: unknown; reason: TransactionHelperError; transactionId: string }
    >(
      new Promise(async (resolve, reject) => {
        let response: TransactionStatusResponse | undefined
        let retry = 0

        logger?.trace({
          method: 'pollTransactionStatus',
          transactionId
        })

        while (!response) {
          const result = await getTransactionStatus(transactionId)

          if (result.isErr()) return reject(result.error)

          logger?.trace({
            method: 'pollTransactionStatus',
            transactionId,
            retry,
            status: result.value.status
          })

          if (result.value.status !== 'Pending') {
            response = result.value
            break
          }

          retry = retry + 1
          await new Promise((resolve) => setTimeout(resolve, 2000))
        }

        resolve(response)
      }),
      (error) => ({
        jsError: error,
        reason: TransactionHelperError.GatewayError,
        transactionId
      })
    ).andThen((response) =>
      response.status === 'CommittedSuccess'
        ? ok(response)
        : err({ reason: TransactionHelperError.TransactionFailed, transactionId })
    )

  const getKnownAddresses = () =>
    ResultAsync.fromPromise(RadixEngineToolkit.Utils.knownAddresses(networkId), typedError)

  const getXrdFromFaucet = ({
    address,
    accessController
  }: {
    address: string
    accessController?: string
  }) =>
    getKnownAddresses()
      .map((wellKnownAddresses): TransactionManifest => {
        const manifestBuilder = new ManifestBuilder()
        if (accessController) manifestBuilder.callMethod(accessController, 'create_proof', [])
        return manifestBuilder
          .callMethod(wellKnownAddresses.componentAddresses.faucet, 'lock_fee', [decimal(10)])
          .callMethod(wellKnownAddresses.componentAddresses.faucet, 'free', [])
          .takeAllFromWorktop(wellKnownAddresses.resourceAddresses.xrd, (builder, bucketId) =>
            builder.callMethod(address, 'deposit', [bucket(bucketId)])
          )
          .build()
      })
      .andThen(submitTransaction)

  const getCommittedDetails = (txId: string) =>
    ResultAsync.fromPromise(
      gatewayClient.gatewayApiClient.transaction.getCommittedDetails(txId),
      (error) => error as Error
    ).map((res) => ({
      epoch: res.transaction.epoch,
      round: res.transaction.round,
      status: res.transaction.transaction_status,
      date: res.transaction.confirmed_at,
      fee: res.transaction.fee_paid,
      message: (res.transaction.message as any)?.content?.value,
      encodedManifest: res.transaction.raw_hex,
      receipt: res.transaction.receipt,
      events: res.transaction.receipt?.events,
      affectedEntities: res.transaction.affected_global_entities || [],
      createdEntities:
        ((res.transaction.receipt?.state_updates as any)?.new_global_entities as any[]) || [],
      stateVersion: res.transaction.state_version
    }))

  const getCreatedEntities = (txId: string) =>
    getCommittedDetails(txId).map((res) => res.createdEntities)

  return {
    submitTransaction,
    getXrdFromFaucet,
    transformStringManifest,
    pollTransactionStatus,
    getKnownAddresses,
    getCommittedDetails,
    getCreatedEntities
  }
}
