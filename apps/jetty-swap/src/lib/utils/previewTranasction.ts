import { gatewayApi as GatewayAPI } from '$lib/stores'
import { get } from 'svelte/store'
import { createSwapManifest, type CreateSwapManifestProps } from './createSwapManifest'
import type { GatewayApi } from 'common'

export const previewTransaction = async (manifest: string) => {
  const gatewayApi = get(GatewayAPI) as GatewayApi
  const status = await gatewayApi?.gatewayApiClient.status.getCurrent()

  const currentEpoch = status?.ledger_state.epoch
  return gatewayApi?.gatewayApiClient.transaction.innerClient.transactionPreview({
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

export const getTransactionResult = (
  transactionId: string,
  toTokenAddress: string,
  toAddress: string
) => {
  const gatewayApi = get(GatewayAPI) as GatewayApi
  return gatewayApi.callApi('getCommittedDetails', transactionId).map((response) => {
    if (response?.transaction.balance_changes) {
      const balanceChange = response?.transaction.balance_changes.fungible_balance_changes.find(
        (change) =>
          change.resource_address === toTokenAddress && change.entity_address === toAddress
      )
      return balanceChange?.balance_change
    }
  })
}

export const getBalanceChange = async (props: CreateSwapManifestProps, toTokenAddress: string) => {
  const manifest = createSwapManifest(props)
  const tx = await previewTransaction(manifest)
  const balanceChange: any = tx.resource_changes.find(
    (change: any) => change.resource_changes[0]?.resource_address === toTokenAddress
  )
  return balanceChange?.resource_changes[0].amount as string
}

export const getPrice = async (dexComponent: string) => {
  const manifest = `
  CALL_METHOD
    Address("${dexComponent}")
    "get_price"
  ;
`
  const tx = await previewTransaction(manifest)

  const price: string | undefined = (tx as any)?.receipt?.output[0].programmatic_json.value
  return price
}
