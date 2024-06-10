<script>
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

  .connect-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    --radix-connect-button-width: 130px;
    --radix-connect-button-height: 40px;

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
