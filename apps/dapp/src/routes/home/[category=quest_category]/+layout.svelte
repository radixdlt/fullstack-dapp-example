<script lang="ts">
  import Carousel from '$lib/components/carousel/Carousel.svelte'
  import QuestOverview from '$lib/components/quest-overview/QuestOverview.svelte'
  import type { QuestId } from 'content'
  import type { LayoutData } from './$types'
  import type { QuestStatus } from '../../../types'
  import { quests, scrollToNextQuest, user } from '../../../stores'
  import { page } from '$app/stores'
  import { i18n } from '$lib/i18n/i18n'

  export let data: LayoutData

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

  let _quests = Object.entries($quests) as [
    keyof typeof $quests,
    (typeof $quests)[keyof typeof $quests]
  ][]

  let carousel: Carousel

  $: if ($scrollToNextQuest && carousel) {
    carousel.scrollToNext()
    $scrollToNextQuest = false
  }
</script>

<Carousel bind:this={carousel} let:Item>
  {#each _quests as [id, quest]}
    {#if quest.category === $page.params.category}
      {#if id !== 'JoinFriend' || (id === 'JoinFriend' && $user?.referredBy)}
        <Item>
          <QuestOverview
            title={$i18n.t(`quests:${id}.title`)}
            description={$i18n.t(`quests:${id}.description`)}
            minutesToComplete={quest.minutesToComplete}
            rewards={quest.rewards}
            backgroundImage={quest.splashImage}
            state={questCardState[id] ?? 'locked'}
            link={`/home/${quest.category}/quest/${id}`}
            isQuestTogether={id === 'QuestTogether'}
          />
        </Item>
      {/if}
    {/if}
  {/each}
</Carousel>

<slot />
