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
  import { tick } from 'svelte'
  import { pushState } from '$app/navigation'
  import { isMobile } from '$lib/utils/is-mobile'

  let poppedUp = false
  let expanded = false

  $: poppedUp = isMobile() ? expanded : expanded || hoveringOverJetty

  $: glossaryAnchor = $page.url.href.includes('glossaryAnchor')
    ? $page.url.href.split('glossaryAnchor=')[1]
    : undefined

  $: if (glossaryAnchor && jettyMenu) {
    jettyMenu.openMenuItem('glossary')
    tick().then(() => glossary.openGlossaryItem(glossaryAnchor))
  }

  let jettyMenu: JettyMenu
  let glossary: Glossary

  $: if ($retractJettyMenu) {
    expanded = false
    $retractJettyMenu = false
  }

  let hoveringOverJetty = false

  const setExpanded = (value: boolean) => (expanded = value)

  $: if (!($page.state as any).jettyMenuExpanded) setExpanded(false)
</script>

{#if !$hideJettyMenu}
  <JettyMenu
    bind:expanded
    bind:this={jettyMenu}
    on:hover-over-jetty={(e) => {
      hoveringOverJetty = e.detail
    }}
    on:open={() => {
      pushState('', { jettyMenuExpanded: true })
    }}
    on:close={() => {
      history.back()
    }}
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
