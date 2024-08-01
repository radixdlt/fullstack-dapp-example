<script lang="ts">
  import Button from '$lib/components/button/Button.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { onMount } from 'svelte'
  import { ErrorPopupId, errorPopupStore, type ErrorPopup as ErrorPopupT } from '../../stores'
  import { goto } from '$app/navigation'
  import ErrorPopup from '$lib/components/error-popup/ErrorPopup.svelte'

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
        <div class="bold">{$i18n.t('main:errorPopup.XrdRewardLimit.questName')}</div>
      </div>

      <div class="button">
        <Button
          on:click={() => {
            goto('/home/advanced/quest/Instapass')
            hide()
          }}>{$i18n.t('main:errorPopup.XrdRewardLimit.button')}</Button
        >
      </div>
    {/if}

    {#if visibleErrorPopup.id === ErrorPopupId.AccountAlreadyRegistered}
      <div>
        {$i18n.t('main:errorPopup.AccountAlreadyRegistered.content')}
      </div>

      <div class="button">
        <Button
          theme="light"
          on:click={() => {
            hide()
          }}>{$i18n.t('main:errorPopup.AccountAlreadyRegistered.button')}</Button
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
