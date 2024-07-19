<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte'
  import { questApi } from '$lib/api/quest-api'
  import { quests, user } from '../../../../stores'
  import type { Quests } from 'content'
  import RequirementsPage from '$lib/components/quest/RequirementsPage.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { useCookies, type RequirementCookieKey } from '$lib/utils/cookies'
  import { messageApi } from '$lib/api/message-api'
  import { webSocketClient, type WebSocketClient } from '$lib/websocket-client'
  import type { QuestRequirement } from '$lib/server/user-quest/controller'

  export let questId: keyof Quests
  export let requirements: Record<string, { isComplete: QuestRequirement['isComplete'] }>

  const quest = $quests[questId]

  let requirementsStatus = Object.entries(requirements).map(([key, value]) => {
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
      //@ts-ignore
      text: $i18n.t(`quests:${questId}.requirements.${key}`),
      complete: type === 'content' ? true : complete || value.isComplete
    }
  }) as { text: string; complete: boolean }[]

  let loading = true

  const dispatch = createEventDispatcher<{
    'all-requirements-met': undefined
    'requirements-not-met': undefined
    loading: boolean
  }>()

  const setLoading = (isLoading: boolean) => {
    dispatch('loading', isLoading)
    loading = isLoading
  }

  export const checkRequirements = () => {
    return questApi.getQuestInformation(questId).map(({ requirements, status }) => {
      const requirementValueList = Object.entries(requirements)
      const allRequirementsMet = requirementValueList.every(([_, { isComplete }]) => isComplete)
      const isInProgress = status === 'IN_PROGRESS'

      requirementsStatus = requirementValueList
        .filter(([, { isHidden }]) => !isHidden)
        .map(([key, { isComplete }]) => {
          return {
            //@ts-ignore
            text: $i18n.t(`quests:${questId}.requirements.${key}`),
            complete: isComplete
          }
        })

      if (allRequirementsMet && !isInProgress) {
        dispatch('all-requirements-met')
      } else {
        if (!allRequirementsMet) {
          setLoading(false)
        }
        dispatch('requirements-not-met')
      }

      return allRequirementsMet
    })
  }

  let unsubscribeWebSocket: ReturnType<WebSocketClient['onMessage']> | undefined
  $: if ($webSocketClient && $user) {
    unsubscribeWebSocket = $webSocketClient.onMessage((message) => {
      if (message.type === 'QuestRewardsDeposited') {
        checkRequirements().andThen(() => messageApi.markAsSeen(message.id))
      }
    })
  }

  onDestroy(() => {
    unsubscribeWebSocket?.()
  })

  onMount(() => {
    setLoading(true)
    if ($user) {
      checkRequirements()
    }
  })
</script>

<RequirementsPage requirements={requirementsStatus} {loading} />
