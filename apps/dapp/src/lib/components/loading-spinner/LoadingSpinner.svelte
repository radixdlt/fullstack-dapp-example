<script lang="ts">
  export let dark = false
</script>

<div class="loading-spinner" class:dark />

<style>
  .loading-spinner {
    width: 1.5rem;
    height: 1.5rem;
    border: 0.2rem solid var(--color-primary-translucent);
    border-top-color: var(--color-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .dark {
    border-color: var(--color-light-translucent);
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
</style>
