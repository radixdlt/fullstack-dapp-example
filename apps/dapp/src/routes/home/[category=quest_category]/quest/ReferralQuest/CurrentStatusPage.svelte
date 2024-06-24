<script lang="ts">
  import Button from '$lib/components/button/Button.svelte'
  import ReferralLevel from '$lib/components/referral/ReferralLevel.svelte'
  import ReferralsSoFar from '$lib/components/referral/ReferralsSoFar.svelte'
  import ShareBox from '$lib/components/referral/ShareBox.svelte'
  import { i18n } from '$lib/i18n/i18n'

  import { QuestDefinitions } from 'content'
  import { createEventDispatcher } from 'svelte'

  export let referrals: string[]
  const tiersRewards = QuestDefinitions().ReferralQuest.tiersRewards
  const dispatch = createEventDispatcher<{ seeReferrals: undefined }>()
  const alreadyClaimed = 80
  const claimNow = 40
</script>

<div class="wrapper text-center">
  <strong class="text-14">{$i18n.t('quests:ReferralQuest.shareYourLink')}</strong>
  <div class="share-box">
    <ShareBox />
  </div>

  <ReferralsSoFar
    count={referrals.length}
    on:click={() => {
      dispatch('seeReferrals')
    }}
  />
  <div class="already-claimed">
    {$i18n.t('quests:ReferralQuest.alreadyClaimed', { amount: alreadyClaimed })}
  </div>
  <div class="claim-button">
    <Button>
      <div class="claim-button-text">
        {$i18n.t('quests:claimButton')}
        {claimNow} XRD
      </div>
    </Button>
  </div>

  <div class="your-level">
    <div><strong>{$i18n.t('quests:ReferralQuest.yourLevel', { level: 'Silver' })}</strong></div>
    {$i18n.t('quests:ReferralQuest.referMore', { nextLevel: 'Gold', count: 3 })}
  </div>
  <div class="referral-levels">
    <ReferralLevel
      name={$i18n.t('quests:ReferralQuest.level1')}
      maximum={5}
      referred={5}
      rewards={tiersRewards[0]}
    ></ReferralLevel>
    <ReferralLevel
      name={$i18n.t('quests:ReferralQuest.level2')}
      maximum={10}
      referred={7}
      rewards={tiersRewards[1]}
    ></ReferralLevel>

    <ReferralLevel
      name={$i18n.t('quests:ReferralQuest.level3')}
      maximum={20}
      referred={0}
      rewards={tiersRewards[2]}
    ></ReferralLevel>
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
