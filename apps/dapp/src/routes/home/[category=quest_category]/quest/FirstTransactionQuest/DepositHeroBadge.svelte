<script lang="ts">
  import { publicConfig } from '$lib/public-config'
  import { rdt, sendTransaction } from '$lib/rdt'
  import { GatewayApi } from 'common'
  import { err } from 'neverthrow'
  import { onDestroy, onMount } from 'svelte'
  import { createEventDispatcher } from 'svelte'
  import { user, webSocketClient } from '../../../../../stores'
  import Button from '$lib/components/button/Button.svelte'
  import { userApi } from '$lib/api/user-api'
  import type { Quests } from 'content'
  import { messageApi } from '$lib/api/message-api'
  import type { WebSocketClient } from '$lib/websocket-client'
  import { ResultAsync } from 'neverthrow'

  const rdtInstance = ResultAsync.fromSafePromise(rdt)
  export let questId: keyof Quests
  export let state:
    | 'loading'
    | 'hasHeroBadge'
    | 'canAcceptHeroBadge'
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
    Address("${publicConfig.badges.heroBadgeAddress}")
    Enum<0u8>()
;`

  const handleUpdateDepositRule = () => {
    rdt.then(() =>
      sendTransaction({
        transactionManifest: getSetResourcePreferenceManifest($user?.accountAddress || '')
      }).then((result) => {
        result.map(({ status }) => {
          if (status === 'CommittedSuccess') {
            state = 'canAcceptHeroBadge'
          } else {
            state = 'updateDepositRules'
          }
        })
      })
    )
  }

  const handleMintHeroBadge = () => {
    if (mintingInProgress) return
    mintingInProgress = true
    userApi
      .allowAccountAddressToMintHeroBadge()
      .map(() => {
        /**
         * TODO: implement flow for handling hero badge minting
         *  if status is 200.
         * - The allowAccountAddressToMintHeroBadge transaction is either in-flight or completed
         * - find message with type 'HeroBadgeReadyToBeClaimed' and send tx to wallet to mint badge
         *
         * if status is 201
         * - The allowAccountAddressToMintHeroBadge transaction is in-flight
         * - listen for 'HeroBadgeReadyToBeClaimed' message and and send tx to wallet to mint badge
         *
         */
      })
      .mapErr(() => {
        mintingInProgress = false
      })
  }

  let unsubscribeWebSocket: ReturnType<WebSocketClient['onMessage']> | undefined
  $: if ($webSocketClient) {
    unsubscribeWebSocket = $webSocketClient.onMessage(async (event) => {
      if (
        event.type === 'QuestRequirementCompleted' &&
        event.questId === questId &&
        event.requirementId === 'DepositHeroBadge'
      ) {
        messageApi.markAsSeen(event.id)
        dispatch('deposited')
      }

      if (event.type === 'HeroBadgeReadyToBeClaimed') {
        await rdtInstance
          .andThen((rdt) => {
            const claimHeroBadgeManifest = `
              CALL_METHOD
                  Address("${publicConfig.components.heroBadgeForge}")
                  "claim_badge"
                  Address("${$user?.accountAddress || ''}")
                  "${$user?.id}"
              ;
              CALL_METHOD
                  Address("${$user?.accountAddress}")
                  "deposit_batch"
                  Expression("ENTIRE_WORKTOP")
              ;
            `
            return rdt.walletApi.sendTransaction({ transactionManifest: claimHeroBadgeManifest })
          })
          .andThen(() => messageApi.markAsSeen(event.id))
      }
    })
  }

  onDestroy(() => unsubscribeWebSocket?.())

  onMount(() => {
    rdt.then(() => {
      const address = $user!.accountAddress!
      const userId = $user!.id

      const gatewayApi = GatewayApi(publicConfig.networkId)
      gatewayApi.callApi('getEntityDetailsVaultAggregated', [address]).map(([entityDetails]) => {
        const hasHeroBadge = entityDetails.non_fungible_resources.items
          .find((item) => item.resource_address === publicConfig.badges.heroBadgeAddress)
          ?.vaults.items.some(
            (vault) => vault.total_count > 0 && vault.items?.some((item) => item === `<${userId}>`)
          )

        if (hasHeroBadge) {
          state = 'hasHeroBadge'
          dispatch('deposited')
          return
        }

        if (entityDetails.details?.type === 'Component') {
          const depositRule = (entityDetails.details.state as ComponentStateDetails)
            .default_deposit_rule
          if (depositRule === 'Accept') {
            state = 'canAcceptHeroBadge'
            return
          } else {
            if (depositRule === 'EXCEPTIONS') {
              // TODO: check if config.dapp.badges.heroBadgeAddress is added to exceptions
              state = 'canAcceptHeroBadge'
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

<div class="deposit-hero-badge">
  {#if state === 'loading'}
    <!-- TODO: use i18n strings here -->
    <div>Checking third party deposits...</div>
  {:else if state === 'canAcceptHeroBadge'}
    <Button on:click={handleMintHeroBadge} loading={mintingInProgress}>Get badge and XRD</Button>
  {:else if state === 'minted'}
    Minted!
  {:else if state === 'updateDepositRules'}
    <Button on:click={handleUpdateDepositRule}>Update Deposit Rules</Button>
  {/if}
</div>

<style>
  .deposit-hero-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
