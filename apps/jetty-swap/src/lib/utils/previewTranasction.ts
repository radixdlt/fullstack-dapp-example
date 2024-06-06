import { gatewayApi as GatewayAPI } from '$lib/stores'
import { get } from 'svelte/store'
import { createSwapManifest, type CreateSwapManifestProps } from './createSwapManifest'
import type { GatewayApi } from 'common'

export const previewTransaction = async (props: CreateSwapManifestProps) => {
  const gatewayApi = get(GatewayAPI) as GatewayApi
  const manifest = createSwapManifest(props)
  const status = await gatewayApi?.gatewayApiClient.status.getCurrent()

  const currentEpoch = status.ledger_state.epoch
  return gatewayApi.gatewayApiClient.transaction.innerClient.transactionPreview({
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
  const tx = await previewTransaction(props)

  const balanceChange: any = tx.resource_changes.find(
    (change: any) => change.resource_changes[0]?.resource_address === props.toTokenAddress
  )
  return balanceChange?.resource_changes[0].amount as string
}
