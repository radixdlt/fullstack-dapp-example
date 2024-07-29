<script lang="ts">
  import ProgressBar from '$lib/components/progress-bar/ProgressBar.svelte'
  import { backOut } from 'svelte/easing'
  import { scale } from 'svelte/transition'

  export let steps: number
  export let progress: number = 0
  export let disabled = false
  export let useAnimation = true

  export const getWidth = () => width

  let width: number
  let height: number
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
  <slot name="content" {width} {height} {progress} />
</div>

<style lang="scss">
  .progress-card {
    padding: 0;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: auto auto 1fr;
    min-height: 28rem;
    max-width: 25rem;
    overflow-y: hidden;
  }
</style>
