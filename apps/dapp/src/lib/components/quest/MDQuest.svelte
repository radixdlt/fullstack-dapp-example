<script lang="ts">
  import type { ResultAsync } from 'neverthrow'
  import type { SvelteComponent } from 'svelte'
  import type { LoadedQuest } from 'content'
  import Quest from './Quest.svelte'

  export let quest: LoadedQuest

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
    prev: page.actions?.previous as string,
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
      {#each page.content as block}
        {#if block.type === 'html'}
          {@html block.value}
        {:else if block.type === 'component'}
          <!-- Todo: render components by block.name -->
        {/if}
      {/each}
    {/if}
  {/each}
</Quest>
