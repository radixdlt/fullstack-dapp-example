<script lang="ts">
  import { Addresses } from 'common'
  import Quest from '../Quest.svelte'
  import type { PageData } from './$types'
  import { PUBLIC_NETWORK_ID } from '$env/static/public'
  import { onDestroy, onMount } from 'svelte'
  import CopyTextBox from '$lib/components/copy-text-box/CopyTextBox.svelte'
  import QR from '@svelte-put/qr/svg/QR.svelte'
  import { shortenAddress } from '$lib/utils/shorten-address'
  import { writable } from 'svelte/store'
  import type { Quests } from 'content'
  import { messageApi } from '$lib/api/message-api'
  import { webSocketClient, type WebSocketClient } from '$lib/websocket-client'
  import { markNotificationAsSeen } from '$lib/notifications'
  import { htmlReplace } from '$lib/helpers/html-replace'
  import Button from '$lib/components/button/Button.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { user } from '../../../../../stores'

  import { checkAccountHasClams, getClams } from '$lib/helpers/get-clams'
  import { isMobile } from '@radixdlt/radix-dapp-toolkit'

  export let data: PageData

  const text = data.text as Quests['TransferTokens']['text']

  let mounted: boolean
  let quest: Quest
  let loading = false
  let accountHasClams = true
  let receivedClams = writable(data.requirements?.JettyReceivedClams.isComplete)

  $: {
    if ($user?.accountAddress! && mounted)
      checkAccountHasClams($user?.accountAddress!).map((hasClams) => {
        accountHasClams = hasClams
      })
  }

  onMount(() => {
    markNotificationAsSeen('clamsReceived')
    mounted = true
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
      if (
        message.type === 'QuestRequirementCompleted' &&
        message.requirementId === 'JettyReceivedClams'
      ) {
        $receivedClams = true
        messageApi.markAsSeen(message.id)
      }
    })
  }

  onDestroy(() => unsubscribeWebSocket?.())
</script>

<!-- svelte-ignore missing-declaration -->
<Quest
  {...data.questProps}
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
      type: 'jetty'
    },
    {
      id: '5',
      type: 'regular'
    },
    {
      id: '6',
      type: 'regular',
      skip: receivedClams,
      footer: {
        next: {
          enabled: receivedClams
        }
      }
    },
    {
      id: '7',
      type: 'jetty'
    },
    {
      id: '8',
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
    {#if accountHasClams}
      {@html text['4a.md']}
    {:else}
      {@html text['4b.md']}
      <div class="center">
        <Button on:click={handleClaimClams} {loading}
          >{$i18n.t('quests:TransferTokens.getClams')}</Button
        >
      </div>
    {/if}
  {/if}

  {#if render('5')}
    {@html text['5.md']}
  {/if}

  {#if render('6')}
    {@const jettyAddress = Addresses(parseInt(PUBLIC_NETWORK_ID)).accounts.jetty.address}

    {#if isMobile()}
      {@html text['6b-1.md']}
      <div class="copy-address">
        <CopyTextBox text={shortenAddress(jettyAddress)} value={jettyAddress} />
      </div>
      {@html text['6b-2.md']}
    {:else}
      {@html text['6a-1.md']}
      <div class="qr-code">
        <QR data={jettyAddress} />
      </div>
      {@html htmlReplace(text['6a-2.md'], {
        jettyAddress:
          jettyAddress.slice(0, 20) + '...' + jettyAddress.slice(-20, jettyAddress.length)
      })}
    {/if}
  {/if}

  {#if render('7')}
    {@html text['7.md']}
  {/if}

  {#if render('8')}
    {@html text['8.md']}
  {/if}
</Quest>

<style>
  .qr-code {
    width: 100%;
    height: 12rem;
    display: flex;
    justify-content: center;
  }

  .copy-address {
    max-width: 20rem;
  }

  .center {
    display: flex;
    justify-content: center;
  }
</style>
