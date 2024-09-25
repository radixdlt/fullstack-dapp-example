<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import CrossIcon from '@images/cross.svg'
  import { createEventDispatcher } from 'svelte'
  import Backdrop from '../backdrop/Backdrop.svelte'
  import { scale } from 'svelte/transition'
  import { backOut } from 'svelte/easing'

  const dispatch = createEventDispatcher<{
    close: undefined
  }>()

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') dispatch('close')
  }
</script>

<svelte:window on:keydown={(e) => handleKeydown(e)} />

<Backdrop zIndex={5}>
  <div class="card popup" transition:scale|local={{ easing: backOut }}>
    <div class="wrapper">
      <div class="close-button">
        <button on:click={() => dispatch('close')}>
          <img src={CrossIcon} alt={$i18n.t('main:errorPopup.close')} />
        </button>
      </div>

      <slot />
    </div>
  </div>
</Backdrop>

<style>
  .wrapper {
    padding: var(--spacing-xl);
  }

  .popup {
    position: relative;
    margin: var(--spacing-lg);
    max-width: min(25rem, calc(100vw - 2 * var(--spacing-md)));
  }

  .close-button {
    position: absolute;
    right: var(--spacing-2xl);
    top: var(--spacing-2xl);
  }
</style>
