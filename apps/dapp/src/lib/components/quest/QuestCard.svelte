<script lang="ts">
  import Icon from '$lib/components/icon/Icon.svelte'
  import CrossIcon from '@images/cross.svg'
  import Button from '$lib/components/button/Button.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import ProgressCard from '../progress-card/ProgressCard.svelte'
  import { createEventDispatcher } from 'svelte'
  import NavigationFooter from './NavigationFooter.svelte'
  import { writable, type Writable } from 'svelte/store'

  export let title: string
  export let steps: number
  export let progress: number
  export let cardDisabled = false
  export let nextOnClick: (next: () => void, loading: Writable<boolean>) => void = () => {
    dispatch('next')
  }
  export let backOnClick: () => void = () => {
    dispatch('prev')
  }
  export let footerNextDisabled = false
  export let nextButtonText: string | undefined
  export let backButtonText: string | undefined

  const dispatch = createEventDispatcher<{
    next: undefined
    prev: undefined
    close: undefined
  }>()

  let content: HTMLElement

  let lastProgress = progress

  $: {
    $direction = progress > lastProgress ? 'right' : 'left'
    lastProgress = progress
  }

  $: {
    progress
    if (content) content.scrollTop = 0
  }

  let card: ProgressCard

  let direction = writable<'right' | 'left'>()

  let footerNextLoading = writable(false)
</script>

<ProgressCard bind:this={card} {steps} bind:progress disabled={cardDisabled}>
  <div slot="header" class="header">
    <div />
    <header class="title">
      {title}
    </header>
    <button class="icon" on:click={() => dispatch('close')}>
      <Icon url={CrossIcon} />
    </button>
  </div>

  <svelte:fragment slot="content">
    <div bind:this={content} class="card content">
      {#key progress}
        <div>
          <slot {progress} />
        </div>
      {/key}
    </div>

    {#if progress === 0}
      <div class="footer intro-footer">
        <Button on:click={() => dispatch('next')}>{$i18n.t('quests:intro-begin-quest')}</Button>
      </div>
    {/if}

    {#if progress > 0}
      <NavigationFooter
        on:next={() => {
          nextOnClick(() => {
            dispatch('next')
          }, footerNextLoading)
        }}
        on:back={backOnClick}
        nextDisabled={footerNextDisabled}
        nextLoading={$footerNextLoading}
        {nextButtonText}
        {backButtonText}
        on:complete
      />
    {/if}
  </svelte:fragment>
</ProgressCard>

<style lang="scss">
  .title {
    font-size: var(--text-xs);
    font-weight: var(--font-weight-bold);
    color: var(--color-background-dark);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid var(--color-light);

    > *:first-child {
      width: 1.5rem;
    }

    > *:last-child {
      width: 1.5rem;
    }
  }

  .card.content {
    border-radius: 0;

    padding: 24px;
  }

  .content {
    box-shadow: none;
    display: grid;
    grid-area: 3 / 1;

    > * {
      grid-area: 1 / 1;
    }

    overflow-y: auto;
    overflow-x: hidden;

    :global(p) > :global(img) {
      max-width: calc(100% + 2 * var(--spacing-2xl));
      margin: 0 calc(-1 * var(--spacing-2xl));
    }

    @include markdownLinkStyles();
    @include markdownBlockquoteStyles();
    @include markdownTextStyles();
  }

  .intro-footer {
    grid-area: 4 / 1;
    display: flex;
    justify-content: center;
    align-items: end;
  }

  .footer {
    padding: var(--spacing-xl) var(--spacing-2xl);
  }
</style>
