<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
</script>

<div class="header">
  <div></div>
  <radix-connect-button class="radix-btn" />
</div>

<style lang="scss">
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-lg);
    height: 4rem;
    padding: 0 1.4rem;
    @include shortMobile {
      height: 3rem;
      padding: 0 1rem;
    }
  }

  .logo {
    width: 143px;
    height: 40px;
    @include shortMobile {
      display: none;
    }
  }

  .icon {
    width: 40px;
    height: 40px;
    display: none;
    @include shortMobile {
      display: block;
    }
  }

  .radix-btn {
    --radix-connect-button-border-radius: 20px;
    z-index: 2;
    @include shortMobile {
      --radix-connect-button-width: 4rem;
      --radix-connect-button-border-radius: var(--spacing-md);
    }
  }
</style>
