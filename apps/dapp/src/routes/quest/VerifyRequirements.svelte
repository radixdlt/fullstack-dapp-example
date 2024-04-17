<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import { questApi } from '$lib/api/quest-api'
  import { questRequirements, quests, user } from '../../stores'
  import type { QuestId, Quests } from 'content'
  import RequirementsPage from '$lib/components/quest/RequirementsPage.svelte'
  import { i18n } from '$lib/i18n/i18n'

  export let questId: keyof Quests

  const quest = $quests[questId]

  let requirementsStatus: { text: string; complete: boolean }[] = $questRequirements[questId].map(
    (requirement) => ({
      text: requirement.text,
      complete: requirement.type === 'content' ? true : false
    })
  )

  const dispatch = createEventDispatcher<{
    'all-requirements-met': undefined
  }>()

  const checkRequirements = () => {
    if (requirementsStatus.every((requirement) => requirement.complete)) {
      dispatch('all-requirements-met')
    }
  }

  $: {
    requirementsStatus
    checkRequirements()
  }

  onMount(() => {
    checkRequirements()

    if ($user) {
      questApi.getQuestInformation(questId).map((response) => {
        requirementsStatus = Object.keys(quest.requirements).map((key) => {
          const complete = response.requirements[key]
          // @ts-ignore
          return { text: $i18n.t(`quests:${quest.id}.requirements.${key}`), complete }
        })

        questRequirements.update((prev) => ({
          ...prev,
          [questId]: Object.entries(response.requirements).map((value) => ({
            id: value[0] as QuestId,
            text: (
              $i18n.t(`${questId}.requirements`, { ns: 'quests', returnObjects: true }) as Record<
                string,
                string
              >
            )[value[0]],
            complete: value[1],
            type: quest.requirements[value[0]].type
          }))
        }))
      })
    }
  })
</script>

<RequirementsPage requirements={requirementsStatus} />
