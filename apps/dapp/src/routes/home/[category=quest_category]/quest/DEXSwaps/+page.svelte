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
  import { user } from '../../../../../stores'
  import { htmlReplace } from '$lib/helpers/html-replace'

  export let data: PageData
  const text = data.text as Quests['DEXSwaps']['text']

  let quest: Quest
  let loading = false
  let accountHasClams = true
  const addresses = Addresses(publicConfig.networkId)
  const jettySwap = writable(data.requirements?.JettySwap.isComplete)
  const lettySwap = writable(data.requirements?.LettySwap.isComplete)

  onMount(() => {
    markNotificationAsSeen('jettySwapCompleted')
    markNotificationAsSeen('lettySwapCompleted')
    markNotificationAsSeen('clamsReceived')
    checkAccountHasClams($user?.accountAddress!).map((hasClams) => {
      accountHasClams = hasClams
    })
  })

  const handleClaimClams = () => {
    loading = true
    getClams($user?.accountAddress!, $user?.id!).finally(() => {
      checkAccountHasClams($user?.accountAddress!).map((hasClams) => {
        accountHasClams = hasClams
        accountHasClams && quest.actions.next()
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
  id={data.id}
  requirements={data.requirements}
  steps={[
    { id: '0', type: 'regular' },
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
      type: 'regular',
      skip: jettySwap,
      footer: {
        next: {
          enabled: jettySwap
        }
      }
    },
    {
      id: '8',
      type: 'jetty'
    },
    {
      id: '9',
      type: 'regular'
    },
    {
      id: '10',
      type: 'regular'
    },
    {
      id: '11',
      type: 'regular'
    },
    {
      id: '12',
      type: 'regular'
    },
    {
      id: '13',
      type: 'jetty'
    },
    {
      id: '14',
      type: 'regular'
    },
    {
      id: '15',
      type: 'jetty'
    },
    {
      id: '16',
      type: 'regular'
    },
    {
      id: '17',
      type: 'regular'
    },
    {
      id: '18',
      type: 'jetty'
    },
    {
      id: '19',
      type: 'jetty'
    },
    {
      id: '20',
      type: 'regular'
    },
    {
      id: '21',
      type: 'jetty'
    },
    {
      id: '22',
      type: 'jetty'
    },
    {
      id: '23',
      type: 'jetty'
    },
    {
      id: '24',
      type: 'regular',
      skip: lettySwap,
      footer: {
        next: {
          enabled: lettySwap
        }
      }
    },
    {
      id: '25',
      type: 'regular'
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
    {#if accountHasClams}
      {@html text['6a.md']}
    {:else}
      {@html text['6b.md']}
      <div class="center">
        <Button on:click={handleClaimClams} {loading}
          >{$i18n.t('quests:TransferTokens.getClams')}</Button
        >
      </div>
    {/if}
  {/if}
  {#if render('7')}
    {@html htmlReplace(text['7.md'], {
      jettySwap: `<a href="${addresses.dapps.jettySwap.url}" target="_blank">JettySwap</a>`
    })}
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
  {/if}
  {#if render('19')}
    {@html text['19.md']}
  {/if}
  {#if render('20')}
    {@html text['20.md']}
  {/if}
  {#if render('21')}
    {@html text['21.md']}
  {/if}
  {#if render('22')}
    {@html text['22.md']}
  {/if}
  {#if render('23')}
    {@html text['23.md']}
  {/if}
  {#if render('24')}
    {@html htmlReplace(text['24.md'], {
      lettySwap: `<a href="${addresses.dapps.lettySwap.url}" target="_blank">LettySwap</a>`
    })}
  {/if}
  {#if render('25')}
    {@html text['25.md']}
  {/if}
</Quest>

<style lang="scss">
  .center {
    display: flex;
    justify-content: center;
  }
</style>
