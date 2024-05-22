import { gatewayApi as GatewayAPI, rdt as RdtToolkit } from '$lib/stores'
import { get } from 'svelte/store'
import { createSwapManifest, type CreateSwapManifestProps } from './createSwapManifest'
import { ResultAsync } from 'neverthrow'
import { typedError } from 'common'

export const previewTransaction = async (props: CreateSwapManifestProps) => {
  const rdt = get(RdtToolkit)
  const gatewayApi = get(GatewayAPI)

  //todo handle
  if (!gatewayApi || !rdt) {
    console.error('NO GATEWAY OR RDT')
    return
  }

  const manifest = createSwapManifest(props)
  const status = await ResultAsync.fromPromise(gatewayApi?.status.getCurrent(), (e) => e as Error)
  //todo handle
  if (status.isErr()) {
    console.error('status.isErr()', status.error)
    return
  }

  const currentEpoch = status.value.ledger_state.epoch
  return gatewayApi.transaction.innerClient.transactionPreview({
    transactionPreviewRequest: {
      manifest,
      start_epoch_inclusive: currentEpoch,
      end_epoch_exclusive: currentEpoch + 1,
      tip_percentage: 0,
      nonce: Math.round(Math.random() * 10e8),
      signer_public_keys: [],
      flags: {
        use_free_credit: true,
        assume_all_signature_proofs: true,
        skip_epoch_check: true
      }
    }
  })
}

export const getBalanceChange = async (props: CreateSwapManifestProps) => {
  const tx = await ResultAsync.fromPromise(previewTransaction(props), typedError)

  //todo handle
  if (tx.isErr()) {
    console.error('Failed to get ', tx.error)
    return '0'
  }

  const balanceChange: any = tx.value?.resource_changes.find(
    (change: any) => change.resource_changes[0]?.resource_address === props.toTokenAddress
  )
  return balanceChange?.resource_changes[0].amount as string
}
