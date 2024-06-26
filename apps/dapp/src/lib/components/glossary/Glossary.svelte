<script lang="ts">
  import { fly } from 'svelte/transition'
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

<div class="grid-container">
  {#if page === 'item' && selectedItem}
    <div
      class="item-page"
      transition:fly={{
        x: 500,
        duration: 500,
        opacity: 1
      }}
    >
      {@html glossary.find(({ id }) => id === selectedItem)?.html}
    </div>
  {/if}

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
</div>

<style lang="scss">
  .grid-container {
    display: grid;

    * {
      grid-area: 1 / 1;
    }
  }

  .glossary {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2xl);
  }

  .item {
    color: var(--color-light);
    font-weight: var(--font-weight-bold);
  }

  .item-page {
    color: var(--color-light);
    background: var(--color-background-dark);
    height: 100%;
    width: 100%;
    z-index: 2;
    padding-left: 1rem;
    margin-left: calc(var(--spacing-2xl) * -1);
    padding-left: var(--spacing-2xl);
  }
</style>
