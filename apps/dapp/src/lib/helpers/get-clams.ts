import { publicConfig } from '$lib/public-config'
import { rdt } from '$lib/rdt'
import { GatewayApi } from 'common'

const createGetClamsManifest = (accountAddress: string, userId: string) => {
  return `
  CALL_METHOD
  Address("${accountAddress}")
  "create_proof_of_non_fungibles"
  Address("${publicConfig.badges.heroBadgeAddress}")
  Array<NonFungibleLocalId>(NonFungibleLocalId("<${userId}>"))
;
POP_FROM_AUTH_ZONE
  Proof("hero_badge")
;
CALL_METHOD
  Address("${publicConfig.components.questRewards}")
  "get_clams"
  Proof("hero_badge")
;
CALL_METHOD
  Address("${accountAddress}")
  "deposit_batch"
  Expression("ENTIRE_WORKTOP")
;`
}

export const checkAccountHasClams = (accountAddress: string) => {
  if (!accountAddress) throw new Error('User account address is not set')
  return GatewayApi(publicConfig.networkId)
    .callApi('getEntityDetailsVaultAggregated', [accountAddress])
    .map(
      (res) =>
        res[0].fungible_resources.items.find(
          (item) => item.resource_address === publicConfig.resources.clamAddress
        )?.vaults.items[0].amount ?? 0
    )
    .map((res) => Number(res) > 0)
}

export const getClams = (accountAddress: string, userId: string) =>
  rdt.then((rdt) => {
    const transactionManifest = createGetClamsManifest(accountAddress, userId)
    return rdt.walletApi.sendTransaction({ transactionManifest })
  })
