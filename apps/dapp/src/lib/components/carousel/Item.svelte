<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let i: number = NaN

  let item: HTMLElement
  let disabled = false

  const dispatch = createEventDispatcher()
  const onClick = () => {
    if (disabled) return
    dispatch('click', { index: i })
  }
</script>

<div
  class="item"
  class:disabled
  bind:this={item}
  on:click={onClick}
  on:keypress={(e) => e.key === 'Enter' && onClick()}
  role="menuitem"
  tabindex="0"
>
  <slot />
</div>

<style>
  .item {
    height: 100%;
    display: flex;
    align-items: center;
    scroll-snap-align: center;
    transition: opacity 0.3s;
  }

  .disabled {
    pointer-events: none;
    opacity: 0.5;
  }
</style>
