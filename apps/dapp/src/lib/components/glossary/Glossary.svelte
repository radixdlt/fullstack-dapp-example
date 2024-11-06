<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { context } from '../jetty-menu/JettyMenu.svelte'
  import { goto } from '$app/navigation'
  import { page as pageStore } from '$app/stores'
  export let glossary: {
    id: string
    title: string
    html: string
  }[]

  const dispatch = createEventDispatcher()
  export const openGlossaryItem = (id: string) => {
    page = 'item'
    selectedItem = id
    navigationHistory = [...navigationHistory, id]
    dispatch('open-item', { id })
  }

  let navigationHistory: string[] = []

  let page: 'glossary' | 'item' = 'glossary'
  let selectedItem: string

  const back = context.get('back')
  const close = context.get('closeMenuItem')

  $: if ($back) {
    if (page === 'item') {
      navigationHistory = navigationHistory.slice(0, -1)
      if (navigationHistory.length > 0) {
        selectedItem = navigationHistory[navigationHistory.length - 1]
        dispatch('open-item', { id: selectedItem })
        goto($pageStore.url.href.split('?')[0])
      } else {
        page = 'glossary'
      }
    } else {
      close()
    }
    $back = false
  }
</script>

{#if page === 'item' && selectedItem}
  <div class="item-page">
    {#key selectedItem}
      {@html glossary.find(({ id }) => id === selectedItem)?.html}
    {/key}
  </div>
{:else}
  <div class="glossary">
    {#each glossary as { title, id }}
      <button class="item" on:click={() => openGlossaryItem(id)}>
        {title}
      </button>
    {/each}
  </div>
{/if}

<style lang="scss">
  .glossary {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2xl);
    padding: var(--spacing-2xl);
  }

  .item {
    color: var(--color-light);
    font-weight: var(--font-weight-bold);
  }

  .item-page {
    color: var(--color-light);
    background: var(--color-background-dark);
    width: 100%;
    padding: var(--spacing-2xl);

    > :global(h2) {
      color: var(--color-light);
      margin-top: 0;
    }

    @include markdownLinkStyles();
    @include markdownBlockquoteStyles();
    @include markdownTextStyles();
    :global(p) > :global(img) {
      max-width: 100%;
    }
  }
</style>
