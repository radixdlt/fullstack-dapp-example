<script lang="ts">
  import { createEventDispatcher, getContext, onMount } from 'svelte'
  import { questApi } from '../../../routes/api/(protected)/quest/quest-api'
  import { quests } from '../../../stores'
  import RequirementsPage from '../quest/RequirementsPage.svelte'
  import type { writable } from 'svelte/store'

  export let requirements: Record<string, boolean>
  export let questId: string

  const quest = $quests.find((quest) => quest.id === questId)
  let requirementsStatus: { text: string; complete: boolean }[] = []
  const dispatch = createEventDispatcher()
  const navigationDirection =
    getContext<ReturnType<typeof writable<'next' | 'prev'>>>('navigationDirection')

  onMount(() => {
    if (!Object.values(requirements).filter((req) => !req).length) {
      setTimeout(() => dispatch($navigationDirection, 0))
    } else {
      questApi.getQuestInformation(questId).map((response) => {
        let hasUnmetRequirements = false
        requirementsStatus = Object.entries(quest!.requirementTexts || []).map(([key, value]) => {
          hasUnmetRequirements = hasUnmetRequirements || !response.requirements[key]
          return { text: value, complete: response.requirements[key] }
        })

        if (!hasUnmetRequirements) {
          setTimeout(() => dispatch($navigationDirection), 0)
        }
      })
    }
  })
</script>

<RequirementsPage requirements={requirementsStatus} />
