<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import { createEventDispatcher } from 'svelte'
  import ChevronRight from '@images/chevron-right.svg'

  export let count: number

  const dispatch = createEventDispatcher<{ click: string }>()
</script>

<button
  class="wrapper"
  on:click={(ev) => {
    if (!count) {
      ev.preventDefault()
      ev.stopImmediatePropagation()
      return
    }

    dispatch('click', '')
  }}
>
  <span class="amount">{count}</span>
  <span class="link" class:active={count > 0}>
    {$i18n.t('quests:QuestTogether.referralsSoFar')}
    {#if count > 0}
      <img src={ChevronRight} alt={$i18n.t('quests:QuestTogether.referralsSoFar')} />
    {/if}
  </span>
</button>

<style lang="scss">
  .amount {
    color: var(--color-background-dark);
    font-size: var(--text-3xl);
    line-height: var(--text-3xl);
    font-weight: var(--font-weight-bold);
  }

  .wrapper {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
  }

  .link {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
  }

  .link.active {
    margin-left: 2.1rem;
    text-decoration: underline;
    font-weight: var(--font-weight-bold);
  }
</style>
