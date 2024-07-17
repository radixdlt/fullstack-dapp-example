<script lang="ts">
  import Button from '$lib/components/button/Button.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { backOut } from 'svelte/easing'
  import { scale } from 'svelte/transition'
  import Backdrop from '$lib/components/backdrop/Backdrop.svelte'
  import { onMount } from 'svelte'
  import { ErrorPopupId, errorPopupStore, type ErrorPopup } from './store'
  import ErrorIcon from '@images/error.svg'
  import CrossIcon from '@images/cross.svg'
  import { goto } from '$app/navigation'

  let visibleErrorPopup: ErrorPopup | undefined

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
  <Backdrop zIndex={5}>
    <div class="error-popup card" transition:scale|local={{ easing: backOut }}>
      <div class="close-button">
        <button on:click={hide}>
          <img src={CrossIcon} alt={$i18n.t('main:errorPopup.close')} />
        </button>
      </div>

      <div class="error-popup-content">
        <img src={ErrorIcon} alt="" />
        <span class="bold title">{$i18n.t(`main:errorPopup.${visibleErrorPopup.id}.title`)}</span>

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
      </div>
    </div>
  </Backdrop>
{/if}

<style lang="scss">
  div {
    line-height: 24px;
  }
  .title {
    margin: var(--spacing-sm) 0 var(--spacing-xl);
  }
  .close-button {
    position: absolute;
    right: var(--spacing-2xl);
    top: var(--spacing-2xl);
  }
  .bold {
    font-weight: var(--font-weight-bold);
  }
  .error-popup {
    margin: var(--spacing-md);
    max-width: 25rem;
  }

  .button {
    margin-top: var(--spacing-2xl);
  }

  .error-popup-content {
    padding: var(--spacing-xl);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
</style>
