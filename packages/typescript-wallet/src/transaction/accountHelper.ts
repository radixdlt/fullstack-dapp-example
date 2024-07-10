import { ResultAsync, okAsync } from 'neverthrow'
import crypto from 'node:crypto'
import { RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import { PrismaClient } from 'database'
import { TransactionHelper } from './transaction-helper'
import { AppLogger, createUser } from 'common'
import { generateMnemonic, getDerivationPath, mnemonicToKeyPair } from '../helpers'

export const secureRandom = (byteCount: number): string =>
  crypto.randomBytes(byteCount).toString('hex')

export type Account = ReturnType<
  Awaited<ReturnType<AccountHelper['createAccount']>>['_unsafeUnwrap']
>
export type CreateAccountInput = {
  mnemonic?: string
  networkId?: number
  referredBy?: string
  logger?: AppLogger
  derivationPath?: string
}
export type AccountHelper = ReturnType<typeof AccountHelper>
export const AccountHelper = (dbClient: PrismaClient) => {
  const createAccount = (input?: CreateAccountInput) => {
    const {
      mnemonic = generateMnemonic(),
      networkId = 1,
      referredBy,
      logger,
      derivationPath
    } = input || {}

    const keyPairResult = mnemonicToKeyPair(
      mnemonic,
      derivationPath ?? getDerivationPath(networkId)
    )

    if (keyPairResult.isErr()) throw new Error('Unable to derive key pair from mnemonic')

    const { privateKey, publicKey } = keyPairResult.value

    const getAccountAddress = () =>
      ResultAsync.fromPromise(
        RadixEngineToolkit.Derive.virtualAccountAddressFromPublicKey(publicKey, networkId),
        (error) => error as Error
      )

    const getIdentityAddress = () =>
      ResultAsync.fromPromise(
        RadixEngineToolkit.Derive.virtualIdentityAddressFromPublicKey(publicKey, networkId),
        (error) => error as Error
      )

    const { submitTransaction, getXrdFromFaucet } = TransactionHelper({
      networkId,
      onSignature: (builder) => okAsync(builder.sign(privateKey)),
      logger
    })

    return ResultAsync.combine([getAccountAddress(), getIdentityAddress()])
      .andThen(([accountAddress, identityAddress]) =>
        createUser(dbClient)({ identityAddress, accountAddress, referredBy })
      )
      .map((user) => ({
        user,
        privateKey,
        publicKey,
        submitTransaction,
        getXrdFromFaucet: () => getXrdFromFaucet({ address: user.accountAddress! })
      }))
  }

  return { createAccount }
}
