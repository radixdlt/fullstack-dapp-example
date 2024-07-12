import { config } from '../config'
import { TransactionHelper } from './transaction-helper'
import { withSigners } from '../signers/signers'
import { appLogger } from 'common'
import { ResultAsync } from 'neverthrow'
import { Message } from '@radixdlt/radix-engine-toolkit'

const accounts = config.radQuest.accounts

export const transactionBuilder = ({
  transactionManifest,
  signers,
  optional
}: {
  transactionManifest: string
  signers: ('payer' | 'owner' | 'system')[]
  optional?: Partial<{
    blobs: Uint8Array[]
    message: Message
    onTransactionId: (transactionId: string) => ResultAsync<any, unknown>
  }>
}) => {
  const addManifestSignerProofs = (manifest: string) =>
    signers
      .map(
        (signer) => `
CALL_METHOD
  Address("${accounts[signer].accessController}")
  "create_proof"
;`
      )
      .join('') + manifest

  const transactionHelper = TransactionHelper({
    networkId: config.network.networkId,
    onSignature: withSigners(config.network.networkId, ...signers),
    logger: appLogger
  })

  return {
    helper: transactionHelper,
    submit: () =>
      transactionHelper.submitTransaction(addManifestSignerProofs(transactionManifest), optional)
  }
}
