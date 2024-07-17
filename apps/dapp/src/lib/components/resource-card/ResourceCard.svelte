<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import SelectionIndicator from '../selection-indicator/SelectionIndicator.svelte'

  export const select = () => (selected = true)
  export const deselect = () => (selected = false)
  export let selectable = true
  export let selected = false
  export let disabled = false

  const dispatch = createEventDispatcher<{ selected: undefined; deselected: undefined }>()
</script>

<div class="resource-card">
  <button
    class:selected
    on:click={() => {
      if (disabled) return
      selected = !selected
      selected ? dispatch('selected') : dispatch('deselected')
    }}
  >
    <slot />

    {#if selectable}
      <SelectionIndicator {selected} />
    {/if}
  </button>

  <div class="text">
    <slot name="text" />
  </div>
</div>

<style lang="scss">
  button {
    position: relative;
    height: 12rem;
    aspect-ratio: 1/1.66;
    border: var(--border) var(--color-light);
    border-radius: var(--border-radius-xl);
    margin: 0 var(--spacing-xl);
    display: flex;
    justify-content: center;
  }

  .resource-card {
    display: flex;
    width: fit-content;
    position: relative;
  }

  .text {
    position: absolute;
    text-align: center;
    opacity: 0.8;
    color: var(--color-light);
    font-size: var(--text-xs);
    bottom: 0;
    height: 2rem;
    transform: translateY(3rem);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
  }
</style>
