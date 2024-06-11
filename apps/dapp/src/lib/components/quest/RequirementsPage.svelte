<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import Requirements from './Requirements.svelte'

  export let requirements: {
    text: string
    complete: boolean
  }[]
  export let loading = false
</script>

<div class="requirements-page">
  <div class="text-faded">
    {$i18n.t('quests:requirementsDescription')}
  </div>
  <Requirements {requirements} />

  {#if loading}
    <div class="loading" />
  {/if}
</div>

<style lang="scss">
  .requirements-page {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2xl);
    align-items: center;
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
</style>
