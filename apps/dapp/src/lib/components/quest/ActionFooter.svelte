<script lang="ts">
  import Button from '../button/Button.svelte'
  import { fly } from 'svelte/transition'

  export let text: string
  export let cardWidth: number
  export let animationDuration: number
</script>

<div
  class="footer-container"
  transition:fly|global={{ x: -cardWidth * 2, opacity: 1, duration: animationDuration }}
>
  <div class="footer">
    <Button on:click>{text}</Button>
  </div>
</div>

<style>
  .footer {
    padding: var(--spacing-xl) var(--spacing-2xl);
  }

  .footer-container {
    grid-area: 4 / 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
