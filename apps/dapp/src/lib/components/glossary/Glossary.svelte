<script lang="ts">
  import { context } from '../jetty-menu/JettyMenu.svelte'

  export let glossary: {
    id: string
    title: string
    html: string
  }[]

  export const openGlossaryItem = (id: string) => {
    page = 'item'
    selectedItem = id
  }

  let page: 'glossary' | 'item' = 'glossary'
  let selectedItem: string

  const back = context.get('back')
  const close = context.get('closeMenuItem')

  $: if ($back) {
    if (page === 'item') {
      page = 'glossary'
    } else {
      close()
    }
    $back = false
  }
</script>

{#if page === 'item' && selectedItem}
  <div class="item-page">
    {@html glossary.find(({ id }) => id === selectedItem)?.html}
  </div>
{:else}
  <div class="glossary">
    {#each glossary as { title, id }}
      <button
        class="item"
        on:click={() => {
          page = 'item'
          selectedItem = id
        }}
      >
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
