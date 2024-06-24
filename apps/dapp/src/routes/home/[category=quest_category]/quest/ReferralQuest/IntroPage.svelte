<script lang="ts">
  import ShareBox from '$lib/components/referral/ShareBox.svelte'
  import { i18n } from '$lib/i18n/i18n'
</script>

<div class="wrapper">
  <h3>{$i18n.t('quests:ReferralQuest.introHeader')}</h3>
  <p class="header">{$i18n.t('quests:ReferralQuest.copyReferral')}</p>
  <ShareBox />
  <p class="info">{@html $i18n.t('quests:ReferralQuest.info_1')}</p>
  <p class="info">{@html $i18n.t('quests:ReferralQuest.info_2')}</p>
</div>

<style lang="scss">
  .wrapper {
    text-align: center;
    color: var(--color-background-dark);
  }

  p {
    margin: var(--spacing-xl) 0 var(--spacing-xl);
    line-height: var(--line-height-lg);
  }

  p.header {
    letter-spacing: 0.16px;
    opacity: 0.6;
  }

  p.info {
    opacity: 0.7;
    margin: 2rem 0.5rem 0;

    &:last-child {
      margin-top: 1.5rem;
    }
  }
</style>
