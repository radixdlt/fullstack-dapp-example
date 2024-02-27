<script lang="ts">
  import type { ResultAsync } from 'neverthrow'
  import type { SvelteComponent } from 'svelte'
  import type { LoadedQuest } from 'content'
  import Quest from './Quest.svelte'
  import JettyDialog from '../jetty-dialog/JettyDialog.svelte'
  import Button from '../button/Button.svelte'

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
      onNextClick: (page: number) => ResultAsync<void, string>
    }
  } = {}

  let progress = 0

  let steps = [
    {
      buttonTexts: {
        prev: '',
        next: 'Begin Quest'
      },
      useJetty: false
    },
    ...quest.pages.map((page, i) => ({
      buttonTexts: {
        prev: page.actions?.previous as string,
        next: page.actions?.next as string
      },
      onNextClick: questConfig.events?.onNextClick.bind(null, i),
      useJetty: page.type === 'JettyPage'
    }))
  ]

  const increaseProgress = () => {
    if (progress < steps.length - 1) {
      progress++
    }
  }

  const decreaseProgress = () => {
    if (progress > 0) {
      progress--
    }
  }

  let nonJettyPages = quest.pages.filter((page) => page.type !== 'JettyPage')
</script>

<Quest bind:progress title={quest.title} {steps} let:Intro on:close let:questCardProgress>
  {#if progress === 0}
    <Intro
      title={quest.title}
      description={quest.description}
      minutesToComplete={quest.minutesToComplete}
      rewards={quest.rewards}
      requirements={[]}
    />
  {/if}

  {#each nonJettyPages as page, index}
    {#if questCardProgress === index + 1 && page.type === 'QuestPage'}
      {#each page.content as block}
        {#if block.type === 'html'}
          {@html block.value}
        {:else if block.type === 'component'}
          <!-- Todo: render components by block.name -->
        {/if}
      {/each}
    {/if}
  {/each}

  <div slot="jetty">
    {@const page = quest.pages[progress - 1]}

    {#if page.type === 'JettyPage'}
      <JettyDialog dialogs={page.content.length + 1} let:i>
        {#each page.content as block, j}
          {#if i === j}
            {#if block.type === 'html'}
              {@html block.value}
            {/if}
          {/if}
        {/each}

        {#if i === page.content.length}
          <Button on:click={decreaseProgress}>
            {page.actions?.previous}
          </Button>

          <Button on:click={increaseProgress}>
            {page.actions?.next}
          </Button>
        {/if}
      </JettyDialog>
    {/if}
  </div>
</Quest>
