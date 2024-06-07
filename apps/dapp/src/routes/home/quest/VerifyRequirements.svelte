<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import { questApi } from '$lib/api/quest-api'
  import { quests, user, webSocketClient } from '../../../stores'
  import type { Quests } from 'content'
  import RequirementsPage from '$lib/components/quest/RequirementsPage.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { useCookies, type RequirementCookieKey } from '$lib/utils/cookies'
  import { messageApi } from '$lib/api/message-api'

  export let questId: keyof Quests
  export let requirements: Record<string, boolean>

  const quest = $quests[questId]

  let requirementsStatus: { id: string; text: string; complete: boolean }[] = Object.entries(
    requirements
  ).map(([key, value]) => {
    // @ts-ignore
    const type = quest.requirements[key].type

    if (type === 'content' && !$user) {
      useCookies(`requirement-${questId}-${key}` as RequirementCookieKey).set(true)
    }

    const complete =
      useCookies(`requirement-${questId}-${key}` as RequirementCookieKey).get() === 'true'
        ? true
        : false

    return {
      id: key,
      //@ts-ignore
      text: $i18n.t(`quests:${questId}.requirements.${key}`),
      complete: type === 'content' ? true : complete || value
    }
  })

  const dispatch = createEventDispatcher<{
    'all-requirements-met': undefined
    'requirements-not-met': undefined
  }>()

  let dispatched = false

  const checkRequirements = () => {
    if (requirementsStatus.every((requirement) => requirement.complete)) {
      if (!dispatched) dispatch('all-requirements-met')
      dispatched = true
    } else {
      dispatch('requirements-not-met')
    }
  }

  const readRequirementsFromDb = () =>
    questApi
      .getQuestInformation(questId)
      .map((response) => {
        requirementsStatus = requirementsStatus.map((requirement) => {
          if (response.requirements[requirement.id]) {
            return {
              ...requirement,
              complete: true
            }
          } else {
            return requirement
          }
        })
      })
      .map(() => checkRequirements())

  onMount(() => {
    checkRequirements()
    if ($user) {
      questApi.completeContentRequirement(questId)

      readRequirementsFromDb()

      const unsubscribeWebSocket = $webSocketClient?.onMessage((message) => {
        if (message.type === 'QuestRewardsDeposited') {
          readRequirementsFromDb().then(() => {
            messageApi.markAsSeen(message.id)
          })
        }
      })

      return () => {
        unsubscribeWebSocket?.()
      }
    }
  })
</script>

<RequirementsPage requirements={requirementsStatus} />
