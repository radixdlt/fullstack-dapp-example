<script lang="ts">
  import Icon from '$lib/components/icon/Icon.svelte'
  import CrossIcon from '@images/cross.svg'
  import Intro from './Intro.svelte'
  import Button from '$lib/components/button/Button.svelte'
  import { fly } from 'svelte/transition'
  import { i18n } from '$lib/i18n'
  import type { ResultAsync } from 'neverthrow'
  import ProgressCard from '../progress-card/ProgressCard.svelte'
  import { createEventDispatcher } from 'svelte'

  export let title: string
  export let steps: {
    buttonTexts: {
      prev: string
      next: string
    }
    onNextClick?: () => ResultAsync<void, string>
  }[]
  export let progress: number

  let nextDisabled: boolean

  const dispatch = createEventDispatcher<{
    next: undefined
    prev: undefined
    close: undefined
  }>()
</script>

<ProgressCard {steps} bind:progress>
  <div slot="header" class="header">
    <button class="icon" on:click={() => dispatch('close')}>
      <Icon url={CrossIcon} />
    </button>
    <header class="title">
      {title}
    </header>
    <div />
  </div>

  <svelte:fragment slot="content" let:animationDuration let:width>
    <div class="content card">
      {#key progress}
        <div transition:fly={{ x: -width * 2, opacity: 1, duration: animationDuration }}>
          <slot {progress} {Intro} />
        </div>
      {/key}
    </div>

    {#if progress === 0}
      <div
        class="footer intro-footer"
        transition:fly={{ x: -width * 2, opacity: 1, duration: animationDuration }}
      >
        <Button on:click={() => dispatch('next')} disabled={nextDisabled}
          >{steps[0].buttonTexts.next}</Button
        >
      </div>
    {/if}

    {#if progress > 0}
      <div
        class="footer-container"
        transition:fly={{ y: 200, opacity: 1, duration: animationDuration }}
      >
        <div class="footer quest-footer">
          <Button secondary on:click={() => dispatch('prev')}
            >{steps[progress].buttonTexts.prev ?? $i18n.t('quest_previousButton')}</Button
          >
          <Button on:click={() => dispatch('next')} disabled={nextDisabled}
            >{steps[progress].buttonTexts.next ?? $i18n.t('quest_nextButton')}</Button
          >
        </div>
      </div>
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
    padding: var(--spacing-xl);
    border-bottom: 1px solid var(--color-light);
  }

  .content {
    box-shadow: none;
    display: grid;
    grid-area: 3 / 1;

    > * {
      grid-area: 1 / 1;
    }

    overflow-y: auto;
  }

  .footer-container {
    grid-area: 4 / 1;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .quest-footer {
    display: flex;
    justify-content: space-between;
    gap: var(--spacing-lg);
    width: 100%;
  }

  .intro-footer {
    grid-area: 4 / 1;
    display: flex;
    justify-content: center;
    align-items: end;
    border-top: 1px solid rgba(0, 0, 0, 0);
  }

  .footer {
    padding: var(--spacing-xl) var(--spacing-2xl);
  }
</style>
