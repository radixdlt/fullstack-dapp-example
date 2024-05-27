<script lang="ts">
  export let url: string | undefined
  export let size: 'small' | 'medium' | 'large' = 'small'
  export let clickable = false
</script>

<div class="icon" role="button" tabindex="0" on:keydown class:clickable on:click>
  {#if url}
    <img class={size} src={url} alt="icon" />
  {:else}
    <div class={size} />
  {/if}
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

  .clickable {
    cursor: pointer;
  }
</style>
