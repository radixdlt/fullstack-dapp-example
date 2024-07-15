<script>
  import { fade } from 'svelte/transition'

  export let zIndex = 2
  export let duration = 300
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="backdrop fixed"
  transition:fade|local={{ duration }}
  on:click|self
  style:z-index={zIndex}
/>

<div class="content fixed" style:z-index={zIndex + 1}>
  <slot />
</div>

<style lang="scss">
  .fixed {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .backdrop {
    backdrop-filter: blur(2px);
    opacity: 0.9;
    background: var(--gradient-3);
  }

  .content {
    height: fit-content;
    width: fit-content;
    margin: auto;

    @include mobile {
      transform: translateY(-16px);
    }
  }
</style>
