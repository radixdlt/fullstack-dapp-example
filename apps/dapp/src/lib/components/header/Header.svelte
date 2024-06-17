<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import RadquestLogo from '@images/radquest-logo.svg'
</script>

<div class="header">
  <img style:--logo={`url(${RadquestLogo})`} alt={$i18n.t('quests:radquest-logo-alt')} />
  <radix-connect-button class="radix-btn" />
</div>

<style lang="scss">
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-lg);
    height: 4rem;
    padding-left: 1.4rem;
    padding-right: 1.4rem;
  }

  img {
    content: var(--logo);
    width: 143px;
    height: 40px;
  }

  .radix-btn {
    z-index: 1;
  }
</style>
