<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import { backOut } from 'svelte/easing'
  import { scale } from 'svelte/transition'
  import Backdrop from '$lib/components/backdrop/Backdrop.svelte'
  import { createEventDispatcher } from 'svelte'
  import ErrorIcon from '@images/error.svg'
  import CrossIcon from '@images/cross.svg'

  export let title: string

  const dispatch = createEventDispatcher<{
    close: undefined
  }>()
</script>

<Backdrop zIndex={5}>
  <div class="card error-popup" transition:scale|local={{ easing: backOut }}>
    <div class="close-button">
      <button on:click={() => dispatch('close')}>
        <img src={CrossIcon} alt={$i18n.t('main:errorPopup.close')} />
      </button>
    </div>

    <div class="error-popup-content">
      <img src={ErrorIcon} alt="" />
      <span class="bold title">{title}</span>

      <slot />
    </div>
  </div>
</Backdrop>

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

  .error-popup-content {
    padding: var(--spacing-xl);
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
</style>
