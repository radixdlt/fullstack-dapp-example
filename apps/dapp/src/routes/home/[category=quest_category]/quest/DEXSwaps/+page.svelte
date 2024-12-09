<script lang="ts">
  import type { Quests } from 'content'
  import Quest from '../Quest.svelte'
  import { writable } from 'svelte/store'
  import { onDestroy, onMount } from 'svelte'
  import { webSocketClient, type WebSocketClient } from '$lib/websocket-client'
  import { messageApi } from '$lib/api/message-api'
  import Button from '$lib/components/button/Button.svelte'
  import { publicConfig } from '$lib/public-config'
  import { i18n } from '$lib/i18n/i18n'
  import { Addresses } from 'common'
  import type { PageData } from '../DEXSwaps/$types'
  import { markNotificationAsSeen } from '$lib/notifications'
  import { checkAccountHasClams, getClams } from '$lib/helpers/get-clams'
  import { isUserBlocked, user } from '../../../../../stores'
  import { htmlReplace } from '$lib/helpers/html-replace'

  export let data: PageData
  const text = data.text as Quests['DEXSwaps']['text']

  let quest: Quest
  let loading = false
  const addresses = Addresses(publicConfig.networkId)
  const jettySwap = writable(data.requirements?.JettySwap.isComplete)

  let render: (id: string) => boolean

  onMount(() => {
    markNotificationAsSeen('jettySwapCompleted')
    markNotificationAsSeen('lettySwapCompleted')
    markNotificationAsSeen('clamsReceived')
  })

  const handleClaimClams = () => {
    loading = true
    getClams($user?.accountAddress!).finally(() => {
      checkAccountHasClams($user?.accountAddress!).map((hasClams) => {
        if (quest.render('5') || quest.render('18')) {
          quest.actions.next()
        }
        loading = false
      })
    })
  }

  let unsubscribeWebSocket: ReturnType<WebSocketClient['onMessage']> | undefined
  $: if ($webSocketClient) {
    unsubscribeWebSocket = $webSocketClient.onMessage((message) => {
      if (message.type === 'QuestRequirementCompleted' && message.requirementId === 'JettySwap') {
        $jettySwap = true
        messageApi.markAsSeen(message.id)
        if (quest && render('6')) quest.actions.next()
      }
    })
  }
  onDestroy(() => {
    unsubscribeWebSocket?.()
  })
</script>

<Quest
  bind:this={quest}
  bind:render
  on:render={({ detail }) => {
    if (detail === '18' || detail === '5') {
      if ($user?.accountAddress) {
        checkAccountHasClams($user?.accountAddress).map((hasClams) => {
          loading = false
        })
      }
    }
  }}
  {...data.questProps}
  steps={[
    { id: '5', type: 'regular' },
    {
      id: '6',
      type: 'regular',
      footer: {
        next: {
          enabled: jettySwap
        }
      }
    },
    { id: '18', type: 'regular' },
    { type: 'claimRewards' },
    { type: 'complete' }
  ]}
  let:render
>
  {#if render('5')}
    {@html text['5b.md']}
    <div class="center">
      <Button on:click={handleClaimClams} {loading} disabled={$isUserBlocked}>
        {$i18n.t('quests:TransferTokens.getClams')}
      </Button>
    </div>
  {/if}
  {#if render('6')}
    {@html htmlReplace(text['6.md'], {
      jettySwapLink: `<a href="${addresses.dapps.jettySwap.url}" target="_blank">JettySwap</a>`
    })}
  {/if}
  {#if render('9')}
    {@html text['9.md']}
  {/if}
  {#if render('10')}
    {@html text['10.md']}
  {/if}
  {#if render('11')}
    {@html text['11.md']}
  {/if}
  {#if render('12')}
    {@html text['12.md']}
  {/if}
  {#if render('13')}
    {@html text['13.md']}
  {/if}
  {#if render('14')}
    {@html text['14.md']}
  {/if}
  {#if render('15')}
    {@html text['15.md']}
  {/if}
  {#if render('16')}
    {@html text['16.md']}
  {/if}
  {#if render('17')}
    {@html text['17.md']}
  {/if}
  {#if render('18')}
    {@html text['18.md']}
    <div class="center">
      <Button on:click={handleClaimClams} {loading} disabled={$isUserBlocked}
        >{$i18n.t('quests:TransferTokens.getClams')}</Button
      >
    </div>
  {/if}
  {#if render('20')}
    {@html text['20.md']}
  {/if}
</Quest>

<style lang="scss">
  .center {
    display: flex;
    justify-content: center;
  }
</style>
