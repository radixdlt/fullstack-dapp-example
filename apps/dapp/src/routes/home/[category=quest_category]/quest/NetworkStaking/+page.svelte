<script lang="ts">
  import Quest from '../Quest.svelte'
  import type { PageData } from '../NetworkStaking/$types'
  import { onDestroy, onMount } from 'svelte'
  import { webSocketClient, type WebSocketClient } from '$lib/websocket-client'
  import { writable } from 'svelte/store'
  import type { Quests } from 'content'
  import { messageApi } from '$lib/api/message-api'
  import { markNotificationAsSeen } from '$lib/notifications'
  import Button from '$lib/components/button/Button.svelte'
  import { publicConfig } from '$lib/public-config'

  export let data: PageData
  let quest: Quest

  const text = data.text as Quests['NetworkStaking']['text']

  const dashboardUrl =
    publicConfig.networkId === 1
      ? 'https://dashboard.radixdlt.com/network-staking'
      : 'https://stokenet-dashboard.radixdlt.com/network-staking'

  const stakedXrd = writable(data.requirements?.XrdStaked?.isComplete)
  const rewardsDeposited = writable(
    data.questStatus.NetworkStaking?.status === 'REWARDS_DEPOSITED' ||
      data.questStatus.NetworkStaking?.status === 'COMPLETED'
  )

  let unsubscribeWebSocket: ReturnType<WebSocketClient['onMessage']> | undefined
  $: if ($webSocketClient) {
    unsubscribeWebSocket = $webSocketClient.onMessage((message) => {
      if (message.type === 'QuestRequirementCompleted' && message.requirementId === 'XrdStaked') {
        $stakedXrd = true
        messageApi.markAsSeen(message.id)
      }

      if (message.type === 'QuestRewardsDeposited' && message.questId === 'NetworkStaking') {
        $rewardsDeposited = true
        messageApi.markAsSeen(message.id)
      }
    })
  }

  onMount(() => {
    markNotificationAsSeen('stakeCompleted')
  })

  onDestroy(() => unsubscribeWebSocket?.())
</script>

<Quest
  {...data}
  bind:this={quest}
  steps={[
    { id: '0', type: 'regular' },
    { id: '1', type: 'regular' },
    { id: '2', type: 'jetty' },
    { id: '3', type: 'regular' },
    { id: '4', type: 'jetty' },
    { id: '5', type: 'regular' },
    { id: '6', type: 'regular' },
    { id: '7', type: 'jetty' },
    { type: 'requirements' },
    { type: 'claimRewards' },
    { type: 'complete' }
  ]}
  let:render
>
  {#if render('0')}
    {@html text['0.md']}
  {/if}
  {#if render('1')}
    {@html text['1.md']}
  {/if}
  {#if render('2')}
    {@html text['2.md']}
  {/if}
  {#if render('3')}
    {@html text['3.md']}
  {/if}
  {#if render('4')}
    {@html text['4.md']}
  {/if}
  {#if render('5')}
    {@html text['5.md']}
  {/if}
  {#if render('6')}
    {@html text['6a.md']}
    <div class="center">
      <Button isExternal={true} link={dashboardUrl}>Radix Dashboard</Button>
    </div>
    {@html text['6b.md']}
  {/if}
  {#if render('7')}
    {@html text['7.md']}
  {/if}
</Quest>

<style lang="scss">
  .center {
    display: flex;
    justify-content: center;
  }
</style>
