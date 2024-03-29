<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import Button from '../button/Button.svelte'
  import { i18n } from '$lib/i18n/i18n'

  const dispatch = createEventDispatcher<{
    complete: undefined
  }>()
</script>

<Button on:click={() => dispatch('complete')}>{$i18n.t('quests:completeQuest')}</Button>
