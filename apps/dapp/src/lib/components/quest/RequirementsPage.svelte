<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import Requirement from './Requirement.svelte'

  export let requirements: {
    text: string
    complete: boolean
  }[]
</script>

<div class="requirements-page">
  <div class="text">
    {$i18n.t('quests:requirements')}
  </div>
  {#each requirements as { text, complete }}
    <Requirement {complete}>
      {text}
    </Requirement>
  {/each}
</div>

<style lang="scss">
  .requirements-page {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2xl);
  }

  .text {
    opacity: 0.6;
  }
</style>
