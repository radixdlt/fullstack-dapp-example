<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import SelectionIndicator from '../selection-indicator/SelectionIndicator.svelte'

  export const select = () => (selected = true)
  export const deselect = () => (selected = false)
  export let selectable = true
  export let selected = false
  export let disabled = false
  export let goldBorder = false

  const dispatch = createEventDispatcher<{ selected: undefined; deselected: undefined }>()
</script>

<div class="resource-card">
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <svelte:element
    this={selectable ? 'button' : 'div'}
    class:selected
    class="main-card"
    class:gold-border={goldBorder}
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
  </svelte:element>

  <div class="text">
    <slot name="text" />
  </div>
</div>

<style lang="scss">
  .main-card {
    position: relative;
    margin: 0 var(--spacing-lg);
    display: flex;
    justify-content: center;
    border: var(--border-xl) var(--color-light);
    border-radius: var(--border-radius-xl);
  }

  .gold-border {
    background:
      linear-gradient(var(--color-dark), var(--color-dark)) padding-box,
      linear-gradient(#ae8625, #f7ef8a, #d2ac47, #edc967) border-box;
    border: var(--border-xl) transparent;
  }

  .selected {
    border-color: var(--color-primary);
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
    height: 3rem;
    transform: translateY(3.5rem);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
  }
</style>
