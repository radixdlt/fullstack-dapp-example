import {
  ManifestBuilder,
  ManifestSborStringRepresentation,
  NotarizedTransaction,
  PrivateKey,
  PublicKey,
  RadixEngineToolkit,
  TransactionBuilder,
  TransactionHeader,
  TransactionManifest,
  bucket,
  decimal,
  generateRandomNonce
} from '@radixdlt/radix-engine-toolkit'
import { Result, ResultAsync, err, ok } from 'neverthrow'
import { typedError } from '../helpers/typed-error'
import { mnemonicToKeyPair } from '../helpers/mnemonicToKeyPair'
import { GatewayClient } from './gateway-client'
import { logger } from '../helpers/logger'
import { GatewayApi } from 'common'

const getSignerKeys = (mnemonic: string, derivationPath: string) => {
  const { privateKey } = mnemonicToKeyPair(mnemonic, derivationPath).unwrapOr({
    privateKey: ''
  })

  if (!privateKey) return err('Unable to derive private key')

  const signerPrivateKey = new PrivateKey.Ed25519(privateKey)

  const signerPublicKey = new PublicKey.Ed25519(signerPrivateKey.publicKeyHex())

  return ok({
    privateKey: signerPrivateKey,
    publicKey: signerPublicKey,
    publicKeyHex: Buffer.from(signerPublicKey.publicKey).toString('hex')
  })
}

const deriveAccountAddressFromPublicKey = (publicKey: PublicKey, networkId: number) => {
  return ResultAsync.fromPromise(
    RadixEngineToolkit.Derive.virtualAccountAddressFromPublicKey(publicKey, networkId),
    typedError
  )
}

const deriveIdentityAddressFromPublicKey = (publicKey: PublicKey, networkId: number) => {
  return ResultAsync.fromPromise(
    RadixEngineToolkit.Derive.virtualIdentityAddressFromPublicKey(publicKey, networkId),
    typedError
  )
}

export type RadixEngineClient = ReturnType<typeof RadixEngineClient>
export const RadixEngineClient = <
  const T extends {
    [accountName: string]: number
  }
