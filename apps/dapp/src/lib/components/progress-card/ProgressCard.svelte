<script lang="ts">
  import ProgressBar from '$lib/components/progress-bar/ProgressBar.svelte'
  import type { ResultAsync } from 'neverthrow'

  type ProgressActions = {
    next: () => void
    prev: () => void
  }

  export let steps: number
  export let onNextClick: ((page: number) => ResultAsync<void, Error>) | undefined = undefined
  export const close = () => {}
  export let nextDisabled: boolean = false
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

  export const progressActions: ProgressActions = {
    next: () => {
      if (progress < steps - 1) {
        if (onNextClick) {
          nextDisabled = true
          onNextClick(progress).map(() => {
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
</script>

<div
  bind:clientWidth={width}
  bind:clientHeight={height}
  class="card progress-card"
  class:hide-scrollbar={animating}
>
  <slot name="header" {progress} />

  <ProgressBar totalSteps={steps} bind:progress />

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
