<script>
  import { i18n } from '$lib/i18n/i18n'
</script>

<nav>
  <div class="navbar"></div>
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
    position: absolute;

    @include desktop {
      padding: 2rem 4rem;
    }
  }

  p {
    color: var(--color-dark);
  }

  .connect-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    --radix-connect-button-width: 130px;
    --radix-connect-button-height: 40px;
    --radix-connect-button-background: var(--color-radix-grey1);

    @include desktop {
      --radix-connect-button-border-radius: var(--border-radius-2xl);
      --radix-connect-button-width: 140px;
    }
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
  }
</style>
