<script lang="ts">
  import Backdrop from '$lib/components/backdrop/Backdrop.svelte'
  import Glossary from '$lib/components/glossary/Glossary.svelte'
  import JettyDialog from '$lib/components/jetty-dialog/JettyDialog.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import GlossaryIcon from '@images/book-open.svg'
  import DevMode from './DevMode.svelte'

  let showJettyMenu = false

  let showGlossary = false

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
</script>

<svelte:window on:keydown={(e) => handleKeydown(e)} />

<JettyDialog
  dialogs={showJettyMenu ? 1 : 0}
  let:Menu
  on:click={() => {
    if (showGlossary) showGlossary = false
    else showJettyMenu = !showJettyMenu
  }}
  close={showGlossary}
>
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
</JettyDialog>

{#if showGlossary}
  <Backdrop>
    <Glossary on:close={() => (showGlossary = false)} />
  </Backdrop>
{/if}

{#if import.meta.env.MODE === 'development'}
  <DevMode />
{/if}
