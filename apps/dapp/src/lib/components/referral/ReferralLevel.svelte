<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import { sendTransaction } from '$lib/rdt'
  import { QuestDefinitions, type QuestId } from 'content'
  import Button from '../button/Button.svelte'
  import PadlockIcon from '@images/padlock.svg'
  import HourGlassIcon from '@images/hourglass.svg'
  import LockedLevelIcon from '@images/locked-level.svg'
  import ReferralLevelUI from './ReferralLevelUI.svelte'
  import QuestRewards from '../quest-rewards/QuestRewards.svelte'
  import CompletedGradientIcon from '@images/completed-gradient.svg'
  import {
    createClaimRewardsTransaction,
    createClaimRewardsV2Transaction
  } from '$lib/helpers/create-claim-rewards-transaction'
  import { user } from '../../../stores'
  import { createEventDispatcher } from 'svelte'
  import { questApi } from '$lib/api/quest-api'
  import { determineIfQuestRewardV2 } from '../../../routes/home/[category=quest_category]/quest/ClaimRewards.svelte'

  type Level = keyof ReturnType<typeof QuestDefinitions>['QuestTogether']['partialRewards']

  export let isOpened = false
  export let level: Level | 'SuperLevel'
  export let maximum: number = 0
  export let referralCount: number = 0
  export let status: string | undefined

  const questDefinition = QuestDefinitions().QuestTogether
  const dispatch = createEventDispatcher<{ refresh: undefined }>()

  $: loading = false
  $: rewards = questDefinition.partialRewards?.[level as Level] || []
  $: requirement = questDefinition.requirements?.[level as Level]
  $: icon =
    status === '' || !status
      ? LockedLevelIcon
      : status === 'REWARDS_CLAIMED'
        ? CompletedGradientIcon
        : HourGlassIcon
  $: referredCount = Math.min(maximum, referralCount)

  const claimRewards = () => {
    loading = true
    const questId = `QuestTogether:${level}` as QuestId
    return determineIfQuestRewardV2($user?.id!, questId)
      .andThen((maybeRewards) => {
        if (maybeRewards)
          return sendTransaction({
            transactionManifest: createClaimRewardsV2Transaction(
              $user?.accountAddress!,
              $user?.id!,
              questId,
              maybeRewards
            )
          })

        return questApi.getDepositedRewards(questId).andThen((rewards) => {
          return sendTransaction({
            transactionManifest: createClaimRewardsTransaction(
              $user?.accountAddress!,
              $user?.id!,
              questId,
              rewards
            )
          })
        })
      })
      .then(() => {
        loading = false
        dispatch('refresh')
      })
  }
</script>

<ReferralLevelUI
  {isOpened}
  {level}
  {icon}
  progress={referralCount}
  totalSteps={requirement.threshold}
>
  <svelte:fragment slot="referrals">
    {$i18n.t('quests:QuestTogether.referralsProgress', {
      referred: referredCount,
      maximum: requirement.threshold
    })}
  </svelte:fragment>

  <svelte:fragment slot="content">
    <div class="rewards">{$i18n.t('quests:rewards')}:</div>
    <QuestRewards {rewards} displayName vertical --rewards-gap="0.5rem" />
  </svelte:fragment>

  <svelte:fragment slot="action-button">
    {#if status === 'REWARDS_DEPOSITED'}
      <Button on:click={claimRewards} disabled={loading} {loading}>
        {$i18n.t('quests:claimButton')}
      </Button>
    {:else if status === 'IN_PROGRESS'}
      <Button disabled>
        <div class="button-content">
          <img src={PadlockIcon} alt="Padlock icon" />
          {$i18n.t('quests:inProgress')}
        </div>
      </Button>
    {:else if status === 'REWARDS_CLAIMED'}
      <strong>{$i18n.t('quests:QuestTogether.rewardsClaimed')}</strong>
    {/if}
  </svelte:fragment>
</ReferralLevelUI>

<style lang="scss">
  .button-content {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }

  .rewards {
    text-transform: uppercase;
    font-weight: var(--font-weight-bold);
    text-align: left;
    margin-bottom: var(--spacing-md);
  }
</style>
