<script lang="ts">
  import { createEventDispatcher, onMount, type SvelteComponent, setContext } from 'svelte'
  import type { LoadedQuest } from 'content'
  import Quest from './Quest.svelte'
  import JettyDialog from '../jetty-dialog/JettyDialog.svelte'
  import Button from '../button/Button.svelte'
  import { questApi } from '../../../routes/api/(protected)/quest/quest-api'
  import BlockRenderer from './BlockRenderer.svelte'
  import { writable } from 'svelte/store'

  export let quest: LoadedQuest
  export let components: Record<
    string,
    { component: new (...args: any[]) => SvelteComponent; properties?: Record<string, unknown> }
  > = {}

  const navigationDirection = writable<'next' | 'prev'>('next')
  setContext('navigationDirection', navigationDirection)
  const dispatch = createEventDispatcher()

  let requirements: Record<string, boolean> = {}

  let progress = 0

  let steps = [
    {
      buttonTexts: {
        prev: '',
        next: 'Begin Quest'
      },
      useJetty: false
    },
    ...quest.pages.map((page) => ({
      buttonTexts: {
        prev: page.actions?.previous as string,
        next: page.actions?.next as string
      },
      useJetty: page.type === 'JettyPage'
    }))
  ]

  const increaseProgress = () => {
    if (progress < steps.length - 1) {
      navigationDirection.set('next')
      progress++
      questApi.updateQuestProgress(quest.id, progress)
    } else {
      dispatch('close')
    }
  }

  const decreaseProgress = () => {
    if (progress > 0) {
      navigationDirection.set('prev')
      progress--
      questApi.updateQuestProgress(quest.id, progress)
    }
  }

  onMount(() => {
    getQuestRequirementsStatus()
  })

  const getQuestRequirementsStatus = () => {
    questApi.getQuestInformation(quest.id).map((data) => {
      requirements = data.requirements
    })
  }

  let nonJettyPages = quest.pages.filter((page) => page.type !== 'JettyPage')
</script>

<Quest
  bind:progress
  title={quest.title}
  {steps}
  let:Intro
  on:close
  let:questCardProgress
  on:next={() => {
    increaseProgress()
  }}
  on:prev={() => {
    decreaseProgress()
  }}
>
  {#if progress === 0}
    <Intro
      title={quest.title}
      description={quest.description}
      minutesToComplete={quest.minutesToComplete}
      rewards={quest.rewards}
      requirements={Object.entries(quest.requirementTexts || []).map(([key, value]) => {
        return { text: value, complete: requirements[key] }
      })}
    />
  {/if}

  {#each nonJettyPages as page, index}
    {#if questCardProgress === index + 1 && page.type === 'QuestPage'}
      {#each page.content as block}
        <BlockRenderer
          {block}
          {requirements}
          {components}
          on:next={() => increaseProgress()}
          on:prev={() => decreaseProgress()}
        />
      {/each}
    {/if}
  {/each}

  <div slot="jetty">
    {@const page = quest.pages[progress - 1]}

    {#if page.type === 'JettyPage'}
      <JettyDialog dialogs={page.content.length + (page.actions ? 1 : 0)} let:i>
        {#each page.content as block, j}
          {#if i === j}
            <BlockRenderer
              {block}
              {components}
              on:next={() => increaseProgress()}
              on:prev={() => decreaseProgress()}
            />
          {/if}
        {/each}

        {#if i === page.content.length && page.actions}
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
