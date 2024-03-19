<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { questApi } from '$lib/api/quest-api'
  import Button from '../button/Button.svelte'
  import { i18n } from '$lib/i18n/i18n'

  export let questId: string

  const dispatch = createEventDispatcher<{
    complete: undefined
  }>()

  const completeQuest = () => {
    questApi.completeQuest(questId).map(() => {
      dispatch('complete')
    })
  }
</script>

<Button on:click={completeQuest}>{$i18n.t('quests:completeQuest')}</Button>
