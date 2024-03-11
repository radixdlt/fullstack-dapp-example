<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { questApi } from '$lib/api/quest-api'
  import Button from '../button/Button.svelte'
  import { i18n } from '$lib/i18n'

  export let questId: string

  const dispatch = createEventDispatcher()

  const completeQuest = () => {
    questApi.completeQuest(questId).map(() => {
      dispatch('next')
    })
  }
</script>

<Button on:click={completeQuest}>{$i18n.t('completeQuest_complete')}</Button>
