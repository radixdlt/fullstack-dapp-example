<script>
  import { i18n } from '$lib/i18n/i18n'
</script>

<nav>
  <div class="navbar">
    <p class="text-bold">{$i18n.t('main:title')}</p>
  </div>
  <div class="connect-btn">
    <radix-connect-button />
  </div>
</nav>

<style lang="scss">
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    width: 100vw;
    padding: 1rem;
  }
  @include desktop {
    nav {
      position: absolute;
      padding: 1rem 4rem;
    }
  }

  .connect-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    --radix-connect-buttonx-width: 132px;
    --radix-connect-button-height: 40px;
    --radix-connect-button-border-radius: var(--border-radius-2xl);
    --radix-connect-button-background: var(--color-radix-grey1);
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
  }
</style>
