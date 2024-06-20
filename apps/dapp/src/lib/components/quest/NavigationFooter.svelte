<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import { createEventDispatcher } from 'svelte'
  import Button from '../button/Button.svelte'
  import { fly } from 'svelte/transition'

  const dispatch = createEventDispatcher<{
    back: undefined
    next: undefined
  }>()

  export let nextDisabled = false
  export let nextButtonText: string | undefined
  export let backButtonText: string | undefined

  $: if (!nextButtonText) nextButtonText = $i18n.t('quests:continueButton')
  $: if (!backButtonText) backButtonText = $i18n.t('quests:backButton')
</script>

<div class="footer-container" transition:fly|local={{ y: 200, opacity: 1, duration: 800 }}>
  <div class="footer quest-footer">
    <Button secondary on:click={() => dispatch('back')}>{backButtonText}</Button>
    <Button disabled={nextDisabled} on:click={() => dispatch('next')}>{nextButtonText}</Button>
  </div>
</div>

<style>
  .footer {
    padding: var(--spacing-xl) var(--spacing-2xl);
  }

  .footer-container {
    grid-area: 4 / 1;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .quest-footer {
    display: flex;
    justify-content: space-between;
    gap: var(--spacing-lg);
    width: 100%;
  }
</style>
