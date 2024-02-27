<script lang="ts">
  import Menu from './Menu.svelte'
  import Actions from './Actions.svelte'
  import ClaimRewards from './ClaimRewards.svelte'
</script>

<div class="speech-bubble">
  <slot {Menu} {Actions} {ClaimRewards} />
</div>

<style lang="scss">
  $background-color: var(--color-background-dark);

  .speech-bubble {
    position: relative;
    width: fit-content;
    min-width: 10rem;
    max-width: 25rem;

    @include mobile {
      max-width: 100%;
    }

    background: $background-color;
    border-radius: var(--border-radius-xl);
    padding: var(--spacing-xl);
    margin-bottom: var(--spacing-2xl);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2xl);
    color: var(--color-light);
    margin-left: 1rem;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 2rem;
      width: 0;
      height: 0;
      border: 2rem solid transparent;
      border-top-color: $background-color;
      border-bottom: 0;
      margin-bottom: -1rem;
    }
  }
</style>
