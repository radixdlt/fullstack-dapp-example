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
    position: relative;
  }

  .tabs {
    display: flex;
    justify-content: center;
    align-items: center;
    @include smallMobile {
      transform: translateY(calc(var(--spacing-xl) / 3));
    }
  }

  .header {
    height: 10dvh;
    @include smallMobile {
      height: 10dvh;
      position: absolute;
      margin-left: auto;
      width: 100%;
    }
  }

  .quests {
    min-height: 20rem;
    height: 80dvh;
    max-height: 39rem;
    @include smallMobile {
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
    @include smallMobile {
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
