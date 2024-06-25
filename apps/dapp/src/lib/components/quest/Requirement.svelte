<script lang="ts">
  import WhiteCheckmarkIcon from '@images/white-checkmark.svg'

  export let complete = false
</script>

<div class="requirement">
  <div class="circle-with-border" class:complete>
    {#if complete}
      <img src={WhiteCheckmarkIcon} alt="Complete" />
    {/if}
  </div>

  <div class="text" class:complete>
    <slot />
  </div>
</div>

<style lang="scss">
  .requirement {
    display: flex;
    align-items: center;
    gap: var(--spacing-lg);
  }

  .circle-with-border {
    width: 1.5rem;
    height: 1.5rem;
    min-width: 1.5rem;
    min-height: 1.5rem;
    border: var(--border) var(--color-dark);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    &.complete {
      background: var(--color-primary);
      border: var(--border) var(--color-primary);
    }
  }

  .text {
    &.complete {
      text-decoration: line-through;
    }
  }
</style>
