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
</div>

<style lang="scss">
  .layout {
    overflow-y: auto;
    display: grid;
    grid-template-rows: auto 1fr;
    min-height: 100dvh;
    background: var(--gradient-3) no-repeat center fixed;
  }

  .tabs {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: var(--spacing-lg) 0;
  }

  .quests {
    height: 39rem;
    min-height: 20rem;
  }

  .content {
    overflow-x: scroll;
    overflow-y: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @include desktop {
      gap: var(--spacing-2xl);
    }
  }

  ::-webkit-scrollbar {
    display: none;
  }
</style>
