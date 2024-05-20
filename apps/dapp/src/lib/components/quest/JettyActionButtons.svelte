<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import Button from '../button/Button.svelte'
  import { i18n } from '$lib/i18n/i18n'

  export let backText: string = $i18n.t('quests:backButton')
  export let nextText: string = $i18n.t('quests:continueButton')
  export let isNextDisabled: boolean = false
  export let loading = false

  const dispatch = createEventDispatcher<{ back: undefined; next: undefined }>()
</script>

<div>
  <Button on:click={() => dispatch('back')}>{backText}</Button>
  <Button disabled={isNextDisabled} {loading} on:click={() => dispatch('next')}>{nextText}</Button>
</div>

<style>
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: var(--spacing-xl);
    gap: var(--spacing-xl);
  }
</style>
