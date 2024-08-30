<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte'
  import { questApi } from '$lib/api/quest-api'
  import { isUserBlocked, quests, user } from '../../../../stores'
  import type { Quests } from 'content'
  import RequirementsPage from '$lib/components/quest/RequirementsPage.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { useCookies, type RequirementCookieKey } from '$lib/utils/cookies'
  import { messageApi } from '$lib/api/message-api'
  import { webSocketClient, type WebSocketClient } from '$lib/websocket-client'
  import type { QuestRequirement } from '$lib/server/user-quest/controller'
  import { waitingWarning } from '$lib/utils/waiting-warning'
  import { okAsync } from 'neverthrow'
  import type { $Enums } from 'database'

  export let questId: keyof Quests
  export let requirements: Record<string, QuestRequirement>
  export let questStatus: $Enums.QuestStatus

  const quest = $quests[questId]

  const getRequirementStatus = (reqs: typeof requirements) =>
    Object.entries(reqs)
      .filter(([, { isHidden }]) => !isHidden)
      .map(([key, value]) => {
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

  let requirementsStatus = getRequirementStatus(requirements)

  let loading = true

  const dispatch = createEventDispatcher<{
    'all-requirements-met': undefined
  }>()

  export const checkRequirements = () => {
    if ($isUserBlocked) {
      dispatch('all-requirements-met')
      return okAsync(true)
    }
    return questApi.getQuestInformation(questId).map(({ requirements, status }) => {
      const isInProgress = status === 'IN_PROGRESS'

      requirementsStatus = getRequirementStatus(requirements)

      const allRequirementsMet = requirementsStatus.every((req) => req.complete)

      if (allRequirementsMet && !isInProgress) {
        dispatch('all-requirements-met')
      } else {
        if (!allRequirementsMet) {
          loading = false
        }
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
    waitingWarning(false)
  })

  onMount(() => {
    if (requirementsStatus.every((req) => req.complete) && questStatus !== 'IN_PROGRESS') {
      dispatch('all-requirements-met')
    } else if ($user) {
      checkRequirements()
    }
  })

  $: waitingWarning(loading)
</script>

<RequirementsPage requirements={requirementsStatus} {loading} />
