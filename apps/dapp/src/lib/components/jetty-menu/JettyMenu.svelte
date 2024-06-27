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
  import { scale } from 'svelte/transition'
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
    currentMenuItem = menuItems.find((item) => item.id === id)!
  }

  let headerText: string
  let showMenuItemContent = false
  let currentMenuItem: (typeof menuItems)[number]

  $: if (currentMenuItem && showMenuItemContent) {
    headerText = currentMenuItem.text
  } else {
    headerText = $i18n.t('jetty:menu-text')
  }

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

  const jettyPositionFactor = tweened<number>(undefined, {
    duration: 500,
    easing: cubicOut
  })

  $: expanded ? ($menuPositionFactor = 0) : ($menuPositionFactor = 1)

  $: poppedUp ? ($jettyPositionFactor = 0) : ($jettyPositionFactor = 1)

  $: if (!expanded) dispatch('close')

  $: latestNotification = $notifications[$notifications.length - 1]
</script>

<div class="jetty-menu" style:--menuPosition={`${$menuPositionFactor * 98}%`}>
  <div class="jetty-icon" style:--iconPosition={`${$jettyPositionFactor * 30 - 88}%`}>
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
      {#if showMenuItemContent}
        <Icon
          url={ChevronIcon}
          on:click={() => {
            $back = true
          }}
          clickable
        />
      {/if}
    </div>

    <div class="text">
      {#if currentMenuItem && showMenuItemContent}
        <Icon url={currentMenuItem.icon} />
      {/if}
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
      <div class="menu-item-page">
        <slot {currentMenuItem} {back} />
      </div>
    {:else}
      <div class="main-menu-page">
        {#if $notifications.length > 0}
          <div transition:scale>
            <Notification
              title="Notification title"
              text={latestNotification.text}
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
              currentMenuItem = { id, text, icon }
            }}
          />
        {/each}
      </div>
    {/if}
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
    bottom: 0;
    z-index: 4;
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
    top: 0;
    right: 1.5rem;
    z-index: 1;
    transform: translateY(var(--iconPosition));
  }

  .header {
    border-radius: var(--border-radius-xl) var(--border-radius-xl) 0 0;
    width: 100%;
    height: 4rem;
    background-color: var(--color-dark);
    color: var(--color-light);
    display: flex;
    justify-content: space-between;
    padding: 0 var(--spacing-xl);
    z-index: 2;

    > * {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .text {
      display: flex;
      gap: var(--spacing-md);
    }
    .back,
    .close {
      filter: invert(1);
      opacity: 0.6;
      width: 2rem;
    }

    .text {
      font-weight: var(--font-weight-bold);
    }
  }

  .content {
    padding: var(--spacing-2xl);
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
