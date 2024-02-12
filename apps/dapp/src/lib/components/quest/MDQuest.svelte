<script lang="ts">
  import type { QuestDefinition } from 'virtual:quests'
  import type { ResultAsync } from 'neverthrow'
  import type { SvelteComponent } from 'svelte'
  import { i18n } from '$lib/i18n'
  import Quest from './Quest.svelte'

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
    quest
    if (questComponent) questComponent.setProgress(0)
  }

  let buttonTexts = quest.pages.map((page) => ({
    prev: page.actions?.prev as string,
    next: page.actions?.next as string
  }))

  let questComponent: Quest
</script>

<Quest
  title={quest.title}
  steps={quest.pages.length + 1}
  {buttonTexts}
  onNextClick={questConfig.events?.onNextClick}
  bind:this={questComponent}
  let:Intro
  let:progress
  on:close
>
  {#if progress === 0}
    <Intro
      title={quest.title}
      description={quest.description}
      minutesToComplete={quest.minutesToComplete}
      rewards={quest.rewards}
    />
  {/if}

  {#each quest.pages as page, index}
    {#if progress === index + 1}
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
    {/if}
  {/each}
</Quest>

<style lang="scss">
  .key-image {
    text-align: center;

    img {
      height: 10rem;
    }
  }
</style>
