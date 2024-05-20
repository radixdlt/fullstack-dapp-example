<script lang="ts">
  export let disabled = false
  export let loading = false

  export let variation: 'primary' | 'secondary' = 'primary'
</script>

<button on:click class:disabled class={variation} class:loading>
  <div class:hide-content={loading}>
    <slot />
  </div>
</button>

<style lang="scss">
  button {
    cursor: pointer;
    display: flex;
    white-space: nowrap;
    padding: 0.8rem;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-lg);
    border-radius: var(--border-radius-3xl);
    backdrop-filter: blur(10px);
    font-weight: var(--font-weight-bold);
    font-size: var(--text-xs);
    height: 2.5rem;
    min-width: 7rem;
    width: fit-content;
  }

  .primary {
    background: var(--color-primary);
    color: var(--color-light);
    border: var(--border) var(--color-primary);

    &:hover:not(.disabled) {
      filter: brightness(0.8);
    }

    transition: filter 0.2s ease-in-out;
  }

  .secondary {
    background: transparent;
    color: var(--color-dark);
    border: var(--border) var(--color-dark);

    &:hover:not(.disabled) {
      filter: brightness(0.8);
    }

    transition: filter 0.2s ease-in-out;
  }

  .loading {
    cursor: not-allowed;
    pointer-events: none;

    &::after {
      position: absolute;
      content: '';
      width: 1rem;
      height: 1rem;
      border: 0.2rem solid var(--color-light);
      border-top-color: var(--color-primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
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
