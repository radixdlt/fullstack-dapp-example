import { ResultAsync } from 'neverthrow'
import { createUser } from './create-user'
import crypto from 'node:crypto'
import { RadixEngineToolkit, PrivateKey, PublicKey } from '@radixdlt/radix-engine-toolkit'
import { PrismaClient } from 'database'

export const secureRandom = (byteCount: number): string =>
  crypto.randomBytes(byteCount).toString('hex')

export type CreateAccountInput = {
  privateKeyHex?: string
  networkId?: number
  referredBy?: string
}
export const AccountHelper = (dbClient: PrismaClient) => {
  const createAccount = (input?: CreateAccountInput) => {
    const { privateKeyHex = secureRandom(32), networkId = 1, referredBy } = input || {}
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

    return ResultAsync.combine([getAccountAddress(), getIdentityAddress()])
      .andThen(([accountAddress, identityAddress]) =>
        ResultAsync.fromPromise(
          createUser(dbClient)(identityAddress, accountAddress, referredBy),
          (error) => error as Error
        )
      )
      .map((user) => ({ user, privateKey, publicKey }))
  }

  return { createAccount }
}
