<script>
</script>

<nav>
  <div class="navbar" />
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
    --radix-connect-button-width: 140px;
    --radix-connect-button-border-radius: var(--border-radius-2xl);
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
  }
</style>
