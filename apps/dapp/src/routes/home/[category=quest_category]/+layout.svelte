<script lang="ts">
  import Carousel from '$lib/components/carousel/Carousel.svelte'
  import QuestOverview from '$lib/components/quest-overview/QuestOverview.svelte'
  import type { QuestId } from 'content'
  import type { LayoutData } from './$types'
  import type { QuestStatus } from '../../../types'
  import { quests, scrollToQuestIndex, user } from '../../../stores'
  import { page } from '$app/stores'
  import { i18n } from '$lib/i18n/i18n'
  import { markNotificationAsSeen } from '$lib/notifications'
  import { useCookies } from '$lib/utils/cookies'
  import { onMount, tick } from 'svelte'
  import { derived } from 'svelte/store'
  import { PUBLIC_NETWORK_ID } from '$env/static/public'

  export let data: LayoutData

  let referredByCookie: string | undefined
  let mounted = false

  onMount(() => {
    mounted = true
    referredByCookie = useCookies('referredBy').get()

    if ($page.params.category === 'advanced') {
      markNotificationAsSeen('basicQuestsComplete')
    }

    setTimeout(() => {
      scrollToEarliestQuest()
    }, 0)
  })

  const isConsideredCompleted = (status: string) =>
    status === 'COMPLETED' || status === 'PARTIALLY_COMPLETED'

  $: questCardState = Object.entries($quests).reduce(
    (accumulator, currentQuest) => {
      if (PUBLIC_NETWORK_ID === '1' && $user?.type !== 'ADMIN') {
        // temporarily lock all quests
        accumulator[currentQuest[0] as QuestId] = 'locked'
        return accumulator
      }

      const [id, quest] = currentQuest
      const status = data.questStatus[id as QuestId]?.status

      if (isConsideredCompleted(status)) {
        accumulator[id as QuestId] = status.toLocaleLowerCase() as QuestStatus
        return accumulator
      }

      const preRequisites = quest.preRequisites
      const isUnlocked = preRequisites.every(
        (preReq) =>
          isConsideredCompleted(data.questStatus[preReq]?.status) ||
          data.questStatus[preReq]?.status === 'REWARDS_DEPOSITED'
      )

      const isInProgress = status === 'IN_PROGRESS'
      const isRewardReadyToClaim = status === 'REWARDS_DEPOSITED'
      const isRewardClaimed = status === 'REWARDS_CLAIMED'

      const getQuestStatus = () => {
        if (isRewardReadyToClaim) return 'claim-rewards'
        if (isInProgress || isRewardClaimed) return 'in-progress'
        if (isUnlocked) return 'unlocked'
        return 'locked'
      }

      accumulator[id as QuestId] = getQuestStatus()

      return accumulator
    },
    {} as { [key in QuestId]: QuestStatus }
  )

  $: _quests = Object.entries($quests).filter(
    ([id, quest]) =>
      (quest.category === $page.params.category && id !== 'JoinFriend') ||
      (id === 'JoinFriend' &&
        $page.params.category === 'advanced' &&
        ($user?.referredBy || (!$user && referredByCookie)))
  ) as [keyof typeof $quests, (typeof $quests)[keyof typeof $quests]][]

  let carousel: Carousel

  const scrollToEarliestQuest = () => {
    const earliestUnlockedQuest = _quests.find(
      ([id, _]) => questCardState[id] !== 'locked' && questCardState[id] !== 'completed'
    )?.[0]

    if (earliestUnlockedQuest)
      carousel.scrollToIndex(_quests.findIndex(([id, _]) => id === earliestUnlockedQuest))
    else carousel.scrollToIndex(0)
  }

  const category = derived(page, ($page) => $page.params.category)

  $: {
    if (carousel && $category) {
      tick().then(scrollToEarliestQuest)
    }
  }

  $: if ($scrollToQuestIndex && carousel) {
    carousel.scrollToIndex($scrollToQuestIndex)
    $scrollToQuestIndex = null
  }

  $: if ($category === 'advanced' && mounted) {
    markNotificationAsSeen('basicQuestsComplete')
  }
</script>

<Carousel bind:this={carousel} let:Item let:centreOnClicked>
  {#each _quests as [id, quest], i}
    <Item {i} on:click={centreOnClicked}>
      <QuestOverview
        title={$i18n.t(`quests:${id}.title`)}
        description={$i18n.t(`quests:${id}.description`)}
        minutesToComplete={quest.minutesToComplete}
        rewards={quest.rewards}
        backgroundImage={quest.splashImage}
        state={questCardState[id] ?? 'locked'}
        link={`/home/${quest.category}/quest/${id}`}
        questId={id}
      />
    </Item>
  {/each}
</Carousel>

<slot />

<style lang="scss">
  :global(.carousel > .item) {
    padding: var(--spacing-2xl) 0;
    @include smallMobile {
      padding: var(--spacing-xl) 0;
    }
  }
</style>
