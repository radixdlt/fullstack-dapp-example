<div class="item">
  <div class="main">
    <slot name="card" />
  </div>

  <div class="text">
    <slot name="text" />
  </div>
</div>

<style lang="scss">
  .item {
    position: relative;
    display: flex;
    justify-content: center;
  }

  .main {
    display: flex;
  }

  .text {
    position: absolute;
    text-align: center;
    opacity: 0.8;
    color: var(--color-light);
    font-size: var(--text-xs);
    bottom: 0;
    height: 2rem;
    transform: translateY(2.5rem);
  }
</style>
