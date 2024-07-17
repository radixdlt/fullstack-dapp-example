<script lang="ts">
  import Button from '$lib/components/button/Button.svelte'
  import ReferralLevel from '$lib/components/referral/ReferralLevel.svelte'
  import ReferralsSoFar from '$lib/components/referral/ReferralsSoFar.svelte'
  import ShareBox from '$lib/components/referral/ShareBox.svelte'

  import FireIcon from '@images/fire.svg'
  import {
    createClaimXRDRewardsTransaction,
    handleKycBadge
  } from '$lib/helpers/create-claim-rewards-transaction'
  import { i18n } from '$lib/i18n/i18n'
  import { sendTransaction } from '$lib/rdt'

  import { QuestDefinitions } from 'content'
  import { createEventDispatcher } from 'svelte'
  import { user } from '../../../../../stores'
  import LoadingSpinner from '$lib/components/loading-spinner/LoadingSpinner.svelte'

  type Level = 'BronzeLevel' | 'SilverLevel' | 'GoldLevel'

  export let referrals: string[]
  export let claimed: number
  export let readyToClaim: number
  export let progress: Record<Level, string>

  const dispatch = createEventDispatcher<{ seeReferrals: undefined; refresh: undefined }>()

  const requirements = QuestDefinitions().QuestTogether.requirements
  const threshold = {
    BronzeLevel: requirements.BronzeLevel.threshold,
    SilverLevel: requirements.SilverLevel.threshold,
    GoldLevel: requirements.GoldLevel.threshold
  }

  $: loading = false

  $: currentLevel =
    (Object.entries(progress).find(([_, status]) => status === 'IN_PROGRESS')?.[0] as Level) ||
    ('BronzeLevel' as Level)
  $: nextLevel =
    currentLevel === 'BronzeLevel'
      ? 'SilverLevel'
      : currentLevel === 'SilverLevel'
        ? 'GoldLevel'
        : ('SuperLevel' as Level | 'SuperLevel')
  $: nextLevelIn =
    nextLevel === 'SuperLevel' ? -1 : threshold[currentLevel as Level] - referrals.length
  $: hasWaitingRewards = Object.entries(progress).some(
    ([_, status]) => status === 'REWARDS_DEPOSITED'
  )
  $: unlockedSuperLevel = referrals.length >= threshold.GoldLevel

  const claimXrd = () => {
    loading = true

    const account = $user?.accountAddress!
    const sendTx = (instapassBadge?: string) =>
      sendTransaction({
        transactionManifest: createClaimXRDRewardsTransaction(
          $user?.accountAddress!,
          $user?.id!,
          `QuestTogether`,
          readyToClaim,
          instapassBadge
        )
      })

    return handleKycBadge($user?.id!, account, sendTx)
      .map(() => {
        loading = false
        dispatch('refresh')
      })
      .mapErr(() => {
        loading = false
      })
  }

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
    count={referrals.length}
    on:click={() => {
      dispatch('seeReferrals')
    }}
  />
  {#if claimed !== 0}
    <div class="already-claimed">
      {$i18n.t('quests:QuestTogether.alreadyClaimed', { amount: claimed })}
    </div>
  {/if}

  {#if readyToClaim > 0}
    <div class="claim-button">
      <Button on:click={claimXrd} disabled={loading}>
        <div class="claim-button-text">
          {#if loading}
            <LoadingSpinner />
          {:else}
            {$i18n.t('quests:claimButton')}
            {readyToClaim} XRD
          {/if}
        </div>
      </Button>
    </div>
  {/if}

  <div class="your-level">
    {#if unlockedSuperLevel}
      <div class="super-level">
        <img src={FireIcon} alt="" />
        <strong>{$i18n.t('quests:QuestTogether.unlockedSuperLevel')}</strong>
        <p>
          {$i18n.t('quests:QuestTogether.unlockedSuperLevelInfo', { mail: 'hello@radixdlt.com' })}
        </p>
      </div>
    {:else}
      <div>
        <strong
          >{$i18n.t('quests:QuestTogether.yourLevel', {
            level: $i18n.t(`quests:QuestTogether.${currentLevel}`)
          })}</strong
        >
      </div>
      {#if nextLevel !== 'SuperLevel'}
        {$i18n.t('quests:QuestTogether.referMore', {
          nextLevel: $i18n.t(`quests:QuestTogether.${nextLevel}`),
          count: nextLevelIn
        })}
      {:else if hasWaitingRewards}
        {$i18n.t('quests:QuestTogether.rewardsWaiting')}
      {/if}
    {/if}
  </div>
  <div class="referral-levels">
    <ReferralLevel
      level="BronzeLevel"
      on:refresh={refresh}
      maximum={threshold.BronzeLevel}
      referred={referrals.length}
      status={progress.BronzeLevel}
    ></ReferralLevel>
    <ReferralLevel
      level="SilverLevel"
      on:refresh={refresh}
      maximum={threshold.SilverLevel}
      referred={referrals.length}
      status={progress.SilverLevel}
    ></ReferralLevel>

    <ReferralLevel
      level="GoldLevel"
      on:refresh={refresh}
      maximum={threshold.GoldLevel}
      referred={referrals.length}
      status={progress.GoldLevel}
    ></ReferralLevel>

    {#if unlockedSuperLevel}
      <ReferralLevel level="SuperLevel" status=""></ReferralLevel>
    {/if}
  </div>
</div>

<style lang="scss">
  .already-claimed {
    margin-top: -0.5rem;
  }

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

  .claim-button-text {
    margin: 0.25rem 0.75rem;
  }

  .claim-button {
    display: flex;
    margin: 1rem 0;
    justify-content: center;
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
