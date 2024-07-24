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
  import { onMount } from 'svelte'
  import { derived } from 'svelte/store'

  export let data: LayoutData

  let referredByCookie: string | undefined

  onMount(() => {
    referredByCookie = useCookies('referredBy').get()

    if ($page.params.category === 'advanced') {
      markNotificationAsSeen('basicQuestsComplete')
    }

    setTimeout(() => {
      scrollToEarliestQuest()
    }, 0)
  })

  $: questCardState = Object.entries(data.questDefinitions).reduce(
    (prev, cur) => {
      const [id, quest] = cur

      if (data.questStatus[id as QuestId]?.status === 'COMPLETED') {
        prev[id as QuestId] = 'completed'
        return prev
      }

      const preRequisites = quest.preRequisites
      const isUnlocked = preRequisites.every(
        (preReq) => data.questStatus[preReq]?.status === 'COMPLETED'
      )

      const isInProgress = data.questStatus[id as QuestId]?.status === 'IN_PROGRESS'
      const hasRewardsToClaim = data.questStatus[id as QuestId]?.status === 'REWARDS_DEPOSITED'
      prev[id as QuestId] = hasRewardsToClaim
        ? 'claim-rewards'
        : isInProgress
          ? 'in-progress'
          : isUnlocked
            ? 'unlocked'
            : 'locked'

      return prev
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
    const earliestUnlockedQuest = _quests.find(([id, _]) => questCardState[id] !== 'locked')?.[0]

    if (earliestUnlockedQuest)
      carousel.scrollToIndex(Object.keys($quests).indexOf(earliestUnlockedQuest))
    else carousel.scrollToIndex(0)
  }

  const category = derived(page, ($page) => $page.params.category)

  $: {
    if (carousel && $category) {
      scrollToEarliestQuest()
    }
  }

  $: if ($scrollToQuestIndex && carousel) {
    carousel.scrollToIndex($scrollToQuestIndex)
    $scrollToQuestIndex = null
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

<style>
  :global(.carousel > .item) {
    padding: var(--spacing-2xl) 0;
  }
</style>
