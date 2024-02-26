<script lang="ts">
  import Icon from '../icon/Icon.svelte'
  import ChevronLeft from '@images/chevron-left.svg'
</script>

<div class="header">
  <button class="back-btn" on:click>
    <Icon url={ChevronLeft} />
    <slot />
  </button>
</div>

<style lang="scss">
  .header {
    display: flex;
    align-items: center;
    font-weight: var(--font-weight-bold);
    gap: var(--spacing-md);
  }

  .back-btn {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
  }
</style>
