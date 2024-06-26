<script lang="ts">
  import Glossary from '$lib/components/glossary/Glossary.svelte'
  import JettyMenu from '$lib/components/jetty-menu/JettyMenu.svelte'
  import BookIcon from '@images/book-open.svg'
  import LightningIcon from '@images/lightning-icon.svg'
  import { loadGlossary } from 'content'
  import FuseElements from './FuseElements.svelte'
  import { page } from '$app/stores'
  import { markLatestNotificationAsSeen } from '$lib/notifications'
  import { hideJetty, hideJettyMenu, jettyNotifications, retractJettyMenu } from '../../stores'
  import { isMobile } from '$lib/utils/is-mobile'
  import { tick } from 'svelte'
  import { goto } from '$app/navigation'

  let poppedUp = true

  $: poppedUp = $page.url.href.includes('quest') && !isMobile() ? false : true

  $: glossaryAnchor = $page.url.href.includes('glossaryAnchor')
    ? $page.url.href.split('glossaryAnchor=')[1]
    : undefined

  $: if (glossaryAnchor && jettyMenu) {
    jettyMenu.openMenuItem('glossary')
    tick().then(() => glossary.openGlossaryItem(glossaryAnchor))
  }

  let jettyMenu: JettyMenu
  let glossary: Glossary

  let expanded: boolean

  $: if ($retractJettyMenu) {
    expanded = false
    $retractJettyMenu = false
  }
</script>

{#if !$hideJettyMenu}
  <JettyMenu
    bind:expanded
    bind:this={jettyMenu}
    hideJetty={$hideJetty}
    {poppedUp}
    menuItems={[
      {
        id: 'glossary',
        text: 'Glossary',
        icon: BookIcon
      },
      {
        id: 'fuse-elements',
        text: 'Fuse Elements',
        icon: LightningIcon
      }
    ]}
    notifications={jettyNotifications}
    on:notification-opened={markLatestNotificationAsSeen}
    on:close={() => {
      const url = $page.url.searchParams
      url.delete('glossaryAnchor')
      goto(`?${url}`)
    }}
    let:currentMenuItem
  >
    {#if currentMenuItem.id === 'glossary'}
      <Glossary bind:this={glossary} glossary={loadGlossary('en')} />
    {/if}

    {#if currentMenuItem.id === 'fuse-elements'}
      <FuseElements />
    {/if}
  </JettyMenu>

  <style lang="scss">
    :global(.jetty-menu) {
      z-index: 4;
    }
  </style>
{/if}
