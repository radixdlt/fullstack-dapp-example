<script lang="ts">
  export let url: string
  export let size: 'small' | 'medium' | 'large' | 'xlarge' = 'small'
  export let clickable = false
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element
  this={clickable ? 'button' : 'div'}
  class="icon"
  class:clickable
  on:click|stopPropagation
>
  <img class={size} src={url} alt="icon" />
  {#if $$slots['default']}
    <div class="text">
      <slot />
    </div>
  {/if}
</svelte:element>

<style lang="scss">
  .icon {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }
  img {
    display: block;
  }

  .small {
    width: var(--size, 1.5rem);
    height: var(--size, 1.5rem);
  }
  .medium {
    width: 2rem;
    height: 2rem;
  }

  .large {
    width: 3rem;
    height: 3rem;
  }

  .xlarge {
    width: 4rem;
    height: 4rem;
  }

  .clickable {
    cursor: pointer;
  }
</style>
