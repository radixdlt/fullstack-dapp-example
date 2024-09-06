<script lang="ts">
  import Glossary from '$lib/components/glossary/Glossary.svelte'
  import JettyMenu from '$lib/components/jetty-menu/JettyMenu.svelte'
  import BookIcon from '@images/book-open.svg'
  import LightningIcon from '@images/lightning-icon.svg'
  import BoxIcon from '@images/box.svg'
  import { loadGlossary } from 'content'
  import CreateRadGems from './CreateRadGems.svelte'
  import { checkClaimAvailable } from './ClaimRadGem.svelte'
  import { page } from '$app/stores'
  import { markLatestNotificationAsSeen } from '$lib/notifications'
  import {
    hasHeroBadge,
    hideJetty,
    hideJettyMenu,
    jettyNotifications,
    deriveIsUserBlockedAlternative,
    retractJettyMenu,
    user
  } from '../../stores'
  import { tick } from 'svelte'
  import { derived, writable } from 'svelte/store'
  import MinimizeIcon from '@images/minimize.svg'
  import CreateRadMorphs from './CreateRadMorphs.svelte'
  import OpenGiftBox, { getGiftBoxStatus } from './OpenGiftBox.svelte'
  import { goto } from '$app/navigation'
  import { i18n } from '$lib/i18n/i18n'
  import { userApi } from '$lib/api/user-api'

  let poppedUp = false
  let expanded = false

  $: poppedUp = expanded || hoveringOverJetty //|| $jettyNotifications.length > 0

  $: glossaryAnchor = $page.url.href.includes('glossaryAnchor')
    ? $page.url.href.split('glossaryAnchor=')[1]
    : undefined

  const openGlossaryItem = () => {
    jettyMenu.openMenuItem('glossary')
    tick().then(() => glossary.openGlossaryItem(glossaryAnchor!))
  }

  $: if (glossaryAnchor && jettyMenu) {
    openGlossaryItem()
  }

  let jettyMenu: JettyMenu
  let glossary: Glossary

  $: if ($retractJettyMenu) {
    expanded = false
    $retractJettyMenu = false
  }

  let hoveringOverJetty = false

  let claimAvailable = writable(false)
  let giftBoxRewardsAvailable = writable(false)

  const checkRadgemStatus = () => {
    userApi.hasWaitingRadgemJob().map((data) => {
      waitingForRadgems.set(data)
    })
    checkClaimAvailable($user?.id!, false)
      .orElse(() => checkClaimAvailable($user?.id!, true))
      .map(() => {
        claimAvailable.set(true)
      })
      .mapErr(() => {
        claimAvailable.set(false)
      })
  }

  const checkGiftBoxStatus = () => {
    getGiftBoxStatus($user?.id!).map((data) => {
      waitingForGiftBox.set(data.waitingForGiftBox)
      giftBoxRewardsAvailable.set(data.giftBoxRewardsAvailable)
    })
  }

  $: if (expanded && !showMenuItemContent) {
    checkRadgemStatus()
    checkGiftBoxStatus()
  }

  let showMenuItemContent: boolean

  const undoGlossaryAnchor = () => {
    goto($page.url.href.split('?')[0])
  }

  $: if (!expanded && glossaryAnchor) {
    undoGlossaryAnchor()
  }

  const missingHeroBadge = derived(hasHeroBadge, ($hasHeroBadge) => !$hasHeroBadge)
  const jettyMenuDisabled = deriveIsUserBlockedAlternative(missingHeroBadge)

  const waitingForGiftBox = writable(false)
  const waitingForRadgems = writable(false)

  $: if ($claimAvailable) {
    $waitingForRadgems = false
  }

  $: {
    $missingHeroBadge
    menuItems = [...menuItems]
  }

  let menuItems = [
    {
      id: 'glossary',
      text: $i18n.t('jetty:menu-glossary'),
      icon: BookIcon
    },
    {
      id: 'gift-box',
      text: $i18n.t('jetty:menu-giftBox'),
      icon: BoxIcon,
      alert: giftBoxRewardsAvailable,
      disabled: jettyMenuDisabled,
      loading: waitingForGiftBox
    },
    {
      id: 'create-radgems',
      text: $i18n.t('jetty:menu-radgems'),
      icon: LightningIcon,
      alert: claimAvailable,
      disabled: jettyMenuDisabled,
      loading: waitingForRadgems
    },
    {
      id: 'radmorphs',
      text: $i18n.t('jetty:menu-radmorphs'),
      icon: MinimizeIcon,
      disabled: jettyMenuDisabled
    }
  ]
</script>

{#if !$hideJettyMenu}
  <JettyMenu
    bind:showMenuItemContent
    bind:expanded
    bind:this={jettyMenu}
    on:hover-over-jetty={(e) => {
      hoveringOverJetty = e.detail
    }}
    on:item-content-closed={() => {
      checkRadgemStatus()
      checkGiftBoxStatus()
    }}
    hideJetty={$hideJetty}
    {poppedUp}
    {menuItems}
    notifications={jettyNotifications}
    on:notification-opened={markLatestNotificationAsSeen}
    let:currentMenuItem
    let:back
  >
    {#if currentMenuItem.id === 'glossary'}
      <Glossary
        bind:this={glossary}
        glossary={loadGlossary('en')}
        on:open-item={jettyMenu.scrollToTop}
      />
    {/if}

    {#if currentMenuItem.id === 'gift-box'}
      <OpenGiftBox
        on:cancel={() => {
          back.set(true)
        }}
      />
    {/if}

    {#if currentMenuItem.id === 'create-radgems'}
      <CreateRadGems
        on:cancel={() => {
          back.set(true)
        }}
      />
    {/if}

    {#if currentMenuItem.id === 'radmorphs'}
      <CreateRadMorphs
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
