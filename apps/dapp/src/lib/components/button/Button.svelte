<script lang="ts">
  import ExternalLink from '../externalLink/ExternalLink.svelte'

  export let disabled = false
  export let loading = false
  export let secondary = false // corresponds to the light theme unless overridden
  export let theme: 'primary' | 'secondary' | 'light' | 'dark' = secondary ? 'light' : 'primary'
  export let link: string | undefined = undefined
  export let isExternal: boolean = false
</script>

{#if link}
  <a
    href={link}
    class={theme}
    class:disabled
    class:loading
    target={isExternal ? '_blank' : ''}
    data-sveltekit-preload-data
    on:click
  >
    <div class:hide-content={loading} class="link-content">
      <slot />
      {#if isExternal}
        <ExternalLink --fill="white" />
      {/if}
    </div>
  </a>
{:else}
  <button on:click class={theme} class:disabled class:loading>
    <div class:hide-content={loading}>
      <slot />
    </div>
  </button>
{/if}

<style lang="scss">
  .link-content {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }
  a,
  button {
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
    min-width: var(--min-width, 7rem);
    width: fit-content;
    -webkit-tap-highlight-color: transparent;
    @include desktop {
      @media (hover: hover) {
        &:hover:not(.disabled) {
          filter: brightness(0.8);
        }
      }
    }
    @include smallMobile {
      min-width: 6rem;
      padding: 0.5rem 1rem;
      height: 2.5rem;
    }
    transition: filter 0.2s ease-in-out;
  }

  .primary {
    background: var(--color-primary);
    color: var(--color-light);
    border: var(--border) var(--color-primary);
  }

  .secondary {
    background: var(--color-secondary);
    color: var(--color-dark);
    border: var(--border) var(--color-secondary);
  }

  .light {
    background: var(--color-background-light);
    color: var(--color-dark);
    border: var(--border) var(--color-dark);
  }

  .dark {
    background: var(--color-background-dark);
    color: var(--color-light);
    border: var(--border) var(--color-light);
  }

  .loading {
    cursor: not-allowed;
    pointer-events: none;

    &::after {
      position: absolute;
      content: '';
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }

  .loading.primary::after {
    border: 0.2rem solid var(--color-light-translucent);
    border-top-color: var(--color-light);
  }

  .loading.secondary::after {
    border: 0.2rem solid var(--color-dark-translucent);
    border-top-color: var(--color-dark);
  }

  .loading.light::after {
    border: 0.2rem solid var(--color-dark-translucent);
    border-top-color: var(--color-dark);
  }

  .loading.dark::after {
    border: 0.2rem solid var(--color-light-translucent);
    border-top-color: var(--color-light);
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .hide-content {
    visibility: hidden;
  }
</style>
