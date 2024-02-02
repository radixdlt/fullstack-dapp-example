<script lang="ts">
  import Icon from '$lib/components/icon/Icon.svelte'
  import CrossIcon from '@images/cross.svg'
  import ProgressBar from './ProgressBar.svelte'
  import Intro from './Intro.svelte'
  import Button from '$lib/components/button/Button.svelte'
  import Header from './Header.svelte'
  import Paragraph from './Paragraph.svelte'
  import { fly } from 'svelte/transition'
  import { i18n } from '$lib/i18n'

  export let title: string
  export let steps: number
  export let nextButtonTexts: string[] = []

  export const setProgress = (_progress: number) => {
    progress = _progress
  }

  type ProgressActions = {
    next: () => void
    prev: () => void
  }

  let progressActions: ProgressActions = {
    next: () => {
      if (progress < steps - 1) progress++
    },
    prev: () => {
      if (progress > 0) progress--
    }
  }

  let progress: number = 0

  let width: number

  const animationDuration = 800

  let animating = false

  let timeout: ReturnType<typeof setTimeout>

  $: {
    progress
    animating = true
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      animating = false
    }, animationDuration)
  }
</script>

<div class="card quest" class:hide-scrollbar={animating} bind:clientWidth={width}>
  <div class="header">
    <div class="icon">
      <Icon url={CrossIcon} />
    </div>
    <header class="title">
      {title}
    </header>
    <div />
  </div>

  <ProgressBar totalSteps={steps} bind:step={progress} />

  <div class="content card">
    {#key progress}
      <div
        class="slot-container"
        transition:fly={{ x: -width * 2, opacity: 1, duration: animationDuration }}
      >
        <slot {progress} {Intro} {Header} {Paragraph} />
      </div>
    {/key}
  </div>

  {#if progress === 0}
    <div
      class="footer intro-footer"
      transition:fly={{ x: -width * 2, opacity: 1, duration: animationDuration }}
    >
      <Button on:click={progressActions.next}
        >{nextButtonTexts[progress] ?? $i18n.t('quest_nextButton')}</Button
      >
    </div>
  {/if}
  {#if progress > 0}
    <div
      class="footer-container"
      transition:fly={{ y: 200, opacity: 1, duration: animationDuration }}
    >
      <div class="footer quest-footer">
        <Button secondary on:click={progressActions.prev}>{$i18n.t('quest_previousButton')}</Button>
        <Button on:click={progressActions.next}
          >{nextButtonTexts[progress] ?? $i18n.t('quest_nextButton')}</Button
        >
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  @mixin mobile {
    @media (max-width: 768px) {
      @content;
    }
  }
  .quest {
    display: grid;
    grid-template-rows: 3rem auto 1fr;
    padding: 0;
    height: 100%;
    min-height: 35rem;
    min-width: 20rem;
    overflow-y: hidden;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-xl);
    border-bottom: 1px solid var(--color-light);
  }

  .title {
    font-size: var(--text-xs);
    font-weight: var(--font-weight-bold);
    color: var(--color-background-dark);
  }

  .content {
    box-shadow: none;
    display: grid;
    grid-area: 3 / 1;

    > * {
      grid-area: 1 / 1;
    }

    @include mobile {
      padding: var(--spacing-xl) var(--spacing-xl);
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