>({
  mnemonic,
  accounts,
  gatewayApi
}: {
  mnemonic: string
  accounts: T
  gatewayApi: GatewayApi
}) => {
  const networkConfig = gatewayApi.networkConfig
  const { networkId, dashboardUrl } = networkConfig

  const KEY_TYPE = {
    TRANSACTION_SIGNING: 1460,
    AUTHENTICATION_SIGNING: 1678,
    MESSAGE_ENCRYPTION: 1391
  } as const

  const ENTITY_TYPE = {
    ACCOUNT: 525,
    IDENTITY: 618
  } as const

  const result = Result.combine(
    Object.entries(accounts).map(([name, derivationIndex]) =>
      getSignerKeys(
        mnemonic,
        `m/44'/1022'/${networkId}'/${ENTITY_TYPE.ACCOUNT}'/${KEY_TYPE.TRANSACTION_SIGNING}'/${derivationIndex}'`
      ).map(({ publicKey, privateKey }) => ({
        name,
        publicKey,
        privateKey
      }))
    )
  )

  if (result.isErr()) throw result.error

  const accountKeys = Object.fromEntries(
    result.value.map(({ name, publicKey, privateKey }) => [name, { publicKey, privateKey }])
  ) as { [n in keyof T]: Omit<(typeof result.value)[0], 'name'> }

  const getIdentityAddressAtDerivationIndex = (derivationIndex: number) =>
    getSignerKeys(
      mnemonic,
      `m/44'/1022'/${networkId}'/${ENTITY_TYPE.IDENTITY}'/${KEY_TYPE.AUTHENTICATION_SIGNING}'/${derivationIndex}'`
    )
      .map(({ publicKey, privateKey }) => ({
        publicKey,
        privateKey
      }))
      .asyncAndThen((item) => deriveIdentityAddressFromPublicKey(item.publicKey, networkId))

  const payerKeys = result.value[0]

  const gatewayClient = GatewayClient(gatewayApi)

  const getAccountAddress = () =>
    ResultAsync.combine(
      result.value.map(({ name, publicKey }) =>
        deriveAccountAddressFromPublicKey(publicKey, networkId).map((accountAddress) => ({
          name,
          accountAddress
        }))
      )
    ).map(
      (value) =>
        Object.fromEntries(value.map(({ name, accountAddress }) => [name, accountAddress])) as {
          [n in keyof T]: string
        }
    )

  const getKnownAddresses = () =>
    ResultAsync.fromPromise(RadixEngineToolkit.Utils.knownAddresses(networkId), typedError)

  const createTransactionHeader = (signerPublicKey: PublicKey) =>
    gatewayClient.getEpoch().map(
      (epoch): TransactionHeader => ({
        networkId /* The network that this transaction is destined to */,
        startEpochInclusive:
          epoch /* The start epoch (inclusive) of when this transaction becomes valid */,
        endEpochExclusive:
          epoch + 2 /* The end epoch (exclusive) of when this transaction is no longer valid */,
        nonce: generateRandomNonce() /* A random nonce */,
        notaryPublicKey: signerPublicKey /* The public key of the notary */,
        notaryIsSignatory:
          true /* Whether the notary signature is also considered as an intent signature */,
        tipPercentage: 0 /* The percentage of fees that goes to validators */
      })
    )

  const getTransactionBuilder = () => ResultAsync.fromPromise(TransactionBuilder.new(), typedError)

  const compileNotarizedTransaction = (
    notarizedTransactionPromise: Promise<NotarizedTransaction>
  ) =>
    ResultAsync.fromPromise(notarizedTransactionPromise, typedError)
      .andThen((notarizedTransaction) =>
        ResultAsync.fromPromise(
          RadixEngineToolkit.NotarizedTransaction.compile(notarizedTransaction),
          typedError
        )
      )
      .map((byteArray) => Buffer.from(byteArray).toString('hex'))

  const getTransactionIntentHash = (notarizedTransaction: Promise<NotarizedTransaction>) =>
    ResultAsync.fromPromise(notarizedTransaction, typedError).andThen((notarizedTransaction) =>
      ResultAsync.fromPromise(
        RadixEngineToolkit.Intent.hash(notarizedTransaction.signedIntent.intent),
        typedError
      )
    )

  const createSignedNotarizedTransaction = (
    transactionManifest: TransactionManifest,
    signers: (keyof T)[]
  ) => {
    const signer = accountKeys[signers[0] ?? payerKeys.name]

    return ResultAsync.combine([getTransactionBuilder(), createTransactionHeader(signer.publicKey)])
      .map(([builder, transactionHeader]) => {
        return {
          builder,
          transactionHeader
        }
      })
      .andThen(({ builder, transactionHeader }) => {
        try {
          let signStep = builder.header(transactionHeader).manifest(transactionManifest)

          for (const signer of signers) {
            signStep = signStep.sign(accountKeys[signer].privateKey)
          }

          return ok(signStep.sign(payerKeys.privateKey).notarize(signer.privateKey))
        } catch (error) {
          return err(error)
        }
      })
  }

  const getAddresses = () =>
    getAccountAddress().andThen((accountAddress) =>
      getKnownAddresses().map((knownAddresses) => ({
        networkId: networkId,
        accountAddress,
        ...knownAddresses
      }))
    )

  const buildTransaction = (transactionManifest: TransactionManifest, signers: (keyof T)[]) =>
    createSignedNotarizedTransaction(transactionManifest, signers).andThen((notarizedTransaction) =>
      ResultAsync.combine([
        compileNotarizedTransaction(notarizedTransaction),
        getTransactionIntentHash(notarizedTransaction)
      ]).map(([compiledTransactionHex, { id }]) => ({
        notarizedTransaction,
        txId: id,
        compiledTransactionHex
      }))
    )

  const submitTransaction = (transactionManifest: TransactionManifest, signers: (keyof T)[]) => {
    convertParsedManifest(transactionManifest).map((data) => {
      logger.debug(`Submitting transaction`)
      logger.debug(data.instructions.value)
    })

    return buildTransaction(transactionManifest, signers)
      .andThen(({ compiledTransactionHex: notarized_transaction_hex, txId }) => {
        logger.debug(`${dashboardUrl}/transaction/${txId}`)
        return gatewayClient
          .submitNotarizedTransactionHex(notarized_transaction_hex)
          .map((response) => ({ ...response, txId }))
      })
      .mapErr((error) => {
        logger.error(error)
        return error
      })
  }

  const decodeSbor = (rpdBuffer: Buffer) =>
    ResultAsync.fromPromise(
      RadixEngineToolkit.ManifestSbor.decodeToString(
        rpdBuffer,
        networkId,
        ManifestSborStringRepresentation.ManifestString
      ),
      typedError
    )

  const convertParsedManifest = (
    transactionManifest: TransactionManifest
  ): ResultAsync<TransactionManifest, Error> =>
    ResultAsync.fromPromise(
      RadixEngineToolkit.Instructions.convert(
        transactionManifest.instructions,
        networkId,
        'String'
      ),
      typedError
    ).map((instructions) => ({ instructions, blobs: [] }))

  const convertStringManifest = (
    stringManifest: string,
    blobs: Uint8Array[] = []
  ): ResultAsync<TransactionManifest, Error> => {
    return ResultAsync.fromPromise(
      RadixEngineToolkit.Instructions.convert(
        { kind: 'String', value: stringManifest },
        networkId,
        'Parsed'
      ),
      typedError
    )
      .map((instructions) => ({ instructions, blobs }))
      .mapErr((err) => {
        console.log(err)
        return err
      })
  }

  const getXrdFromFaucet = () => {
    return getManifestBuilder().andThen(({ builder, wellKnownAddresses, submitTransaction }) => {
      return submitTransaction(
        builder
          .callMethod(wellKnownAddresses.componentAddresses.faucet, 'lock_fee', [decimal(10)])
          .callMethod(wellKnownAddresses.componentAddresses.faucet, 'free', [])
          .takeAllFromWorktop(wellKnownAddresses.resourceAddresses.xrd, (builder, bucketId) =>
            builder.callMethod(wellKnownAddresses.accountAddress[payerKeys.name], 'deposit', [
              bucket(bucketId)
            ])
          )

          .build(),
        []
      ).andThen(({ txId }) => gatewayClient.pollTransactionStatus(txId).map(() => txId))
    })
  }

  const getManifestBuilder = () =>
    getAddresses().map((wellKnownAddresses) => {
      return {
        builder: new ManifestBuilder(),
        wellKnownAddresses,
        convertStringManifest,
        submitTransaction
      }
    })

  return {
    getAccounts: getAccountAddress,
    getAccountAddress,
    getAddresses,
    buildTransaction,
    submitTransaction,
    getManifestBuilder,
    getSignerKeys,
    gatewayClient,
    decodeSbor,
    convertStringManifest,
    getXrdFromFaucet,
    getIdentityAddressAtDerivationIndex
  }
}
