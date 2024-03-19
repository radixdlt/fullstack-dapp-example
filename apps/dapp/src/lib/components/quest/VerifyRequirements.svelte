<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import { questApi } from '$lib/api/quest-api'
  import type { Quests } from 'content'
  import RequirementsPage from '$lib/components/quest/RequirementsPage.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { quests } from '../../../stores'

  export let questId: keyof Quests

  const quest = $quests[questId]

  let requirementsStatus: { text: string; complete: boolean }[] = []

  const dispatch = createEventDispatcher<{
    'all-requirements-met': undefined
  }>()

  onMount(() => {
    questApi.getQuestInformation(questId).map((response) => {
      let hasUnmetRequirements = false

      requirementsStatus = Object.keys(quest.requirements).map((key) => {
        const complete = response.requirements[key]
        hasUnmetRequirements = !complete
        // @ts-ignore
        return { text: $i18n.t(`quests:${quest.id}.requirements.${key}`), complete }
      })

      if (!hasUnmetRequirements) dispatch('all-requirements-met')
    })
  })
</script>

<RequirementsPage requirements={requirementsStatus} />
