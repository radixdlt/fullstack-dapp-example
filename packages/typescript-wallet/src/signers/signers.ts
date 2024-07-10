import { TransactionBuilderIntentSignaturesStep } from '@radixdlt/radix-engine-toolkit'
import { mnemonicToKeyPair, getDerivationPath } from '../helpers/mnemonicToKeyPair'
import { Result, okAsync } from 'neverthrow'

export type SignerConfig = ReturnType<typeof SignerConfig>
export const SignerConfig = (networkId: number) => ({
  payer: mnemonicToKeyPair(
    process.env.PAYER_MNEMONIC!,
    getDerivationPath(networkId, 'TRANSACTION_SIGNING', 'ACCOUNT', 0)
  ),
  owner: mnemonicToKeyPair(
    process.env.OWNER_MNEMONIC!,
    getDerivationPath(networkId, 'TRANSACTION_SIGNING', 'ACCOUNT', 0)
  ),
  system: mnemonicToKeyPair(
    process.env.SYSTEM_MNEMONIC!,
    getDerivationPath(networkId, 'TRANSACTION_SIGNING', 'ACCOUNT', 0)
  ),
  dAppDefinition: mnemonicToKeyPair(
    process.env.DAPP_DEFINITION_MNEMONIC!,
    getDerivationPath(networkId, 'TRANSACTION_SIGNING', 'ACCOUNT', 0)
  )
})

export type GetSigners = keyof SignerConfig

export const getSigners = (networkId: number, ...signers: (keyof SignerConfig)[]) => {
  const config = SignerConfig(networkId)
  return Result.combine(signers.map((signerName) => config[signerName]))
}

export const withSigners =
  (networkId: number, ...signers: (keyof SignerConfig)[]) =>
  (builder: TransactionBuilderIntentSignaturesStep) =>
    getSigners(networkId, ...signers).asyncAndThen((keyPairs) => {
      keyPairs.forEach(({ privateKey }) => {
        builder.sign(privateKey)
      })
      return okAsync(builder)
    })
