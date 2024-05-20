<script lang="ts">
  import { onMount } from 'svelte'

  export let disabled = false
  export let onClick = () => {}

  // Reactive variable to manage rotation state
  let rotated = false

  const _onClick = () => {
    rotated = !rotated
    onClick()
  }

  // Reset rotation when component is mounted
  onMount(() => {
    rotated = false
  })
</script>

<button on:click={_onClick} class:disabled class:rotated class="switch-primary">
  <div>
    <slot />
  </div>
</button>

<style lang="scss">
  button {
    cursor: pointer;
    display: flex;
    white-space: nowrap;
    padding: 0.8rem;
    justify-content: center;
    align-items: center;
    border-radius: var(--border-radius-3xl);
    height: 2.6875rem;
    width: 2.6875rem;
    transition:
      transform 0.3s ease,
      filter 0.2s ease-in-out;
    transform: rotate(0deg);
  }

  .rotated {
    transform: rotate(-180deg);
  }

  .switch-primary {
    background: var(--color-linen);

    &:hover:not(.disabled) {
      filter: brightness(0.8);
    }
  }
</style>
