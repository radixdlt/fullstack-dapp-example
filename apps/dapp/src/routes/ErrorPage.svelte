<script lang="ts">
  import '../global.scss'
</script>

<div class="error-page">
  <div class="centered">
    <img src="/jetty-worried.png" alt="worried jetty" />
    <div class="text">
      <slot />
    </div>
  </div>
</div>

<style lang="scss">
  h1,
  h4 {
    padding: 0;
    margin: 0;
  }
  .error-page {
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100dvh;
    background: var(--gradient-7) no-repeat center fixed;
  }

  .centered {
    position: fixed;
    top: 7.125rem;
    left: 50%;
    transform: translate(-50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-xl);
  }

  .text {
    width: 31.875rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xl);

    @include mobile {
      width: 19.063rem;
      text-align: center;
    }
  }
</style>
