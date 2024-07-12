<div class="layout">
  <div class="header">
    <slot name="header" />
  </div>

  <div class="content">
    <div class="tabs">
      <slot name="tabs" />
    </div>

    <div class="quests">
      <slot name="quests" />
    </div>
  </div>

  <slot name="footer" />

  <slot />
</div>

<style lang="scss">
  .layout {
    overflow-y: auto;
    display: grid;
    grid-template-rows: auto 1fr;
    min-height: 100dvh;
  }

  .tabs {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header {
    height: 10dvh;
  }

  .quests {
    min-height: 20rem;
    height: calc(80dvh);
    max-height: 39rem;
  }

  .content {
    overflow-x: scroll;
    overflow-y: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 90dvh;

    @include desktop {
      gap: var(--spacing-2xl);
    }
  }

  ::-webkit-scrollbar {
    display: none;
  }
</style>
