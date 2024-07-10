import { PublicKey, RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import { ResultAsync } from 'neverthrow'
import { typedError } from '../helpers/typed-error'

export const deriveAccountAddressFromPublicKey = (publicKey: PublicKey, networkId: number) => {
  return ResultAsync.fromPromise(
    RadixEngineToolkit.Derive.virtualAccountAddressFromPublicKey(publicKey, networkId),
    typedError
  )
}
