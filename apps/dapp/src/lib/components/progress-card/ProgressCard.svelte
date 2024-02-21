<script lang="ts">
  import ProgressBar from '$lib/components/progress-bar/ProgressBar.svelte'
  import type { ResultAsync } from 'neverthrow'

  export let steps: {
    onNextClick?: (page: number) => ResultAsync<void, string>
  }[]

  export const close = () => {}
  export let progress: number = 0

  let width: number
  let height: number

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

<div
  bind:clientWidth={width}
  bind:clientHeight={height}
  class="card progress-card"
  class:hide-scrollbar={animating}
>
  <slot name="header" {progress} />

  <ProgressBar totalSteps={steps.length} bind:progress />

  <slot name="content" {animationDuration} {width} {height} {progress} />
</div>

<style lang="scss">
  .progress-card {
    padding: 0;
    height: 100%;
    display: grid;
    grid-template-rows: 3rem auto 1fr;
    min-height: 28rem;
    min-width: 20rem;
    overflow-y: hidden;
  }
</style>
