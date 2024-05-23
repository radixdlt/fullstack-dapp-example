<script lang="ts">
  import Backdrop from '$lib/components/backdrop/Backdrop.svelte'
  import JettyDialog from '$lib/components/jetty-dialog/JettyDialog.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import GlossaryIcon from '@images/book-open.svg'
  import Glossary from '$lib/components/glossary/Glossary.svelte'
  import type {
    JettyDialog as JettyDialogT,
    jettyNotifications,
    JettyNotification
  } from '../../../stores'
  import { createEventDispatcher, type ComponentProps } from 'svelte'
  import Menu from '../jetty-dialog/speech-bubble/Menu.svelte'
  import { writable } from 'svelte/store'
  import JettyActionButtons from '../quest/JettyActionButtons.svelte'

  export let notifications: typeof jettyNotifications = writable([])
  export let dialog: JettyDialogT | undefined = undefined
  export let glossary: ComponentProps<Glossary>['glossary']
  export let glossaryItem: string | undefined = undefined
  export let disabled = false

  let showJettyMenu = false
  let showNotification = false
  let showGlossary = false

  let latestNotification: JettyNotification

  const dispatch = createEventDispatcher<{
    'close-glossary': undefined
    'notification-opened': undefined
  }>()

  export const close = () => {
    showGlossary = false
    showJettyMenu = false
    showNotification = false
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') close()
  }

  const popNotification = (showMenu = true) => {
    latestNotification = $notifications[$notifications.length - 1]

    if (!latestNotification) {
      showNotification = false
      if (showMenu) showJettyMenu = true
    }

    dispatch('notification-opened')
  }

  const onClick = () => {
    if (hasNotifications) {
      showNotification = true
      popNotification()
    } else {
      if (showGlossary) {
        showGlossary = false
        glossaryItem = undefined
        dispatch('close-glossary')
      } else {
        showJettyMenu = !showJettyMenu
      }
    }
  }

  $: hasNotifications = $notifications.length > 0

  $: if (glossaryItem) showGlossary = true
</script>

<svelte:window on:keydown={(e) => handleKeydown(e)} />

<JettyDialog
  dialogs={showJettyMenu || showNotification || glossaryItem || dialog ? 1 : 0}
  on:click={onClick}
  close={showGlossary}
  notification={hasNotifications}
  {disabled}
  let:SpeechBubble
>
  {#if showNotification}
    <SpeechBubble>
      {#if latestNotification.type === 'text'}
        {latestNotification.text}
      {:else}
        <svelte:component this={latestNotification.component} {...latestNotification.props} />
      {/if}
      <JettyActionButtons
        backText="Dismiss"
        nextText="Go to quest"
        on:back={() => popNotification()}
        on:next={() => {
          latestNotification.onGoToQuest?.()
          popNotification(false)
        }}
      />
    </SpeechBubble>
  {:else if showGlossary}
    <Glossary {glossary} anchor={glossaryItem} />
  {:else if showJettyMenu}
    <SpeechBubble>
      {$i18n.t('jetty:menu-text')}
      <Menu
        options={[
          {
            text: $i18n.t('jetty:menu-glossary'),
            iconUrl: GlossaryIcon,
            onClick: () => (showGlossary = true)
          }
        ]}
      />
    </SpeechBubble>
  {:else if dialog}
    <SpeechBubble>
      <svelte:component this={dialog.component} {...dialog.props} />
    </SpeechBubble>
  {/if}
</JettyDialog>

{#if showGlossary}
  <Backdrop zIndex={4} />
{/if}
