import { publicConfig } from '$lib/public-config'
import { rdt } from '$lib/rdt'
import { GatewayApi } from 'common'

const createGetClamsManifest = (accountAddress: string) => {
  return `
  CALL_METHOD
    Address("${publicConfig.components.clamFaucet}")
    "get_clams"
  ;
  TAKE_FROM_WORKTOP
    Address("resource_tdx_2_1t5m454mwsa54u8hmlzfxl474vsynf8nm0htzhw6kkh7ksr0xkcxdrc")
    Decimal("10")
    Bucket("bucket");
  CALL_METHOD
    Address("${accountAddress}")
    "try_deposit_or_abort"
    Bucket("bucket")
    Enum<0u8>();`
}

export const checkAccountHasClams = (accountAddress: string) => {
  if (!accountAddress) throw new Error('User account address is not set')
  return GatewayApi(publicConfig.networkId)
    .callApi('getEntityDetailsVaultAggregated', [accountAddress])
    .map(
      (res) =>
        res[0].fungible_resources.items.find(
          (item) =>
            item.resource_address ===
            'resource_tdx_2_1t5m454mwsa54u8hmlzfxl474vsynf8nm0htzhw6kkh7ksr0xkcxdrc'
        )?.vaults.items[0].amount ?? 0
    )
    .map((res) => Number(res) > 0)
}

export const getClams = (accountAddress: string) =>
  rdt.then((rdt) => {
    const transactionManifest = createGetClamsManifest(accountAddress)
    return rdt.walletApi.sendTransaction({ transactionManifest })
  })
