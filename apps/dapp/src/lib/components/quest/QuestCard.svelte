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

    :global(a) {
      color: var(--color-primary);
      font-weight: var(--font-weight-bold);
    }

    :global(a:not(.button):not(.skip-icon))::after {
      content: ' ';
      width: 1rem;
      height: 1rem;
      margin-left: 2px;
      transform: translateY(3px);
      display: inline-block;

      mask-size: contain;
      mask-repeat: no-repeat;
      background-color: var(--color-primary);
    }

    :global(a[href^='?glossaryAnchor'])::after {
      mask-image: url('@images/book-open.svg');
    }

    :global(a[href^='https:'])::after {
      mask-image: url('@images/external-link.svg');
    }

    :global(a:hover),
    :global(a:hover::after) {
      filter: brightness(0.8);
    }

    :global(blockquote) {
      margin-left: 0;
      margin-right: 0;
      border-radius: 20px;
      background: var(--Background-Gradient-2, linear-gradient(67deg, #f9dfcf 0%, #e6b2bb 102.4%));
      padding: var(--spacing-lg) var(--spacing-xl);

      :global(p) {
        margin: 0;
      }
    }
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
