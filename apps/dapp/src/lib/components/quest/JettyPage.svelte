<script lang="ts">
  import { fly } from 'svelte/transition'

  export let animate: boolean

  let jettyHeight: number
</script>

<div class="jetty-page">
  <div class="z-index-box">
    <slot />
  </div>
  <div
    in:fly|global={{
      y: 100,
      delay: animate ? 500 : 0,
      opacity: 1,
      duration: animate ? 500 : 0
    }}
    class="jetty-image"
    bind:clientHeight={jettyHeight}
    style:--height={`-${jettyHeight - 5}px`}
  >
    <enhanced:img src="@images/jetty-excited.webp?enhanced" />
  </div>
</div>

<style lang="scss">
  .jetty-page,
  .z-index-box {
    min-height: 10rem;
    border-radius: var(--border-radius-2xl);
    background: var(--color-background-dark);
  }

  .jetty-page {
    position: relative;
    color: var(--color-light);
    margin-top: var(--spacing-3xl);
    margin-left: calc(-1 * var(--spacing-lg));
    margin-right: calc(-1 * var(--spacing-lg));
    z-index: 2;
  }

  .z-index-box {
    width: 100%;
    height: 100%;
    z-index: 1;
    padding: 24px;
  }

  .jetty-image {
    position: absolute;
    top: var(--height);
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;

    :global(img) {
      height: 5rem;
      width: 5rem;
    }
  }
</style>
