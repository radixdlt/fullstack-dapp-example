<script lang="ts">
  import { crossfade, fade } from 'svelte/transition'
  import CardHeader from '../card-header/CardHeader.svelte'
  import { i18n } from '$lib/i18n'

  export let glossary: {
    title: string
    html: string
  }[]

  let selectedTitle: string

  let page: 'glossary' | 'title' = 'glossary'

  $: html = glossary.find((g) => g.title === selectedTitle)?.html

  const crossfadeDuration = 1000

  const [send, receive] = crossfade({
    duration: crossfadeDuration
  })
</script>

<div class="glossary card">
  <div class="header">
    <CardHeader on:click={() => (page = 'glossary')}>{$i18n.t('glossary_back')}</CardHeader>
  </div>

  {#if page === 'title'}
    <div class="grid-item">
      <div class="title" out:send={{ key: selectedTitle }} in:receive={{ key: selectedTitle }}>
        {selectedTitle}
      </div>
      <div in:fade={{ delay: crossfadeDuration }} out:fade class="text">
        {@html html}
      </div>
    </div>
  {/if}

  {#if page === 'glossary'}
    <div class="grid-item" out:fade>
      {#each glossary as { title }}
        <div
          in:fade|global={{
            duration: selectedTitle === title ? 0 : crossfadeDuration * 0.4,
            delay: selectedTitle === title ? 0 : crossfadeDuration * 0.6
          }}
        >
          <div
            in:fade|global={{
              duration: crossfadeDuration * 0.4,
              delay: crossfadeDuration * 0.8
            }}
            class="divider"
          />
          <button
            class="title"
            on:click={() => {
              selectedTitle = title
              page = 'title'
            }}
            out:send|global={{ key: title }}
            in:receive|global={{ key: title }}
          >
            {title}
          </button>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .glossary {
    display: grid;
    grid-template-rows: auto 1fr;
    height: 70vh;
    max-height: 40rem;
    max-width: 50rem;
  }

  .header {
    padding-bottom: var(--spacing-xl);
  }

  .grid-item {
    grid-area: 2 / 1;
    overflow-y: auto;
  }

  .title {
    font-weight: var(--font-weight-bold);
    padding: var(--spacing-xl) var(--spacing-lg);
    width: fit-content;
  }

  .divider {
    height: 1px;
    background: rgba($color: black, $alpha: 0.2);
  }

  .text {
    padding: var(--spacing-lg);
  }
</style>
