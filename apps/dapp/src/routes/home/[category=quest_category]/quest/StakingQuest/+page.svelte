<script lang="ts">
  import Quest from '../Quest.svelte'
  import type { PageData } from '../StakingQuest/$types'
  import { i18n } from '$lib/i18n/i18n'
  import Button from '$lib/components/button/Button.svelte'
  import { onDestroy } from 'svelte'
  import { webSocketClient } from '../../../../../stores'
  import { writable } from 'svelte/store'
  import { questApi } from '$lib/api/quest-api'
  import { RadixNetworkConfigById } from '@radixdlt/radix-dapp-toolkit'
  import { publicConfig } from '$lib/public-config'
  import type { Quests } from 'content'
  import { messageApi } from '$lib/api/message-api'
  import type { WebSocketClient } from '$lib/websocket-client'

  export let data: PageData
  let quest: Quest

  const text = data.text as Quests['StakingQuest']['text']

  const stakedXrd = writable(data.requirements?.StakedXrd)
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

  const stakingLearnt = () => {
    questApi.completeContentRequirement(data.id)
  }
</script>

<Quest
  {...data}
  bind:this={quest}
  steps={[
    {
      id: 'text1',
      type: 'regular'
    },
    {
      id: 'text2',
      type: 'regular',
      footer: {
        next: {
          onClick: () => {
            stakingLearnt()
            quest.actions.next()
          }
        }
      }
    },
    {
      id: 'text3',
      type: 'regular'
    },
    {
      id: 'text4',
      type: 'regular',
      skip: stakedXrd,
      footer: {
        next: {
          enabled: stakedXrd
        }
      }
    },
    {
      id: 'text5',
      type: 'regular',
      footer: {
        next: {
          enabled: rewardsDeposited
        }
      }
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
  {#if render('text1')}
    {@html text['0.md']}
  {/if}

  {#if render('text2')}
    {@html text['1.md']}
  {/if}

  {#if render('text3')}
    {@html text['2.md']}

    <Button
      on:click={() =>
        window.open(
          `${RadixNetworkConfigById[publicConfig.networkId]['dashboardUrl']}/network-staking`,
          '_blank'
        )}
    >
      {$i18n.t('quests:StakingQuest.goToRadixDashboard')}
    </Button>
  {/if}

  {#if render('text4')}
    {@html text['3.md']}
  {/if}

  {#if render('text5')}
    {@html text['4.md']}
  {/if}

  {#if render('text6')}
    {@html text['5.md']}
  {/if}
</Quest>
