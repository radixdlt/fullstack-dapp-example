<div class="layout">
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
    position: relative;
  }

  .tabs {
    display: flex;
    justify-content: center;
    align-items: center;
    @include shortMobile {
      transform: translateY(var(--spacing-xs));
    }
  }

  .quests {
    min-height: 20rem;
    height: 80dvh;
    max-height: 39rem;
    @include shortMobile {
      height: 90dvh;
    }
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
    @include shortMobile {
      height: 100dvh;
    }
    @include desktop {
      gap: var(--spacing-2xl);
    }
  }

  ::-webkit-scrollbar {
    display: none;
  }
</style>
