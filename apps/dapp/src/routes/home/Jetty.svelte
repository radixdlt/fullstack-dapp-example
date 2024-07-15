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
  import { derived, writable } from 'svelte/store'
  import MinimizeIcon from '@images/minimize.svg'
  import CreateRadMorphs from './CreateRadMorphs.svelte'
  import OpenGiftBox, { getRewards } from './OpenGiftBox.svelte'
  import { goto } from '$app/navigation'

  let poppedUp = false
  let expanded = false

  $: poppedUp = isMobile() ? expanded : expanded || hoveringOverJetty

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

  const checkClaimStatus = () => {
    checkClaimAvailable($user?.id!)
      .map(() => {
        claimAvailable.set(true)
      })
      .mapErr(() => {
        claimAvailable.set(false)
      })
  }

  const checkGiftBoxStatus = () => {
    getRewards($user?.id!)
      .map(() => {
        giftBoxRewardsAvailable.set(true)
      })
      .mapErr(() => {
        giftBoxRewardsAvailable.set(false)
      })
  }

  $: if (expanded) {
    checkClaimStatus()
    checkGiftBoxStatus()
  }

  const undoGlossaryAnchor = () => {
    goto($page.url.href.split('?')[0])
  }

  $: if (!expanded && glossaryAnchor) {
    undoGlossaryAnchor()
  }
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
        id: 'gift-box',
        text: 'Open Gift Box',
        icon: LightningIcon,
        alert: giftBoxRewardsAvailable,
        disabled: derived(user, ($user) => !($user && $user.accountAddress && $user.id))
      },
      {
        id: 'fuse-elements',
        text: 'Fuse Elements',
        icon: LightningIcon,
        alert: claimAvailable,
        disabled: derived(user, ($user) => !($user && $user.accountAddress && $user.id))
      },
      {
        id: 'radmorphs',
        text: 'Create RadMorphs',
        icon: MinimizeIcon,
        disabled: derived(user, ($user) => !($user && $user.accountAddress && $user.id))
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

    {#if currentMenuItem.id === 'gift-box'}
      <OpenGiftBox
        on:cancel={() => {
          back.set(true)
        }}
      />
    {/if}

    {#if currentMenuItem.id === 'fuse-elements'}
      <FuseElements
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
