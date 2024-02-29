<script>
  import { fade } from 'svelte/transition'

  export let zIndex = 2
  export let duration = 300
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="backdrop fixed" transition:fade={{ duration }} on:click|self style:z-index={zIndex} />

<div class="content fixed" style:z-index={zIndex + 1}>
  <slot />
</div>

<style>
  .fixed {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .backdrop {
    backdrop-filter: blur(1px);
    background: rgba(0, 0, 0, 0.5);
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
