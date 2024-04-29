<script lang="ts">
  import Backdrop from '$lib/components/backdrop/Backdrop.svelte'
  import Glossary from '$lib/components/glossary/Glossary.svelte'
  import JettyDialog from '$lib/components/jetty-dialog/JettyDialog.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import GlossaryIcon from '@images/book-open.svg'
  import { jettyDialog, jettyMessage, quests } from '../stores'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import JettyActionButtons from '$lib/components/quest/JettyActionButtons.svelte'

  export let onGlossaryClose: undefined | (() => void) = undefined
  let showJettyMenu = false
  $: anchor = $page.url.searchParams.get('glossaryAnchor')
  $: showGlossary = !!anchor
  $: if (showGlossary) showJettyMenu = false

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      if (showGlossary) {
        showGlossary = false
      } else {
        showJettyMenu = false
      }
    }
  }

  let showJettyMessage = false

  $: if ($jettyMessage) {
    showJettyMessage = true
  }
</script>

<svelte:window on:keydown={(e) => handleKeydown(e)} />

<JettyDialog
  dialogs={showJettyMenu || showJettyMessage || $jettyDialog ? 1 : 0}
  let:Menu
  on:click={() => {
    if (showGlossary) {
      if (onGlossaryClose) onGlossaryClose()
      showGlossary = false
    }

    if ($page.url.pathname === '/') {
      showJettyMenu = !showJettyMenu
    }
  }}
  close={showGlossary}
>
  {#if showJettyMessage}
    {#if $jettyMessage === 'LoggedIn'}
      {$i18n.t('jetty:logged-in-with-wallet')}

      <JettyActionButtons
        backText="Dismiss"
        nextText="Go back to quest"
        on:back={() => {
          $jettyMessage = undefined
          showJettyMessage = false
        }}
        on:next={() => {
          showJettyMessage = false
          $jettyMessage = undefined
          goto(`/quest/${$quests.LoginWithWallet.id}`)
        }}
      />
    {/if}
  {:else if showJettyMenu}
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
  {:else if $jettyDialog}
    <svelte:component this={$jettyDialog.component} {...$jettyDialog.props} />
  {/if}
</JettyDialog>

{#if showGlossary}
  <Backdrop zIndex={anchor ? 4 : 1}>
    <Glossary on:close={() => (showGlossary = false)} />
  </Backdrop>
{/if}
