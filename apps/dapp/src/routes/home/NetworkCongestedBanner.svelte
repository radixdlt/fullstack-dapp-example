<script>
  import Button from '$lib/components/button/Button.svelte'
  import ErrorPopup from '$lib/components/error-popup/ErrorPopup.svelte'
  import LinkWithLinkIcon from '$lib/components/footer/linkWithLinkIcon.svelte'
  import { i18n } from '$lib/i18n/i18n'

  let show = true
</script>

{#if show}
  <div class="error-congestion-banner">
    <ErrorPopup
      title={$i18n.t('main:errorPopup.NetworkCongestion.title')}
      on:close={() => (show = false)}
    >
      <div>{$i18n.t('main:errorPopup.NetworkCongestion.content')}</div>

      <div class="link">
        <LinkWithLinkIcon href="https://x.com/radixdlt"
          >{$i18n.t('main:errorPopup.NetworkCongestion.link')}</LinkWithLinkIcon
        >
      </div>

      <div class="button">
        <Button on:click={() => (show = false)} secondary
          >{$i18n.t('main:errorPopup.NetworkCongestion.button')}</Button
        >
      </div>
    </ErrorPopup>
  </div>
{/if}

<style lang="scss">
  .error-congestion-banner {
    :global(.title) {
      color: red;
    }

    :global(.error-popup) {
      border: var(--border) red;
    }

    :global(.error-popup-content > img) {
      filter: invert(20%) sepia(60%) saturate(7032%) hue-rotate(355deg) brightness(105%)
        contrast(123%);
    }
  }

  .link {
    margin-top: var(--spacing-xl);
  }

  .button {
    margin-top: var(--spacing-xl);
  }
</style>
