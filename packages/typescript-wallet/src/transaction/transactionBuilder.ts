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
  signers: (
    | 'owner'
    | 'system'
    | 'dAppDefinition'
    | 'jetty'
    | 'jettySwapDappDefinition'
    | 'lettySwapDappDefinition'
  )[]
  optional?: Partial<{
    lockFee: number
    blobs: Uint8Array[]
    message: Message
    onTransactionId: (transactionId: string) => ResultAsync<any, unknown>
  }>
}) => {
  const addManifestSignerProofs = (manifest: string) =>
    `
CALL_METHOD
  Address("${accounts.payer.accessController}")
  "create_proof"
;
CALL_METHOD
    Address("${config.radQuest.accounts.payer.address}")
    "lock_fee"
    Decimal("${optional?.lockFee ?? 50}")
;` +
    signers
      .map(
        (signer) => `
CALL_METHOD
  Address("${accounts[signer].accessController}")
  "create_proof"
;`
      )
      .join('') +
    manifest

  const transactionHelper = TransactionHelper({
    networkId: config.network.networkId,
    onSignature: withSigners(config.network.networkId, 'payer', ...signers),
    logger: appLogger
  })

  return {
    helper: transactionHelper,
    submit: () =>
      transactionHelper.submitTransaction(addManifestSignerProofs(transactionManifest), optional)
  }
}
