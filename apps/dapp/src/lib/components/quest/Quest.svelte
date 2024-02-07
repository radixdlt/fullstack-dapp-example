<script lang="ts">
  import Icon from '$lib/components/icon/Icon.svelte'
  import CrossIcon from '@images/cross.svg'
  import ProgressBar from './ProgressBar.svelte'
  import Intro from './Intro.svelte'
  import Button from '$lib/components/button/Button.svelte'
  import { fly } from 'svelte/transition'
  import { i18n } from '$lib/i18n'
  import type { QuestDefinition } from 'virtual:quests'
  import type { ResultAsync } from 'neverthrow'
  import { createEventDispatcher, type SvelteComponent } from 'svelte'

  export let quest: QuestDefinition
  export let questConfig: {
    placeholders?: Record<
      string,
      {
        component: new (...args: any[]) => SvelteComponent
        props: Record<string, unknown>
      }
    >
    events?: {
      onNextClick: (page: number) => ResultAsync<void, Error>
    }
  } = {}

  $: {
    setProgress(0)
    quest
  }

  const dispatch = createEventDispatcher()

  export const setProgress = (_progress: number) => {
    progress = _progress
  }

  type ProgressActions = {
    next: () => void
    prev: () => void
  }

  let progressActions: ProgressActions = {
    next: () => {
      if (progress < quest.pages.length) {
        if (questConfig?.events?.onNextClick) {
          nextDisabled = true
          questConfig.events.onNextClick(progress).map(() => {
            progress++
            nextDisabled = false
          })
        } else {
          progress++
        }
      }
    },
    prev: () => {
      if (progress > 0) progress--
    }
  }

  let progress: number = 0

  let width: number

  const animationDuration = 800

  let animating = false
  let nextDisabled = false

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
    <button class="icon" on:click={() => dispatch('closeClick')}>
      <Icon url={CrossIcon} />
    </button>
    <header class="title">
      {quest.title}
    </header>
    <div />
  </div>

  <ProgressBar totalSteps={quest.pages.length} bind:step={progress} />

  {#if progress === 0}
    <div class="content card">
      <div
        class="slot-container"
        transition:fly={{ x: -width * 2, opacity: 1, duration: animationDuration }}
      >
        <Intro
          title={quest.title}
          description={quest.description}
          minutesToComplete={quest.minutesToComplete}
          rewards={quest.rewards}
        ></Intro>
      </div>
      <div
        class="footer intro-footer"
        transition:fly={{ x: -width * 2, opacity: 1, duration: animationDuration }}
      >
        <Button on:click={progressActions.next} disabled={nextDisabled}
          >{$i18n.t('quest_nextButton')}</Button
        >
      </div>
    </div>
  {/if}

  {#each quest.pages as page, index}
    {#if progress === index + 1}
      <div class="content card">
        <div
          class="slot-container"
          transition:fly={{ x: -width * 2, opacity: 1, duration: animationDuration }}
        >
          <div class="key-image">
            <img src={quest.keyImage} alt={$i18n.t('quest_keyImageAlt')} />
          </div>
          {#each page.content as block}
            {#if block.type === 'html'}
              {@html block.html}
            {:else if block.type === 'placeholder'}
              {@const fill = questConfig?.placeholders?.[block.id]}
              {#if fill}
                <svelte:component this={fill.component} {...fill.props}></svelte:component>
              {:else}
                <h2>{$i18n.t('quest_placeholderNotFound', { id: block.id })}</h2>
              {/if}
            {/if}
          {/each}
        </div>
      </div>
      <div
        class="footer-container"
        transition:fly={{ x: -width * 2, opacity: 1, duration: animationDuration }}
      >
        <div class="footer quest-footer">
          <Button secondary on:click={progressActions.prev}
            >{page?.actions?.prev || $i18n.t('quest_previousButton')}</Button
          >
          <Button on:click={progressActions.next}
            >{page?.actions?.next || $i18n.t('quest_nextButton')}</Button
          >
        </div>
      </div>
    {/if}
  {/each}
</div>

<style lang="scss">
  @mixin mobile {
    @media (max-width: 768px) {
      @content;
    }
  }

  .key-image {
    text-align: center;

    img {
      height: 10rem;
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
