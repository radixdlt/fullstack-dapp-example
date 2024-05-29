<script lang="ts">
  import Jetty from '$lib/components/jetty/Jetty.svelte'
  import { loadGlossary } from 'content'
  import { jettyDialog, jettyNotifications } from '../stores'
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'
  import { markLatestNotificationAsSeen } from '$lib/notifications'

  $: glossaryItem = $page.url.searchParams.get('glossaryAnchor')
</script>

<Jetty
  notifications={jettyNotifications}
  glossary={loadGlossary('en')}
  glossaryItem={glossaryItem || undefined}
  dialog={$jettyDialog}
  on:close-glossary={() => {
    $page.url.searchParams.delete('glossaryAnchor')
    goto(`?${$page.url.searchParams.toString()}`)
  }}
  on:notification-opened={markLatestNotificationAsSeen}
/>
