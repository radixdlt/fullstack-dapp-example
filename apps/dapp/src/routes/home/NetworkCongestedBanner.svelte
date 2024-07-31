<script>
  import Button from '$lib/components/button/Button.svelte'
  import ErrorPopup from '$lib/components/error-popup/ErrorPopup.svelte'
  import LinkWithLinkIcon from '$lib/components/footer/linkWithLinkIcon.svelte'

  let show = true
</script>

{#if show}
  <div class="error-congestion-banner">
    <ErrorPopup
      title={'RadQuest is experiencing very high demand.'}
      on:close={() => (show = false)}
    >
      <div>If you have problems completing quests or making claims, please try again later.</div>

      <div class="link">
        <LinkWithLinkIcon href="https://x.com/radixdlt">Learn more on X @radixdlt</LinkWithLinkIcon>
      </div>

      <div class="button">
        <Button on:click={() => (show = false)} secondary>Close</Button>
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

  a {
    color: var(--color-primary);
    text-decoration: underline;
  }

  .link {
    margin-top: var(--spacing-xl);
  }

  .button {
    margin-top: var(--spacing-xl);
  }
</style>
