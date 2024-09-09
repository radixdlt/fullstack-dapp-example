<script lang="ts">
  import Button from '$lib/components/button/Button.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { onMount } from 'svelte'
  import { ErrorPopupId, errorPopupStore, type ErrorPopup as ErrorPopupT } from '../../stores'
  import ErrorPopup from '$lib/components/error-popup/ErrorPopup.svelte'
  import { user } from '../../stores'

  let visibleErrorPopup: ErrorPopupT | undefined

  onMount(() => {
    const unsubscribe = errorPopupStore.subscribe((value) => {
      visibleErrorPopup = value
    })

    return () => {
      unsubscribe()
    }
  })

  const hide = () => {
    errorPopupStore.set(undefined)
  }
</script>

{#if visibleErrorPopup}
  <ErrorPopup title={$i18n.t(`main:errorPopup.${visibleErrorPopup?.id}.title`)} on:close={hide}>
    {#if visibleErrorPopup.id === ErrorPopupId.XrdRewardLimit}
      <div>
        {$i18n.t('main:errorPopup.XrdRewardLimit.content')}
      </div>

      <div class="button">
        <Button
          isExternal
          link={`mailto:hello@radixdlt.com?subject=RadQuest%20support%20request%20%5BXRD%20limit%20reached%5D${$user?.id ? `%20-%20user%20ID%3A%20${$user.id}` : ''}`}
        >
          {$i18n.t('main:errorPopup.XrdRewardLimit.button')}
        </Button>
      </div>
    {/if}

    {#if visibleErrorPopup.id === ErrorPopupId.AccountAlreadyRegistered || visibleErrorPopup.id === ErrorPopupId.AccountLocked || visibleErrorPopup.id === ErrorPopupId.CannotClaimRewards}
      <div>
        {$i18n.t(`main:errorPopup.${visibleErrorPopup.id}.content`)}
      </div>

      <div class="button">
        <Button
          theme="light"
          on:click={() => {
            hide()
          }}>{$i18n.t(`main:errorPopup.${visibleErrorPopup.id}.button`)}</Button
        >
      </div>
    {/if}

    {#if visibleErrorPopup.id === ErrorPopupId.HighDemand}
      <div>
        {$i18n.t('main:errorPopup.HighDemand.content')}
      </div>

      <div class="button">
        <Button theme="light" on:click={hide}>{$i18n.t('main:errorPopup.HighDemand.button')}</Button
        >
      </div>
    {/if}
  </ErrorPopup>
{/if}

<style lang="scss">
  .button {
    margin-top: var(--spacing-2xl);
  }
</style>
