<script lang="ts">
  import { publicConfig } from '$lib/public-config'
  import { rdt, sendTransaction } from '$lib/rdt'
  import { GatewayApi } from 'common'
  import { err } from 'neverthrow'
  import { getContext, onMount } from 'svelte'
  import Button from '../button/Button.svelte'
  import { userApi } from '../../../routes/api/(protected)/user/user-api'
  import { createEventDispatcher } from 'svelte'
  import type { writable } from 'svelte/store'
  import { user } from '../../../stores'

  let state: 'loading' | 'hasUserBadge' | 'canAcceptUserBadge' | 'updateDepositRules' | 'minted' =
    'loading'

  let mintingInProgress = false
  const navigationDirection =
    getContext<ReturnType<typeof writable<'next' | 'prev'>>>('navigationDirection')
  type ComponentStateDetails = {
    default_deposit_rule: 'Accept'
  }

  const dispatch = createEventDispatcher()

  const getSetResourcePreferenceManifest = (accountAddress: string) => `CALL_METHOD
    Address("${accountAddress}")
    "set_resource_preference"
    Address("${publicConfig.badges.userBadgeAddress}")
    Enum<0u8>()
;`

  const handleUpdateDepositRule = () => {
    rdt.then(() =>
      sendTransaction({
        transactionManifest: getSetResourcePreferenceManifest($user?.accountAddress || '')
      }).then((result) => {
        result.map(({ status }) => {
          if (status === 'CommittedSuccess') {
            state = 'canAcceptUserBadge'
          } else {
            state = 'updateDepositRules'
          }
        })
      })
    )
  }

  const handleMintUserBadge = () => {
    if (mintingInProgress) return
    userApi.mintUserBadge().map(() => {
      state = 'minted'
      dispatch('next')
    })
  }

  onMount(() => {
    rdt.then(() => {
      const address = $user?.accountAddress || ''
      const gatewayApi = GatewayApi(publicConfig.networkId)
      gatewayApi.callApi('getEntityDetailsVaultAggregated', [address]).map(([entityDetails]) => {
        const hasUserBadge = entityDetails.non_fungible_resources.items
          .find((item) => item.resource_address === publicConfig.badges.userBadgeAddress)
          ?.vaults.items.some((vault) => vault.total_count > 0)

        if (hasUserBadge) {
          state = 'hasUserBadge'
          dispatch($navigationDirection)
          return
        }

        if (entityDetails.details?.type === 'Component') {
          const depositRule = (entityDetails.details.state as ComponentStateDetails)
            .default_deposit_rule
          if (depositRule === 'Accept') {
            state = 'canAcceptUserBadge'
            return
          } else {
            if (depositRule === 'EXCEPTIONS') {
              // TODO: check if config.dapp.badges.userBadgeAddress is added to exceptions
              state = 'canAcceptUserBadge'
              return
            } else {
              state = 'updateDepositRules'
            }
          }
        } else {
          return err('Entity is not a component')
        }
      })
    })
  })
</script>

{#if state === 'loading'}
  <div>Checking third party deposits...</div>
{:else if state === 'canAcceptUserBadge'}
  <Button on:click={handleMintUserBadge} disabled={mintingInProgress}>Mint User Badge</Button>
{:else if state === 'minted'}
  Minted!
{:else if state === 'updateDepositRules'}
  <Button on:click={handleUpdateDepositRule}>Update Deposit Rules</Button>
{/if}
