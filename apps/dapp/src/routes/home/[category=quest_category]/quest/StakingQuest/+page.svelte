<script lang="ts">
  import Quest from '../Quest.svelte'
  import type { PageData } from '../StakingQuest/$types'
  import { onDestroy } from 'svelte'
  import { webSocketClient, type WebSocketClient } from '$lib/websocket-client'
  import { writable } from 'svelte/store'
  import type { Quests } from 'content'
  import { messageApi } from '$lib/api/message-api'

  export let data: PageData
  let quest: Quest

  const text = data.text as Quests['StakingQuest']['text']

  const stakedXrd = writable(data.requirements?.StakedXrd?.isComplete)
  const rewardsDeposited = writable(
    data.questStatus.StakingQuest?.status === 'REWARDS_DEPOSITED' ||
      data.questStatus.StakingQuest?.status === 'COMPLETED'
  )

  let unsubscribeWebSocket: ReturnType<WebSocketClient['onMessage']> | undefined
  $: if ($webSocketClient) {
    unsubscribeWebSocket = $webSocketClient.onMessage((message) => {
      if (message.type === 'QuestRequirementCompleted' && message.requirementId === 'StakedXrd') {
        $stakedXrd = true
        messageApi.markAsSeen(message.id)
      }

      if (message.type === 'QuestRewardsDeposited' && message.questId === 'StakingQuest') {
        $rewardsDeposited = true
        messageApi.markAsSeen(message.id)
      }
    })
  }

  onDestroy(() => unsubscribeWebSocket?.())
</script>

<Quest
  {...data}
  bind:this={quest}
  steps={[
    {
      id: '0',
      type: 'regular'
    },
    {
      id: '1',
      type: 'regular'
    },
    {
      id: '2',
      type: 'regular'
    },
    {
      id: '3',
      type: 'jetty'
    },
    {
      id: '4',
      type: 'regular'
    },
    {
      id: '5',
      type: 'regular'
    },
    {
      id: '6',
      type: 'regular'
    },
    {
      id: '7',
      type: 'regular'
    },
    {
      id: '8',
      type: 'regular'
    },
    {
      id: '9',
      type: 'jetty'
    },
    {
      type: 'requirements'
    },
    {
      type: 'claimRewards'
    },
    {
      type: 'complete'
    }
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
    {@html text['6.md']}
  {/if}

  {#if render('7')}
    {@html text['7.md']}
  {/if}

  {#if render('8')}
    {@html text['8.md']}
  {/if}

  {#if render('9')}
    {@html text['9.md']}
  {/if}
</Quest>

<style>
</style>
