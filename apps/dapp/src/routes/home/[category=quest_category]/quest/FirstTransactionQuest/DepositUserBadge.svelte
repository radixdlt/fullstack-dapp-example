<script lang="ts">
  import { publicConfig } from '$lib/public-config'
  import { rdt, sendTransaction } from '$lib/rdt'
  import { GatewayApi } from 'common'
  import { err } from 'neverthrow'
  import { onMount } from 'svelte'
  import { createEventDispatcher } from 'svelte'
  import { user, webSocketClient } from '../../../../../stores'
  import Button from '$lib/components/button/Button.svelte'
  import { userApi } from '$lib/api/user-api'
  import type { Quests } from 'content'
  import { messageApi } from '$lib/api/message-api'

  export let questId: keyof Quests
  export let state:
    | 'loading'
    | 'hasUserBadge'
    | 'canAcceptUserBadge'
    | 'updateDepositRules'
    | 'minted' = 'loading'

  let mintingInProgress = false

  type ComponentStateDetails = {
    default_deposit_rule: 'Accept'
  }

  const dispatch = createEventDispatcher<{
    deposited: undefined
  }>()

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
    mintingInProgress = true
    userApi
      .mintUserBadge()
      .map(async () => {
        mintingInProgress = false
        state = 'minted'
      })
      .mapErr(() => {
        mintingInProgress = false
      })
  }

  onMount(() => {
    const unsubscribeWebSocket = $webSocketClient?.onMessage((event) => {
      if (
        event.type === 'QuestRequirementCompleted' &&
        event.questId === questId &&
        event.requirementId === 'DepositUserBadge'
      ) {
        messageApi.markAsSeen(event.id)
        dispatch('deposited')
      }
    })

    rdt.then(() => {
      const address = $user!.accountAddress!
      const userId = $user!.id

      const gatewayApi = GatewayApi(publicConfig.networkId)
      gatewayApi.callApi('getEntityDetailsVaultAggregated', [address]).map(([entityDetails]) => {
        const hasUserBadge = entityDetails.non_fungible_resources.items
          .find((item) => item.resource_address === publicConfig.badges.userBadgeAddress)
          ?.vaults.items.some(
            (vault) => vault.total_count > 0 && vault.items?.some((item) => item === `<${userId}>`)
          )

        if (hasUserBadge) {
          state = 'hasUserBadge'
          dispatch('deposited')
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

    return () => {
      unsubscribeWebSocket?.()
    }
  })
</script>

<div class="deposit-user-badge">
  {#if state === 'loading'}
    <!-- TODO: use i18n strings here -->
    <div>Checking third party deposits...</div>
  {:else if state === 'canAcceptUserBadge'}
    <Button on:click={handleMintUserBadge} loading={mintingInProgress}>Get badge and XRD</Button>
  {:else if state === 'minted'}
    Minted!
  {:else if state === 'updateDepositRules'}
    <Button on:click={handleUpdateDepositRule}>Update Deposit Rules</Button>
  {/if}
</div>

<style>
  .deposit-user-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
