<div class="loading-spinner" />

<style>
  .loading-spinner {
    width: 1.5rem;
    height: 1.5rem;
    border: 0.2rem solid var(--color-light);
    border-top-color: var(--color-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
