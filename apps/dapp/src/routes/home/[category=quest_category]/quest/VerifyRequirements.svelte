<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import { questApi } from '$lib/api/quest-api'
  import { quests, user, webSocketClient } from '../../../../stores'
  import type { Quests } from 'content'
  import RequirementsPage from '$lib/components/quest/RequirementsPage.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { useCookies, type RequirementCookieKey } from '$lib/utils/cookies'
  import { messageApi } from '$lib/api/message-api'
  import pipe from 'ramda/src/pipe'

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
    loading: boolean
  }>()

  let dispatched = false

  const setLoading = (isLoading: boolean) => {
    dispatch('loading', isLoading)
    loading = isLoading
  }

  const checkRequirements = () => {
    if (requirementsStatus.every((requirement) => requirement.complete)) {
      if (!dispatched) dispatch('all-requirements-met')
      dispatched = true
      setLoading(false)
    } else {
      setLoading(false)
      dispatch('requirements-not-met')
    }
  }

  const readRequirementsFromDb = () =>
    questApi.getQuestInformation(questId).map((response) => {
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
      return response
    })

  onMount(() => {
    if ($user) {
      setLoading(true)

      pipe(
        () => questApi.completeContentRequirement(questId),
        async (result) => {
          await result
          return readRequirementsFromDb()
        },
        (promise) => promise.then((result) => result.map(({ status }) => status)),
        (promise) =>
          promise.then((result) =>
            result.map((status) => {
              if (status === 'REWARDS_DEPOSITED' || status === 'COMPLETED') {
                setLoading(false)
                dispatch('all-requirements-met')
              }

              if (questId === 'LoginWithWallet') {
                checkRequirements()
              }
            })
          )
      )()

      const unsubscribeWebSocket = $webSocketClient?.onMessage((message) => {
        if (message.type === 'QuestRewardsDeposited') {
          readRequirementsFromDb().then(() => {
            messageApi.markAsSeen(message.id)
            checkRequirements()
          })
        }
      })

      return () => {
        unsubscribeWebSocket?.()
      }
    } else {
      checkRequirements()
    }
  })

  let loading = false
</script>

<RequirementsPage requirements={requirementsStatus} {loading} />
