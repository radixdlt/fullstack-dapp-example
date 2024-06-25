<script lang="ts">
  import { publicConfig } from '$lib/public-config'
  import { rdt } from '$lib/rdt'
  import { GatewayApi } from 'common'
  import { okAsync } from 'neverthrow'
  import { onDestroy } from 'svelte'
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

  const dispatch = createEventDispatcher<{
    deposited: undefined
  }>()

  const claimHeroBadge = (messageId: number) =>
    rdtInstance
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
      .andThen(() => messageApi.markAsSeen(messageId))
      .map(() => {
        mintingInProgress = false
        state = 'hasHeroBadge'
        dispatch('deposited')
      })
      .mapErr(() => {
        mintingInProgress = false
      })

  const handleMintHeroBadge = () => {
    mintingInProgress = true
    return userApi
      .allowAccountAddressToMintHeroBadge()
      .andThen(() => messageApi.getAll())
      .map((messages) => messages.find((message) => message.type === 'HeroBadgeReadyToBeClaimed'))
      .andThen((message) => (message ? claimHeroBadge(message.id) : okAsync(undefined)))
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

  const gatewayApi = GatewayApi(publicConfig.networkId)

  $: {
    if ($user?.accountAddress)
      gatewayApi.hasHeroBadge($user?.accountAddress).map((hasHeroBadge) => {
        if (hasHeroBadge) {
          state = 'hasHeroBadge'
          dispatch('deposited')
        }
      })
  }

  onDestroy(() => unsubscribeWebSocket?.())
</script>

<div class="deposit-hero-badge">
  <Button on:click={handleMintHeroBadge} loading={mintingInProgress}>Get Hero badge</Button>
</div>

<style>
  .deposit-hero-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
