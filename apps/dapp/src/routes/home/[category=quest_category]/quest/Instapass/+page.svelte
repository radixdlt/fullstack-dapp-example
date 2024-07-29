<script lang="ts">
  import Button from '$lib/components/button/Button.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import Quest from '../Quest.svelte'
  import type { PageData } from '../Instapass/$types'
  import type { Quests } from 'content'
  import { user } from '../../../../../stores'
  import { Addresses } from 'common'
  import { PUBLIC_NETWORK_ID } from '$env/static/public'
  import { writable } from 'svelte/store'
  import { webSocketClient, type WebSocketClient } from '$lib/websocket-client'
  import { messageApi } from '$lib/api/message-api'
  import { onDestroy, onMount } from 'svelte'
  import { markNotificationAsSeen } from '$lib/notifications'

  export let data: PageData

  const text = data.text as Quests['Instapass']['text']

  let quest: Quest
  const { dapps } = Addresses(parseInt(PUBLIC_NETWORK_ID))
  const instapassBadgeDeposited = writable(data.requirements.InstapassBadgeDeposited.isComplete)

  let unsubscribeWebSocket: ReturnType<WebSocketClient['onMessage']> | undefined

  onMount(() => {
    markNotificationAsSeen('instapassBadgeReceived')

    if ($webSocketClient && $user) {
      unsubscribeWebSocket = $webSocketClient.onMessage((message) => {
        if (message.type === 'QuestRewardsDeposited' && message.questId === 'Instapass') {
          messageApi.markAsSeen(message.id)
        }
      })
    }
  })

  onDestroy(() => {
    unsubscribeWebSocket?.()
  })
</script>

<Quest
  bind:this={quest}
  id={data.id}
  requirements={data.requirements}
  nextQuest={data.nextQuest}
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
      type: 'regular'
    },
    {
      id: '6',
      type: 'jetty',
      footer: {
        next: {
          enabled: instapassBadgeDeposited
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
    <div class="center">
      <Button isExternal link={`${dapps.instapass.url}${$user?.accountAddress}`}>
        <span>{$i18n.t('quests:Instapass.goToInstapass')}</span>
      </Button>
    </div>
  {/if}

  {#if render('5')}
    {@html text['5.md']}
  {/if}

  {#if render('6')}
    {@html text['6.md']}
  {/if}
</Quest>

<style lang="scss">
  .center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
