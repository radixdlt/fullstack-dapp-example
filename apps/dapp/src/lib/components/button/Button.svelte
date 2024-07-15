<script lang="ts">
  import LoadingSpinner from '../loading-spinner/LoadingSpinner.svelte'
  import ExternalLink from '../externalLink/ExternalLink.svelte'

  export let disabled = false
  export let secondary = false
  export let loading = false
  export let link: string | undefined = undefined
  export let isExternal: boolean = false
</script>

{#if link}
  <a
    href={link}
    class="button"
    class:disabled
    class:primary={!secondary}
    class:secondary
    class:loading
    target={isExternal ? '_blank' : ''}
    data-sveltekit-preload-data
  >
    {#if loading}
      <LoadingSpinner />
    {:else}
      <slot />
      {#if isExternal}
        <ExternalLink --fill="white" />
      {/if}
    {/if}
  </a>
{:else}
  <button
    on:click
    class="button"
    class:disabled
    class:primary={!secondary}
    class:secondary
    class:loading
  >
    {#if loading}
      <LoadingSpinner />
    {:else}
      <slot />
    {/if}
  </button>
{/if}

<style lang="scss">
  .button {
    cursor: pointer;
    display: flex;
    white-space: nowrap;
    padding: 0.7rem 1.5rem;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-lg);
    border-radius: var(--border-radius-3xl);
    backdrop-filter: blur(10px);
    font-weight: var(--font-weight-bold);
    font-size: var(--text-xs);
    height: 2.7rem;
    min-width: 7rem;
    width: fit-content;
  }

  .button > * {
    width: fit-content;
  }

  .primary {
    background: var(--color-primary);
    color: var(--color-light);
    border: var(--border) var(--color-primary);

    &:hover:not(.disabled) {
      @media (hover: hover) {
        filter: brightness(0.8);
      }
    }

    transition: filter 0.2s ease-in-out;
  }

  .loading {
    cursor: not-allowed;
    pointer-events: none;
  }

  .secondary {
    background: var(--color-light);
    color: var(--color-dark);
    border: var(--border) var(--color-dark);

    &:hover:not(.disabled) {
      @media (hover: hover) {
        color: var(--color-light);
        background: var(--color-dark);
      }
    }

    transition:
      color 0.2s ease-in-out,
      background 0.2s ease-in-out;
  }
</style>
