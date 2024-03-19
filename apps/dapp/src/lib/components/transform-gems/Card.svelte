<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export const select = () => (selected = true)
  export const deselect = () => (selected = false)
  export let selectable = true
  export let selected = false

  const dispatch = createEventDispatcher<{ selected: undefined; deselected: undefined }>()

  let height: number
</script>

<button
  on:click={() => {
    if (!selectable) return
    selected = !selected
    selected ? dispatch('selected') : dispatch('deselected')
  }}
  bind:clientHeight={height}
  style:width={`${height * 0.6}px`}
>
  <slot />
</button>

<style lang="scss">
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 70%;
    border-radius: var(--border-radius-3xl);
    margin: 0 1.5rem;
  }
</style>
