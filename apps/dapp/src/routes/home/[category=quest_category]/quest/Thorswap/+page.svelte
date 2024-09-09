<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import Quest from '../Quest.svelte'
  import type { PageData } from '../Thorswap/$types'
  import type { Quests } from 'content'
  import { markNotificationAsSeen } from '$lib/notifications'
  import Button from '$lib/components/button/Button.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { writable } from 'svelte/store'
  import { user } from '../../../../../stores'
  import { webSocketClient, WebSocketClient } from '$lib/websocket-client'
  import { messageApi } from '$lib/api/message-api'
  import CopyTextBox from '$lib/components/copy-text-box/CopyTextBox.svelte'
  import { shortenAddress } from '$lib/utils/shorten-address'
  export let data: PageData
  const text = data.text as Quests['Thorswap']['text']
  let quest: Quest

  const mayaSwap = writable(data.requirements.MayaRouterWithdrawEvent.isComplete)

  onMount(() => {
    markNotificationAsSeen('thorswapSwapCompleted')
  })

  let unsubscribeWebSocket: ReturnType<WebSocketClient['onMessage']> | undefined
  $: if ($webSocketClient) {
    unsubscribeWebSocket = $webSocketClient.onMessage((message) => {
      if (
        message.type === 'QuestRequirementCompleted' &&
        message.requirementId === 'MayaRouterWithdrawEvent'
      ) {
        $mayaSwap = true
        messageApi.markAsSeen(message.id)
      }
    })
  }

  onDestroy(() => unsubscribeWebSocket?.())
</script>

<Quest
  bind:this={quest}
  {...data.questProps}
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
      type: 'jetty'
    },
    {
      id: '3',
      type: 'regular'
    },
    {
      id: '4',
      type: 'regular'
    },
    {
      id: '5',
      type: 'jetty'
    },
    {
      id: '6',
      type: 'regular'
    },
    {
      id: '7',
      type: 'jetty'
    },
    {
      id: '8',
      type: 'regular',
      skip: mayaSwap,
      footer: {
        next: {
          enabled: mayaSwap
        }
      }
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
    {@html text['8a.md']}
    <CopyTextBox
      text={shortenAddress($user?.accountAddress || '')}
      value={$user?.accountAddress || ''}
    />
    {@html text['8b.md']}
    <div class="center">
      <Button link="https://app.thorswap.finance/swap" isExternal={true}>
        {$i18n.t('quests:Thorswap.gotoThorswap')}
      </Button>
    </div>
    {@html text['8c.md']}
  {/if}
</Quest>

<style lang="scss">
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
