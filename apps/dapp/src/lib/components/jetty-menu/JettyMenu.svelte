<script lang="ts" context="module">
  export const context = useContext<{
    back: Writable<boolean>
    closeMenuItem: () => void
  }>()
</script>

<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import Icon from '../icon/Icon.svelte'
  import JettyPopup from './JettyPopup.svelte'
  import CrossIcon from '@images/cross.svg'
  import ChevronIcon from '@images/chevron-left.svg'
  import JettyMenuButton from './JettyMenuButton.svelte'
  import { fly, scale } from 'svelte/transition'
  import { writable, type Writable } from 'svelte/store'
  import { useContext } from '$lib/utils/context'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import type { JettyNotification, jettyNotifications } from '../../../stores'
  import { createEventDispatcher } from 'svelte'
  import Notification from './Notification.svelte'

  export let expanded = false
  export let poppedUp = true
  export let menuItems: {
    id: string
    text: string
    icon: string
  }[]
  export let notifications: typeof jettyNotifications = writable([])
  export let hideJetty = false

  export const openMenuItem = (id: string) => {
    expanded = true
    showMenuItemContent = true
    currentMenuItem = id
  }

  let headerText = $i18n.t('jetty:menu-text')
  let showMenuItemContent = false
  let currentMenuItem: string

  let latestNotification: JettyNotification

  const dispatch = createEventDispatcher<{
    'notification-opened': undefined
    close: undefined
  }>()

  const popNotification = () => {
    latestNotification = $notifications[$notifications.length - 1]

    dispatch('notification-opened')
  }

  context.set('closeMenuItem', () => {
    showMenuItemContent = false
  })

  const back = writable(false)

  context.set('back', back)

  const menuPositionFactor = tweened<number>(undefined, {
    duration: 500,
    easing: cubicOut
  })

  const jettyPosition = tweened<number>(undefined, {
    duration: 500,
    easing: cubicOut
  })

  $: expanded ? ($menuPositionFactor = 0) : ($menuPositionFactor = 1)

  $: poppedUp ? ($jettyPosition = 0) : ($jettyPosition = 0.3)

  $: if (!expanded) dispatch('close')

  const height = 30
  const iconHeight = 5.5
</script>

<div class="jetty-menu" style:--menuPosition={`${height * $menuPositionFactor * 0.99}rem`}>
  <div
    class="jetty-icon"
    style:--height={`-${iconHeight}rem`}
    style:transform="translateY({iconHeight * $jettyPosition + 8}px)"
  >
    <JettyPopup
      on:click={() => {
        expanded = !expanded
      }}
      {hideJetty}
      showDownArrow={expanded}
      notification={$notifications.length > 0}
    />
  </div>
  <div class="header">
    <div class="back">
      <Icon
        url={ChevronIcon}
        on:click={() => {
          $back = true
        }}
        clickable
      />
    </div>

    <div class="text">
      {headerText}
    </div>

    <div class="close">
      <Icon
        url={CrossIcon}
        clickable
        on:click={() => {
          expanded = false
        }}
      />
    </div>
  </div>
  <div class="content">
    {#if showMenuItemContent}
      <div
        class="menu-item-page"
        transition:fly={{
          x: 500,
          duration: 500,
          opacity: 1
        }}
      >
        <slot {currentMenuItem} {back} />
      </div>
    {/if}

    <div class="main-menu-page">
      {#if $notifications.length > 0}
        <div transition:scale>
          <Notification
            title="Notification title"
            html="Looks like you have blah lbah!"
            on:dismiss={popNotification}
            on:goToQuest={() => {
              popNotification()
              latestNotification.onGoToQuest()
            }}
          />
        </div>
      {/if}

      {#each menuItems as { id, text, icon }}
        <JettyMenuButton
          {text}
          {icon}
          on:click={() => {
            showMenuItemContent = true
            currentMenuItem = id
          }}
        />
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .jetty-menu {
    display: flex;
    flex-direction: column;
    background-color: var(--color-background-dark);
    height: 30rem;
    width: 25rem;
    border-radius: var(--border-radius-xl) var(--border-radius-xl) 0 0;
    position: absolute;
    bottom: 0%;
    transform: translateY(var(--menuPosition));

    @include desktop {
      right: 1rem;
    }

    @include mobile {
      width: 100vw;
    }
  }

  .jetty-icon {
    position: absolute;
    top: var(--height);
    right: 1.5rem;
    z-index: 1;
  }

  .header {
    border-radius: var(--border-radius-xl) var(--border-radius-xl) 0 0;
    width: 100%;
    height: 4rem;
    background-color: var(--color-dark);
    color: var(--color-light);
    display: flex;
    justify-content: space-around;
    z-index: 2;

    * {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .back,
    .close {
      filter: invert(1);
      opacity: 0.6;
    }

    .text {
      font-weight: var(--font-weight-bold);
    }
  }

  .content {
    display: grid;
    > * {
      grid-area: 1 / 1;
      padding: var(--spacing-2xl);
    }

    overflow-x: hidden;
    z-index: 2;
  }

  .main-menu-page {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
  }

  .menu-item-page {
    height: 100%;
    width: 100%;
    background: var(--color-background-dark);
    z-index: 2;
  }
</style>
