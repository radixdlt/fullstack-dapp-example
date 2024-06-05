<script lang="ts">
  import Jetty from '$lib/components/jetty/Jetty.svelte'
  import { loadGlossary } from 'content'
  import { jettyDialog, jettyNotifications, showJetty } from '../stores'
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'
  import { markLatestNotificationAsSeen } from '$lib/notifications'

  $: glossaryItem = $page.url.searchParams.get('glossaryAnchor')

  $: if (glossaryItem) disabled = false

  let jetty: Jetty

  let disabled = false
  let hidden = false

  const show = () => {
    disabled = false
    hidden = false
  }

  const close = () => {
    if (jetty) jetty.close()
    disabled = true
    hidden = true
  }

  $: if ($showJetty) {
    show()
  } else {
    close()
  }
</script>

{#if !hidden || $jettyDialog || glossaryItem}
  <Jetty
    bind:this={jetty}
    notifications={jettyNotifications}
    glossary={loadGlossary('en')}
    glossaryItem={glossaryItem || undefined}
    dialog={$jettyDialog}
    {disabled}
    onCloseGlossary={async () => {
      $page.url.searchParams.delete('glossaryAnchor')
      await goto(`?${$page.url.searchParams.toString()}`)
    }}
    on:notification-opened={markLatestNotificationAsSeen}
  />
{/if}
