<script lang="ts">
  import { crossfade, fade } from 'svelte/transition'
  import CardHeader from '../card-header/CardHeader.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { createEventDispatcher } from 'svelte'

  export let glossary: {
    title: string
    html: string
  }[]

  // Glossary can have anchor to directly open glossary definition
  export let anchor: string = ''
  $: selectedTitle = anchor ?? ''
  $: pageTitle = selectedTitle ? 'title' : 'glossary'

  $: html = glossary.find(
    (g) => g.title.toLowerCase().trim() === selectedTitle.toLowerCase().trim()
  )?.html

  const crossfadeDuration = 500

  const [send, receive] = crossfade({
    duration: crossfadeDuration
  })

  const dispatch = createEventDispatcher<{ close: undefined }>()
</script>

<div class="glossary card glossary-card">
  {#if !anchor}
    <div>
      <div class="header">
        <CardHeader
          on:click={() => {
            if (pageTitle === 'title') {
              pageTitle = 'glossary'
              selectedTitle = ''
            } else {
              dispatch('close')
            }
          }}
        >
          {selectedTitle ? selectedTitle : $i18n.t('glossary:back')}
        </CardHeader>
      </div>
      {#if selectedTitle}
        <div class="divider-anchor" />
      {/if}
    </div>
  {:else}
    <div class="anchor-container">
      <div
        class="title-anchor"
        out:send={{ key: selectedTitle }}
        in:receive={{ key: selectedTitle }}
      >
        {selectedTitle}
      </div>
      <div class="divider-anchor" />
    </div>
  {/if}

  {#if pageTitle === 'title'}
    <div class="grid-item grid-item-description">
      <div class="text">
        {#if html}
          {@html html}
        {:else}
          {$i18n.t('glossary:definitionMissing')}
        {/if}
      </div>
    </div>
  {/if}

  {#if pageTitle === 'glossary'}
    <div class="grid-item" out:fade>
      {#each glossary as { title }, index}
        <div
          in:fade|global={{
            duration: selectedTitle === title ? 0 : crossfadeDuration * 0.4,
            delay: selectedTitle === title ? 0 : crossfadeDuration * 0.6
          }}
        >
          {#if index !== 0 || !selectedTitle}
            <div
              in:fade|global={{
                duration: crossfadeDuration * 0.4,
                delay: crossfadeDuration * 0.8
              }}
              class="divider"
            />
          {/if}
          <button
            class="title"
            on:click={() => {
              selectedTitle = title
              pageTitle = 'title'
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
    bottom: 6rem;
    position: fixed;
    display: grid;
    grid-template-rows: auto 1fr;
    height: 70vh;
    max-height: 40rem;
    min-width: 20rem;
    width: 80vw;
    background-color: transparent;
    @include desktop {
      right: 0.5rem;
      max-width: 431px;
    }
    @include mobile {
      max-width: 768px;
    }
  }

  .glossary-card {
    padding: 0px;
  }

  .header {
    padding: var(--spacing-xl);
  }

  .grid-item {
    grid-area: 2 / 1;
    overflow-y: auto;
  }

  .title {
    font-weight: var(--font-weight-bold);
    width: fit-content;
    padding: var(--spacing-xl);
    padding-left: var(--spacing-2xl);
  }

  .title-anchor {
    font-weight: var(--font-weight-bold);
    width: fit-content;
    padding: var(--spacing-xl) var(--spacing-2xl);
  }

  .divider-anchor {
    height: 1px;
    background: rgba($color: black, $alpha: 0.2);
    width: 100%;
  }

  .anchor-container {
    display: flex;
  }
  .divider {
    height: 1px;
    background: rgba($color: black, $alpha: 0.2);
  }

  .grid-item-description {
    padding: var(--spacing-xl);
  }

  .text {
    padding: var(--spacing-lg);
  }
</style>
