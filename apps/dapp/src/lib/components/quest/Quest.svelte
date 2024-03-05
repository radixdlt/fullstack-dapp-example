<script lang="ts">
  import QuestCard from './QuestCard.svelte'

  export let title: string
  export let steps: {
    buttonTexts: {
      prev: string
      next: string
    }
    useJetty?: boolean
  }[]
  export let progress: number
  export let nextDisabled: boolean = false

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
  {nextDisabled}
  let:Intro
  let:progress
  on:close
  on:next
  on:prev
>
  <slot {Intro} questCardProgress={progress} />
</QuestCard>

{#each steps as step, i}
  {#if step.useJetty && progress === i}
    <slot name="jetty" {i} {progress} />
  {/if}
{/each}
