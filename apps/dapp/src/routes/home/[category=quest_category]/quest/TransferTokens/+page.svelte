<script lang="ts">
  import { Addresses } from 'common'
  import Quest from '../Quest.svelte'
  import type { PageData } from './$types'
  import { PUBLIC_NETWORK_ID } from '$env/static/public'
  import { webSocketClient } from '../../../../../stores'
  import { onDestroy } from 'svelte'
  import { isMobile } from '$lib/utils/is-mobile'
  import CopyTextBox from '$lib/components/copy-text-box/CopyTextBox.svelte'
  import QR from '@svelte-put/qr/svg/QR.svelte'
  import { shortenAddress } from '$lib/utils/shorten-address'
  import { writable } from 'svelte/store'
  import TextJettyPage from '../TextJettyPage.svelte'
  import type { Quests } from 'content'
  import { messageApi } from '$lib/api/message-api'
  import type { WebSocketClient } from '$lib/websocket-client'

  export let data: PageData

  const text = data.text as Quests['TransferTokens']['text']

  let quest: Quest

  let receivedClams = writable(data.requirements?.JettyReceivedClams.isComplete)

  let unsubscribeWebSocket: ReturnType<WebSocketClient['onMessage']> | undefined
  $: if ($webSocketClient) {
    unsubscribeWebSocket = $webSocketClient.onMessage((message) => {
      if (
        message.type === 'QuestRequirementCompleted' &&
        message.requirementId === 'JettyReceivedClams'
      ) {
        quest.actions.next()
        $receivedClams = true
        messageApi.markAsSeen(message.id)
      }
    })
  }

  onDestroy(() => unsubscribeWebSocket?.())
</script>

<Quest
  id={data.id}
  requirements={data.requirements}
  bind:this={quest}
  steps={[
    {
      id: '1a',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['1.md']
      }
    },
    {
      id: '1b',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['1.md']
      }
    },
    {
      id: '2',
      type: 'regular'
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
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['5.md']
      }
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
      id: '8',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['8.md']
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
  {#if render('2')}
    {@html text['2.md']}
  {/if}

  {#if render('3')}
    {@html text['3.md']}
  {/if}

  {#if render('4')}
    {@html text['4.md']}
  {/if}

  {#if render('6')}
    {@const jettyAddress = Addresses(parseInt(PUBLIC_NETWORK_ID)).accounts.jetty}

    {#if isMobile()}
      {@html text['7.md']}
      <div class="copy-address">
        <CopyTextBox text={shortenAddress(jettyAddress)} value={jettyAddress} />
      </div>
    {:else}
      {@html text['5.md']}
      <div class="qr-code">
        <QR data={jettyAddress} />
      </div>
    {/if}
  {/if}
</Quest>

<style>
  .qr-code {
    width: 15rem;
    height: 15rem;
  }

  .copy-address {
    max-width: 20rem;
  }
</style>
