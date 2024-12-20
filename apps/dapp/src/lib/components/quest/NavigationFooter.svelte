<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import { createEventDispatcher } from 'svelte'
  import Button from '../button/Button.svelte'

  const dispatch = createEventDispatcher<{
    back: undefined
    next: undefined
  }>()

  export let nextDisabled = false
  export let nextLoading = false
  export let nextButtonText: string | undefined
  export let backButtonText: string | undefined

  $: if (!nextButtonText) nextButtonText = $i18n.t('quests:continueButton')
  $: if (!backButtonText) backButtonText = $i18n.t('quests:backButton')
</script>

<div class="footer-container">
  <div class="footer quest-footer">
    <Button secondary on:click={() => dispatch('back')}>{backButtonText}</Button>
    <Button disabled={nextDisabled} loading={nextLoading} on:click={() => dispatch('next')}
      >{nextButtonText}</Button
    >
  </div>
</div>

<style lang="scss">
  .footer {
    padding: var(--spacing-xl);
    @include shortMobile {
      padding: var(--spacing-lg) var(--spacing-xl) calc(var(--spacing-lg) + var(--spacing-xs));
    }
  }

  .footer-container {
    grid-area: 4 / 1;
    border-top: 1px solid var(--color-dark-translucent);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: calc(100vw - 1rem);
  }

  .quest-footer {
    display: flex;
    justify-content: space-between;
    gap: var(--spacing-lg);
    width: 100%;
  }
</style>
