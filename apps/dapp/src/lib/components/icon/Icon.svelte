<script lang="ts">
  export let url: string
  export let size: 'small' | 'medium' | 'large' = 'small'
</script>

<div class="icon">
  <img class={size} src={url} alt="icon" />
  {#if $$slots['default']}
    <div class="text">
      <slot />
    </div>
  {/if}
</div>

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
    width: 1.5rem;
    height: 1.5rem;
  }
  .medium {
    width: 2rem;
    height: 2rem;
  }

  .large {
    width: 3rem;
    height: 3rem;
  }
</style>
