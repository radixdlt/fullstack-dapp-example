<script lang="ts">
  import ReferralLevel from '$lib/components/referral/ReferralLevel.svelte'
  import ReferralsSoFar from '$lib/components/referral/ReferralsSoFar.svelte'
  import ShareBox from '$lib/components/referral/ShareBox.svelte'

  import FireIcon from '@images/fire.svg'
  import { i18n } from '$lib/i18n/i18n'

  import { QuestDefinitions } from 'content'
  import { createEventDispatcher } from 'svelte'
  import { user } from '../../../../../stores'

  type Level = 'BronzeLevel' | 'SilverLevel' | 'GoldLevel'

  export let referrals: string[]
  export let progress: Record<Level, string>

  const dispatch = createEventDispatcher<{ seeReferrals: undefined; refresh: undefined }>()

  const requirements = QuestDefinitions().QuestTogether.requirements
  const threshold = {
    BronzeLevel: requirements.BronzeLevel.threshold,
    SilverLevel: requirements.SilverLevel.threshold,
    GoldLevel: requirements.GoldLevel.threshold
  }

  const getCurrentLevel = (referralCount: number) => {
    if ($user?.goldenTicketClaimed?.type !== 'FULL') return 'BronzeLevel' as Level
    if (referralCount >= threshold.GoldLevel) return 'SuperLevel' as Level | 'SuperLevel'
    else if (referralCount >= threshold.SilverLevel) return 'GoldLevel' as Level
    else if (referralCount >= threshold.BronzeLevel) return 'SilverLevel' as Level
    else return 'BronzeLevel' as Level
  }

  $: currentLevel = getCurrentLevel(referrals.length)

  $: rewardDisplayLevel =
    (Object.entries(progress).find(
      ([_, status]) => status === 'REWARDS_DEPOSITED'
    )?.[0] as Level) ||
    (Object.entries(progress).find(([_, status]) => status === 'IN_PROGRESS')?.[0] as Level) ||
    currentLevel

  const getNextLevel = (currentLevel: string) => {
    if ($user?.goldenTicketClaimed?.type !== 'FULL') return 'SuperLevel'
    else if (currentLevel === 'BronzeLevel') return 'SilverLevel'
    else if (currentLevel === 'SilverLevel') return 'GoldLevel'
    else return 'SuperLevel' as Level | 'SuperLevel'
  }
  $: nextLevel = getNextLevel(currentLevel)
  $: nextLevelIn =
    nextLevel === 'SuperLevel' ? -1 : threshold[currentLevel as Level] - referrals.length
  $: hasWaitingRewards = Object.entries(progress).some(
    ([_, status]) => status === 'REWARDS_DEPOSITED'
  )
  $: unlockedSuperLevel = referrals.length >= threshold.GoldLevel

  const refresh = () => {
    dispatch('refresh')
  }
</script>

<div class="wrapper text-center">
  <strong class="text-14">{$i18n.t('quests:QuestTogether.shareYourLink')}</strong>
  <div class="share-box">
    <ShareBox />
  </div>

  <ReferralsSoFar
    referralCount={referrals.length}
    on:click={() => {
      dispatch('seeReferrals')
    }}
  />

  <div class="your-level">
    {#if unlockedSuperLevel}
      <div class="super-level">
        <img src={FireIcon} alt="" />
        <strong>{$i18n.t('quests:QuestTogether.unlockedSuperLevel')}</strong>
        <p>
          {@html $i18n.t('quests:QuestTogether.unlockedSuperLevelInfo')}
        </p>
      </div>
    {:else if nextLevel !== 'SuperLevel'}
      {$i18n.t('quests:QuestTogether.referMore', {
        nextLevel: $i18n.t(`quests:QuestTogether.${nextLevel}`),
        count: nextLevelIn
      })}
    {:else if hasWaitingRewards}
      {$i18n.t('quests:QuestTogether.rewardsWaiting')}
    {/if}
  </div>
  <div class="referral-levels">
    <ReferralLevel
      isOpened={rewardDisplayLevel === 'BronzeLevel'}
      level="BronzeLevel"
      on:refresh={refresh}
      maximum={threshold.BronzeLevel}
      referralCount={referrals.length}
      status={progress.BronzeLevel}
    />
    {#if $user?.goldenTicketClaimed?.type === 'FULL'}
      <ReferralLevel
        isOpened={rewardDisplayLevel === 'SilverLevel'}
        level="SilverLevel"
        on:refresh={refresh}
        maximum={threshold.SilverLevel}
        referralCount={referrals.length}
        status={progress.SilverLevel}
      />
      <ReferralLevel
        isOpened={rewardDisplayLevel === 'GoldLevel'}
        level="GoldLevel"
        on:refresh={refresh}
        maximum={threshold.GoldLevel}
        referralCount={referrals.length}
        status={progress.GoldLevel}
      />
    {/if}
  </div>
</div>

<style lang="scss">
  .share-box {
    margin: 5px 1rem 1.5rem;
  }
  .text-14 {
    font-size: var(--text-xs);
  }
  .super-level {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      margin: 0;
    }
    img {
      margin-bottom: var(--spacing-md);
    }
  }
  .referral-levels {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .your-level {
    margin: 0.5rem 1rem;
    line-height: var(--line-height-lg);
  }

  .super-level > p > :global(a) {
    text-decoration: underline;
  }

  .text-center {
    text-align: center;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }
</style>
