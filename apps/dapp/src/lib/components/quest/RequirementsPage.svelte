<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import Requirements from './Requirements.svelte'

  export let requirements: {
    text: string
    complete: boolean
  }[]
</script>

<div class="requirements-page">
  <div class="text-faded">
    {$i18n.t('quests:requirementsDescription')}
  </div>
  <Requirements {requirements} />
</div>

<style lang="scss">
  .requirements-page {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2xl);
    align-items: center;
  }
</style>
