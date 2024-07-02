<script lang="ts">
  import Glossary from '$lib/components/glossary/Glossary.svelte'
  import JettyMenu from '$lib/components/jetty-menu/JettyMenu.svelte'
  import BookIcon from '@images/book-open.svg'
  import LightningIcon from '@images/lightning-icon.svg'
  import { loadGlossary } from 'content'
  import FuseElements, { checkClaimAvailable } from './FuseElements.svelte'
  import { page } from '$app/stores'
  import { markLatestNotificationAsSeen } from '$lib/notifications'
  import {
    hideJetty,
    hideJettyMenu,
    jettyNotifications,
    retractJettyMenu,
    user
  } from '../../stores'
  import { tick } from 'svelte'
  import { isMobile } from '$lib/utils/is-mobile'
  import { writable } from 'svelte/store'

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

  let claimAvailable = writable(false)

  const checkClaimStatus = () => {
    checkClaimAvailable($user?.id!)
      .map(() => {
        claimAvailable.set(true)
      })
      .mapErr(() => {
        claimAvailable.set(false)
      })
  }

  $: if (expanded) checkClaimStatus()
</script>

{#if !$hideJettyMenu}
  <JettyMenu
    bind:expanded
    bind:this={jettyMenu}
    on:hover-over-jetty={(e) => {
      hoveringOverJetty = e.detail
    }}
    on:item-content-closed={checkClaimStatus}
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
        icon: LightningIcon,
        alert: claimAvailable
      }
    ]}
    notifications={jettyNotifications}
    on:notification-opened={markLatestNotificationAsSeen}
    let:currentMenuItem
    let:back
  >
    {#if currentMenuItem.id === 'glossary'}
      <Glossary bind:this={glossary} glossary={loadGlossary('en')} />
    {/if}

    {#if currentMenuItem.id === 'fuse-elements'}
      <FuseElements
        on:cancel={() => {
          back.set(true)
        }}
      />
    {/if}
  </JettyMenu>

  <style lang="scss">
    :global(.jetty-menu) {
      z-index: 4;
    }
  </style>
{/if}
