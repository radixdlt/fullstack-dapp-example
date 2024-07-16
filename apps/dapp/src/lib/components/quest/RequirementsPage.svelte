<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import LoadingSpinner from '../loading-spinner/LoadingSpinner.svelte'
  import Requirements from './Requirements.svelte'

  export let requirements: {
    text: string
    complete: boolean
  }[]
  export let loading = false
</script>

<div class="requirements-page">
  {#if loading}
    <LoadingSpinner />
  {:else}
    <div class="text-faded">
      {$i18n.t('quests:requirementsDescription')}
    </div>
    <Requirements {requirements} />
  {/if}
</div>

<style lang="scss">
  .requirements-page {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2xl);
    align-items: center;
  }
</style>
