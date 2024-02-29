<script lang="ts">
  import { i18n } from '$lib/i18n'
  import RadquestLogoBig from '@images/radquest-logo-big.svg'
  import RadquestLogoSmall from '@images/radquest-logo-small.svg'
</script>

<div class="header">
  <img
    style:--big-logo={`url(${RadquestLogoBig})`}
    style:--small-logo={`url(${RadquestLogoSmall})`}
    alt={$i18n.t('radquest_logo_alt')}
  />
  <radix-connect-button class="radix-btn" />
</div>

<style lang="scss">
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-lg);
    height: 4rem;
  }

  img {
    content: var(--big-logo);

    @include mobile {
      content: var(--small-logo);
    }
  }

  .radix-btn {
    z-index: 1;
  }
</style>
