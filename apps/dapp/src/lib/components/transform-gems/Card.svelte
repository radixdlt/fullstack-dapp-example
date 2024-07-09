<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import SelectedIcon from '@images/selected.svg'

  export const select = () => (selected = true)
  export const deselect = () => (selected = false)
  export let selectable = true
  export let selected = false

  const dispatch = createEventDispatcher<{ selected: undefined; deselected: undefined }>()

  let height: number
</script>

<button
  class:selected
  on:click={() => {
    if (!selectable) return
    selected = !selected
    selected ? dispatch('selected') : dispatch('deselected')
  }}
  bind:clientHeight={height}
  style:width={`${height * 0.6}px`}
>
  <slot />

  <div
    class="selection-ring ring"
    class:selected
    style:--background={selected ? `url(${SelectedIcon})` : 'var(--color-dark)'}
  />
</button>

<style lang="scss">
  button {
    position: relative;
    height: 13rem;
    border: var(--border) var(--color-light);
    border-radius: var(--border-radius-xl);
    margin: 0 var(--spacing-xl);
  }

  .ring {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
  }

  .selection-ring {
    border: var(--border-lg) var(--color-light);
    border-radius: 50%;
    background: var(--background) no-repeat center;
  }

  .selected {
    border: var(--border) var(--color-primary);
  }
</style>
