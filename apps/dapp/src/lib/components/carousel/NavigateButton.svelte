<script lang="ts">
  import { fade } from 'svelte/transition'

  export let direction: 'left' | 'right'

  $: left = direction === 'left'

  let button: HTMLElement
</script>

<button
  on:click
  bind:this={button}
  class="navigate-button"
  class:left
  transition:fade={{ duration: 200 }}
/>

<style lang="scss">
  .navigate-button {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    background-color: var(--color-dark);
    opacity: 0.4;

    &:hover {
      opacity: 0.7;
    }

    transition: opacity 0.2s ease-in-out;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      width: 0.6rem;
      height: 0.6rem;
      border-top: 0.2rem solid var(--color-light);
      border-right: 0.2rem solid var(--color-light);
    }
  }

  .left {
    transform: rotate(180deg);
  }
</style>
