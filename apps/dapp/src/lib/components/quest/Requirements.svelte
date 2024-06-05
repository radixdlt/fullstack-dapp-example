<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import Requirement from './Requirement.svelte'

  export let requirements: {
    text: string
    complete: boolean
  }[]
</script>

<div class="requirements">
  <div class="requirements-title">{$i18n.t('quests:requirementsTitle')}:</div>
  {#each requirements as { text, complete }}
    <Requirement {complete}>
      {text}
    </Requirement>
  {/each}
</div>

<style lang="scss">
  .requirements {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xl);
    overflow: hidden;

    .requirements-title {
      font-weight: var(--font-weight-bold);
      align-self: center;
    }
  }
</style>
