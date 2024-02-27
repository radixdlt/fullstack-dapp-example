<script lang="ts">
  import type { ResultAsync } from 'neverthrow'
  import QuestCard from './QuestCard.svelte'

  type ProgressActions = {
    next: () => void
    prev: () => void
  }

  export let title: string
  export let steps: {
    buttonTexts: {
      prev: string
      next: string
    }
    onNextClick?: () => ResultAsync<void, string>
    useJetty?: boolean
  }[]
  export let progress: number
  export let nextDisabled: boolean = false

  export const progressActions: ProgressActions = {
    next: () => {
      if (progress < steps.length - 1) {
        const { onNextClick } = steps[progress]
        if (onNextClick) {
          nextDisabled = true
          onNextClick().map(() => {
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

  let questCardProgress = 0

  let nonJettySteps = steps.filter((step) => !step.useJetty)

  $: {
    let slice = steps.slice(0, progress + 1)
    let recentNonJettyStep = slice.findLastIndex((step) => !step.useJetty)

    questCardProgress =
      recentNonJettyStep === -1 ? 0 : slice.filter((step) => !step.useJetty).length - 1
  }
</script>

<QuestCard
  bind:progress={questCardProgress}
  {title}
  steps={nonJettySteps}
  let:Intro
  let:progress
  on:next={progressActions.next}
  on:prev={progressActions.prev}
  on:close
>
  <slot {Intro} questCardProgress={progress} />
</QuestCard>

{#each steps as step, i}
  {#if step.useJetty && progress === i}
    <slot name="jetty" {i} {progress} />
  {/if}
{/each}
