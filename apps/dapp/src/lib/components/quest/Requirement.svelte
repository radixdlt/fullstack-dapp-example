<script lang="ts">
  import WhiteCheckmarkIcon from '@images/white-checkmark.svg'
  import EmptyRequirement from '@images/empty-requirement.svg'

  export let complete = false
</script>

<div class="requirement">
  <div class="circle-with-border" class:complete>
    {#if complete}
      <img src={WhiteCheckmarkIcon} alt="Complete" />
    {:else}
      <img src={EmptyRequirement} alt="" />
    {/if}
  </div>

  <div class="text" class:complete>
    <slot />
  </div>
</div>

<style lang="scss">
  .requirement {
    display: flex;
    gap: var(--spacing-lg);
  }

  .circle-with-border {
    margin-top: 5px;
    &.complete {
      background: var(--color-primary);
      border: var(--border) var(--color-primary);
      width: 1.3rem;
      height: 1.3rem;
      min-width: 1.3rem;
      min-height: 1.3rem;

      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .text {
    color: var(--color-nearly-black);
    &.complete {
      text-decoration: line-through;
    }
  }
</style>
