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

    margin-left: 0;
    margin-right: 0;
    border-radius: 20px;
    background: linear-gradient(
      67deg,
      rgba(249, 223, 207, 0.5) 0%,
      rgba(230, 178, 187, 0.5) 102.4%
    );
    padding: 1rem var(--spacing-xl);

    .requirements-title {
      color: var(--color-nearly-black);
      font-weight: var(--font-weight-bold);
      align-self: center;
    }
  }
</style>
