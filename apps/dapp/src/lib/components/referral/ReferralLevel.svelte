<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import FireIcon from '@images/fire.svg'
  import { sendTransaction } from '$lib/rdt'
  import { QuestDefinitions } from 'content'
  import Button from '../button/Button.svelte'
  import PadlockIcon from '@images/padlock.svg'
  import HourGlassIcon from '@images/hourglass.svg'
  import LockedLevelIcon from '@images/locked-level.svg'
  import ReferralLevelUI from './ReferralLevelUI.svelte'
  import QuestRewards from '../quest-rewards/QuestRewards.svelte'
  import CompletedGradientIcon from '@images/completed-gradient.svg'
  import { createClaimRewardsTransaction } from '$lib/helpers/create-claim-rewards-transaction'
  import { user } from '../../../stores'
  import { createEventDispatcher } from 'svelte'
  import LoadingSpinner from '../loading-spinner/LoadingSpinner.svelte'

  type Level = keyof ReturnType<typeof QuestDefinitions>['QuestTogether']['partialRewards']

  export let level: Level | 'SuperLevel'
  export let maximum: number = 0
  export let referred: number = 0
  export let status: string | undefined

  const questDefinition = QuestDefinitions().QuestTogether
  const dispatch = createEventDispatcher<{ refresh: undefined }>()

  $: loading = false
  $: name = $i18n.t(`quests:QuestTogether.${level}`)
  $: rewards = questDefinition.partialRewards?.[level as Level] || []
  $: requirement = questDefinition.requirements?.[level as Level]
  $: icon =
    level === 'SuperLevel'
      ? FireIcon
      : status === '' || !status
        ? LockedLevelIcon
        : status === 'REWARDS_CLAIMED'
          ? CompletedGradientIcon
          : HourGlassIcon
  $: referredCount = Math.min(maximum, referred)

  const claimRewards = () => {
    loading = true
    sendTransaction({
      transactionManifest: createClaimRewardsTransaction(
        $user?.accountAddress!,
        $user?.id!,
        `QuestTogether:${level}`
      )
    })
      .map(() => {
        loading = false
        dispatch('refresh')
      })
      .mapErr(() => {
        loading = false
      })
  }
</script>

<ReferralLevelUI
  title={name}
  {icon}
  progress={level === 'SuperLevel' ? 1 : referred}
  totalSteps={level === 'SuperLevel' ? 1 : requirement.threshold}
>
  <svelte:fragment slot="referrals">
    {#if level === 'SuperLevel'}
      {$i18n.t('quests:QuestTogether.progressSuperLevel', {
        count: questDefinition.requirements.GoldLevel.threshold
      })}
    {:else}
      {$i18n.t('quests:QuestTogether.referralsProgress', {
        referred: referredCount,
        maximum: requirement.threshold
      })}
    {/if}
  </svelte:fragment>

  <svelte:fragment slot="content">
    {#if level === 'SuperLevel'}
      <p>{$i18n.t('quests:QuestTogether.SuperLevelInfo')}</p>
      <Button>{$i18n.t('quests:QuestTogether.SuperLevelButton')}</Button>
    {:else}
      <div class="rewards">{$i18n.t('quests:rewards')}:</div>
      <QuestRewards {rewards} displayName vertical --rewards-gap="0.5rem" />
    {/if}
  </svelte:fragment>

  <svelte:fragment slot="action-button">
    {#if status === 'REWARDS_DEPOSITED'}
      <Button on:click={claimRewards} disabled={loading}>
        {#if loading}
          <LoadingSpinner />
        {:else}
          {$i18n.t('quests:claimButton')}
        {/if}
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
