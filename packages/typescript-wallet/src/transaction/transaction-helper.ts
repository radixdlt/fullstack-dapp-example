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
      typedError
    )

  const transformStringManifest = (
    stringManifest: string,
    blobs: Uint8Array[] = []
  ): ResultAsync<TransactionManifest, Error> =>
    ResultAsync.fromPromise(
      RadixEngineToolkit.Instructions.convert(
        { kind: 'String', value: stringManifest },
        networkId,
        'Parsed'
      ),
      typedError
    ).map((instructions) => ({ instructions, blobs }))

  const getTransactionIntentHash = (notarizedTransaction: NotarizedTransaction) =>
    ResultAsync.fromPromise(
      RadixEngineToolkit.Intent.hash(notarizedTransaction.signedIntent.intent),
      typedError
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

  const getTransactionBuilder = () => ResultAsync.fromSafePromise(TransactionBuilder.new())

  const createNotaryKeyPair = () => new PrivateKey.Ed25519(secureRandom(32))

  const createSignedNotarizedTransaction = (
    transactionManifest: TransactionManifest,
    message?: Message
  ) => {
    const notaryPrivateKey = createNotaryKeyPair()
    return ResultAsync.combine([
      getTransactionBuilder(),
      createTransactionHeader(notaryPrivateKey.publicKey())
    ])
      .map(([builder, transactionHeader]) => builder.header(transactionHeader))
      .map((builder) => (message ? builder.message(message) : builder))
      .map((builder) => builder.manifest(transactionManifest))
      .andThen(onSignature)
      .map((builder) => builder.notarize(notaryPrivateKey))
  }

  const compileNotarizedTransaction = (notarizedTransaction: NotarizedTransaction) =>
    ResultAsync.fromPromise(
      RadixEngineToolkit.NotarizedTransaction.compile(notarizedTransaction),
      typedError
    ).map((byteArray) => Buffer.from(byteArray).toString('hex'))

  const submitTransaction = (
    transactionManifest: TransactionManifest | string,
    message?: Message
  ) =>
    (typeof transactionManifest === 'string'
      ? transformStringManifest(transactionManifest)
      : okAsync(transactionManifest)
    ).andThen((transactionManifest) =>
      buildTransaction(transactionManifest, message).andThen(
        ({ compiledTransactionHex, transactionId }) =>
          submitNotarizedTransactionHex(compiledTransactionHex).map(() => ({
            transactionId,
            pollTransactionStatus: () => pollTransactionStatus(transactionId)
          }))
      )
    )

  const getTransactionStatus = (txId: string) =>
    ResultAsync.fromPromise(
      gatewayClient.gatewayApiClient.transaction.getStatus(txId),
      (error) => error as Error
    )

  type PollTransactionStatusError = keyof typeof PollTransactionStatusError
  const PollTransactionStatusError = {
    GatewayError: 'GatewayError',
    TransactionFailed: 'TransactionFailed'
  } as const

  const pollTransactionStatus = (
    transactionId: string
  ): ResultAsync<
    undefined,
    { jsError?: Error; reason: PollTransactionStatusError; transactionId: string }
  > =>
    ResultAsync.fromPromise<
      TransactionStatusResponse,
      { jsError: Error; reason: PollTransactionStatusError; transactionId: string }
    >(
      new Promise(async (resolve, reject) => {
        let response: TransactionStatusResponse | undefined
        let retry = 0

        while (!response) {
          const result = await getTransactionStatus(transactionId)

          if (result.isErr()) return reject(result.error)

          logger?.debug({
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
        jsError: error as Error,
        reason: PollTransactionStatusError.GatewayError,
        transactionId
      })
    ).andThen((response) =>
      response.status === 'CommittedSuccess'
        ? ok(undefined)
        : err({ reason: PollTransactionStatusError.TransactionFailed, transactionId })
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

  return { submitTransaction, getXrdFromFaucet, transformStringManifest, pollTransactionStatus }
}
