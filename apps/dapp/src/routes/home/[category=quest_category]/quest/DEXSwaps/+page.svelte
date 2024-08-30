<script lang="ts">
  import type { Quests } from 'content'
  import Quest from '../Quest.svelte'
  import { derived, writable } from 'svelte/store'
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
  const accountHasClams = writable(true)
  const addresses = Addresses(publicConfig.networkId)
  const jettySwap = writable(data.requirements?.JettySwap.isComplete)
  const lettySwap = writable(data.requirements?.LettySwap.isComplete)

  onMount(() => {
    markNotificationAsSeen('jettySwapCompleted')
    markNotificationAsSeen('lettySwapCompleted')
    markNotificationAsSeen('clamsReceived')
  })

  const handleClaimClams = () => {
    loading = true
    getClams($user?.accountAddress!, $user?.id!).finally(() => {
      checkAccountHasClams($user?.accountAddress!).map((hasClams) => {
        $accountHasClams = hasClams
        if (accountHasClams && (quest.render('5') || quest.render('18'))) {
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
      }

      if (message.type === 'QuestRequirementCompleted' && message.requirementId === 'LettySwap') {
        $lettySwap = true
        messageApi.markAsSeen(message.id)
      }
    })
  }
  onDestroy(() => {
    unsubscribeWebSocket?.()
  })
</script>

<Quest
  bind:this={quest}
  on:render={({ detail }) => {
    if (detail === '18' || detail === '5') {
      if ($user?.accountAddress) {
        checkAccountHasClams($user?.accountAddress).map((hasClams) => {
          $accountHasClams = hasClams
          loading = false
        })
      }
    }
  }}
  {...data.questProps}
  steps={[
    { id: '0', type: 'regular' },
    { id: '1', type: 'regular' },
    { id: '2', type: 'jetty' },
    { id: '3', type: 'regular' },
    { id: '4', type: 'jetty' },
    { id: '5', type: 'regular' },
    {
      id: '6',
      type: 'regular',
      skip: jettySwap,
      footer: {
        next: {
          enabled: derived(
            [jettySwap, isUserBlocked],
            ([$jettySwap, $isUserBlocked]) => $jettySwap || $isUserBlocked
          )
        }
      }
    },
    { id: '7', type: 'jetty' },
    { id: '8', type: 'regular' },
    { id: '9', type: 'regular' },
    { id: '10', type: 'jetty' },
    { id: '11', type: 'regular' },
    { id: '12', type: 'jetty' },
    { id: '13', type: 'regular' },
    { id: '14', type: 'jetty' },
    { id: '15', type: 'regular' },
    { id: '16', type: 'jetty' },
    { id: '17', type: 'jetty' },
    { id: '18', type: 'regular', skip: accountHasClams },
    {
      id: '19',
      type: 'regular',
      skip: lettySwap,
      footer: {
        next: {
          enabled: derived(
            [lettySwap, isUserBlocked],
            ([$lettySwap, $isUserBlocked]) => $lettySwap || $isUserBlocked
          )
        }
      }
    },
    { id: '20', type: 'jetty' },
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
    {#if $accountHasClams}
      {@html text['5a.md']}
    {:else}
      {@html text['5b.md']}
      <div class="center">
        <Button on:click={handleClaimClams} {loading} disabled={$isUserBlocked}>
          {$i18n.t('quests:TransferTokens.getClams')}
        </Button>
      </div>
    {/if}
  {/if}
  {#if render('6')}
    {@html htmlReplace(text['6.md'], {
      jettySwapLink: `<a href="${addresses.dapps.jettySwap.url}" target="_blank">JettySwap</a>`
    })}
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
  {#if render('19')}
    {@html htmlReplace(text['19.md'], {
      lettySwapLink: `<a href="${addresses.dapps.lettySwap.url}" target="_blank">LettySwap</a>`
    })}
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
