<div class="speech-bubble">
  <div style:overflow-y="auto">
    <slot />
  </div>
</div>

<style lang="scss">
  $background-color: var(--color-background-dark);

  .speech-bubble {
    position: relative;
    width: fit-content;
    min-width: 10rem;
    max-width: 25rem;
    max-height: 78vh;

    @include mobile {
      max-width: 100%;
    }

    background: $background-color;
    border-radius: var(--border-radius-3xl);
    padding: var(--spacing-2xl);
    margin-bottom: var(--spacing-2xl);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2xl);
    color: var(--color-light);
    margin-left: 1rem;
    margin-right: 0.5rem;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 1rem;
      width: 0;
      height: 0;
      border: 2rem solid transparent;
      border-top-color: $background-color;
      border-bottom: 0;
      margin-bottom: -1rem;
    }
  }
</style>
