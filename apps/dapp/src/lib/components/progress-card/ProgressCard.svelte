<script lang="ts">
  import ProgressBar from '$lib/components/progress-bar/ProgressBar.svelte'
  import { backOut } from 'svelte/easing'
  import { scale } from 'svelte/transition'

  export let steps: number
  export let progress: number = 0
  export let disabled = false
  export let useAnimation = true

  export const getWidth = () => width
  export const getAnimationDuration = () => animationDuration

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
  transition:scale|local={{ duration: useAnimation ? 300 : 0, easing: backOut }}
  bind:clientWidth={width}
  bind:clientHeight={height}
  class="card progress-card"
  class:card-disabled={disabled}
>
  <slot name="header" {progress} />

  <ProgressBar totalSteps={steps} bind:progress />
  <slot name="content" {animationDuration} {width} {height} {progress} />
</div>

<style lang="scss">
  .progress-card {
    padding: 0;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: auto auto 1fr;
    min-height: 28rem;
    width: 25rem;
    overflow-y: hidden;
  }
</style>
