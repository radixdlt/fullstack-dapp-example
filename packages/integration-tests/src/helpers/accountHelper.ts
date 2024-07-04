import { ResultAsync } from 'neverthrow'
import { createUser } from './create-user'
import crypto from 'node:crypto'
import { RadixEngineToolkit, PrivateKey, PublicKey } from '@radixdlt/radix-engine-toolkit'
import { PrismaClient } from 'database'
import { TransactionHelper } from 'typescript-wallet'
import { AppLogger } from 'common'

export const secureRandom = (byteCount: number): string =>
  crypto.randomBytes(byteCount).toString('hex')

export type Account = ReturnType<
  Awaited<ReturnType<AccountHelper['createAccount']>>['_unsafeUnwrap']
>
export type CreateAccountInput = {
  privateKeyHex?: string
  networkId?: number
  referredBy?: string
  logger?: AppLogger
}
export type AccountHelper = ReturnType<typeof AccountHelper>
export const AccountHelper = (dbClient: PrismaClient) => {
  const createAccount = (input?: CreateAccountInput) => {
    const { privateKeyHex = secureRandom(32), networkId = 1, referredBy, logger } = input || {}
    const privateKey = new PrivateKey.Ed25519(privateKeyHex)

    const publicKey = new PublicKey.Ed25519(privateKey.publicKeyHex())

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
      networkId: networkId,
      privateKeyHex: privateKeyHex,
      logger
    })

    return ResultAsync.combine([getAccountAddress(), getIdentityAddress()])
      .andThen(([accountAddress, identityAddress]) =>
        ResultAsync.fromPromise(
          createUser(dbClient)(identityAddress, accountAddress, referredBy),
          (error) => error as Error
        )
      )
      .map((user) => ({
        user,
        privateKey,
        publicKey,
        submitTransaction,
        getXrdFromFaucet: () =>
          getXrdFromFaucet({ address: user.accountAddress! }).andThen(
            ({ pollTransactionStatus, transactionId }) => {
              console.log({ transactionId })
              return pollTransactionStatus()
            }
          )
      }))
  }

  return { createAccount }
}
