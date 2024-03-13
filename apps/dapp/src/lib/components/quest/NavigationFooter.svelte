<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import { createEventDispatcher } from 'svelte'
  import Button from '../button/Button.svelte'
  import CompleteQuest from '../complete-quest/CompleteQuest.svelte'
  import { fly } from 'svelte/transition'

  const dispatch = createEventDispatcher<{
    back: undefined
    next: undefined
  }>()

  export let questId: string
  export let showComplete = false
</script>

<div class="footer-container" transition:fly|global={{ y: 200, opacity: 1, duration: 800 }}>
  <div class="footer quest-footer">
    <Button on:click={() => dispatch('back')}>{$i18n.t('quests:previousButton')}</Button>
    {#if showComplete}
      <CompleteQuest {questId} on:complete />
    {:else}
      <Button on:click={() => dispatch('next')}>{$i18n.t('quests:nextButton')}</Button>
    {/if}
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
