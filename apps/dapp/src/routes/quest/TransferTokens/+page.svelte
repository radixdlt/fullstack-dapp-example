<script lang="ts">
  import { Addresses } from 'common'
  import Quest from '../Quest.svelte'
  import type { PageData } from './$types'
  import { PUBLIC_NETWORK_ID } from '$env/static/public'
  import { webSocketClient } from '../../../stores'
  import { onMount } from 'svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { isMobile } from '$lib/utils/is-mobile'
  import CopyTextBox from '$lib/components/copy-text-box/CopyTextBox.svelte'
  import QR from '@svelte-put/qr/svg/QR.svelte'
  import { shortenAddress } from '$lib/utils/shorten-address'

  export let data: PageData

  let quest: Quest

  onMount(() => {
    const unsubscribeWebSocket = $webSocketClient?.onMessage((message) => {
      if (
        message.type === 'QuestRequirementCompleted' &&
        message.requirementId === 'JettyReceivedClams'
      ) {
        quest.actions.next()
      }
    })

    return () => {
      unsubscribeWebSocket?.()
    }
  })
</script>

<Quest
  {...data}
  bind:this={quest}
  steps={[
    {
      id: 'text1',
      type: 'regular',
      footer: {
        type: 'navigation'
      }
    },
    {
      id: 'text2',
      type: 'jetty',
      dialogs: 1
    },
    {
      id: 'text3',
      type: 'regular',
      skip: data.requirements?.JettyReceivedClams
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
  {#if render('text1')}
    {@html data.text['0.md']}
  {/if}

  {#if render('text3')}
    {@const jettyAddress = Addresses(parseInt(PUBLIC_NETWORK_ID)).accounts.jetty}

    {@html data.text['sendToJetty-header.md']}
    {#if isMobile()}
      {@html data.text['sendToJetty-1-mobile.md']}
      <div class="copy-address">
        <CopyTextBox text={shortenAddress(jettyAddress)} />
      </div>
    {:else}
      {@html data.text['sendToJetty-1-desktop.md']}
      <div class="qr-code">
        <QR data={jettyAddress} />
      </div>
    {/if}

    {@html data.text['sendToJetty-2.md']}
  {/if}

  <svelte:fragment slot="jetty" let:render let:Button let:next>
    {#if render('text2')}
      {@html data.text['1.md']}
      <Button on:click={next}>{$i18n.t('quests:okButton')}</Button>
    {/if}
  </svelte:fragment>
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
