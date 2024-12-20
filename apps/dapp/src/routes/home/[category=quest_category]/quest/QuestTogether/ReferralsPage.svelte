<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import AvatarPlaceholder from '@images/avatar.png'
  export let referrals: string[]
  $: count = referrals.length
</script>

<div class="info">
  <strong>{$i18n.t('quests:QuestTogether.referralsSoFarHeader', { count })}</strong>
  <div>
    {$i18n.t('quests:QuestTogether.referralsSoFarDescription')}
  </div>
</div>

<ul>
  <li>{$i18n.t('quests:QuestTogether.yourReferralsCount', { count })}</li>
  {#each referrals as referral}
    <li><img src={AvatarPlaceholder} alt={referral} />{referral}</li>
  {/each}
</ul>

<style lang="scss">
  .info {
    text-align: center;
  }
  ul {
    list-style: none;

    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem calc(var(--spacing-2xl));
    border-bottom: 1px solid #e5e5e5;
    margin: 0 calc(var(--spacing-2xl) * -1);
    font-weight: var(--font-weight-bold);

    img {
      width: 32px;
      height: 32px;
    }
  }
</style>
