<script lang="ts" context="module">
  export const context = useContext<{
    back: Writable<boolean>
    closeMenuItem: () => void
    hideBackButton: Writable<boolean>
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
  import { get, writable, type Readable, type Writable } from 'svelte/store'
  import { useContext } from '$lib/utils/context'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import { user, type JettyNotification, type jettyNotifications } from '../../../stores'
  import { createEventDispatcher } from 'svelte'
  import Notification from './Notification.svelte'
  import { swipe } from 'svelte-gestures'

  export let expanded = false
  export let poppedUp = true
  export let menuItems: {
    id: string
    text: string
    icon: string
    disabled?: Readable<boolean>
    alert?: Writable<boolean>
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
    open: undefined
    'hover-over-jetty': boolean
    'item-content-closed': undefined
  }>()

  const popNotification = () => {
    latestNotification = $notifications[$notifications.length - 1]

    dispatch('notification-opened')
  }

  const hideBackButton = writable(false)

  context.set('closeMenuItem', () => {
    showMenuItemContent = false
  })

  context.set('hideBackButton', hideBackButton)

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

  $: if (!showMenuItemContent) {
    $hideBackButton = false
    dispatch('item-content-closed')
  }

  let enabledItems: typeof menuItems
  let disabledItems: typeof menuItems

  $: {
    $user
    enabledItems = menuItems.filter((item) => (item.disabled ? !get(item.disabled) : true))
  }

  $: {
    $user
    disabledItems = menuItems.filter((item) => (item.disabled ? get(item.disabled) : false))
  }

  $: if (!expanded) {
    setTimeout(() => (showMenuItemContent = false), 500)
  }
</script>

<div
  class="jetty-menu"
  style:--menuPosition={`${$menuPositionFactor * 98}%`}
  use:swipe
  on:swipe={() => {}}
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="jetty-icon"
    style:--iconPosition={`${$jettyPositionFactor * 30 - 88}%`}
    on:mouseenter={() => {
      dispatch('hover-over-jetty', true)
    }}
    on:mouseleave={() => {
      dispatch('hover-over-jetty', false)
    }}
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
      {#if showMenuItemContent && !$hideBackButton}
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

        {#each enabledItems as item}
          <JettyMenuButton
            text={item.text}
            icon={item.icon}
            alert={item.alert}
            on:click={() => {
              showMenuItemContent = true
              currentMenuItem = item
            }}
          />
        {/each}

        {#if disabledItems.length > 0}
          {$i18n.t('jetty:connect-your-wallet')}

          {#each disabledItems as item}
            <JettyMenuButton disabled text={item.text} icon={item.icon} alert={item.alert} />
          {/each}
        {/if}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .jetty-menu {
    display: grid;
    grid-template-rows: 4rem 1fr;
    background-color: var(--color-background-dark);
    height: 34rem;
    width: 25rem;
    max-height: 80%;
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
    scrollbar-width: none;
    overflow-y: scroll;
  }

  .main-menu-page {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
    color: var(--color-light);
    font-weight: var(--font-weight-bold);
  }

  .menu-item-page {
    width: 100%;
    background: var(--color-background-dark);
    z-index: 2;
    overflow-y: scroll;
    scrollbar-width: none;
  }
</style>
