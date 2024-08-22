<script>
  import Button from '$lib/components/button/Button.svelte'
  import ErrorPopup from '$lib/components/error-popup/ErrorPopup.svelte'
  import { i18n } from '$lib/i18n/i18n'

  let show = true
</script>

{#if show}
  <ErrorPopup title={$i18n.t('main:errorPopup.GoldenTicket.title')} on:close={() => (show = false)}>
    <div>
      {$i18n.t('main:errorPopup.GoldenTicket.content')}
    </div>

    <div class="button">
      <Button on:click={() => (show = false)} secondary>
        {$i18n.t('main:errorPopup.GoldenTicket.button')}
      </Button>
    </div>
  </ErrorPopup>
{/if}

<style>
  .button {
    margin-top: var(--spacing-xl);
  }
</style>
