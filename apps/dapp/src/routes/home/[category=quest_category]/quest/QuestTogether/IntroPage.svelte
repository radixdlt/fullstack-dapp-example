<script lang="ts">
  import ShareBox from '$lib/components/referral/ShareBox.svelte'
  import { i18n } from '$lib/i18n/i18n'

  export let referralsCount: number
</script>

<div class="wrapper">
  <h3>{$i18n.t('quests:QuestTogether.introHeader')}</h3>
  <p class="header">{$i18n.t('quests:QuestTogether.copyReferral')}</p>
  <ShareBox />
  <p class="info">{@html $i18n.t('quests:QuestTogether.info_1')}</p>

  <p class="info">
    {#if referralsCount < 10}
      {@html $i18n.t('quests:QuestTogether.info_2')}
    {:else}
      <strong>{$i18n.t('quests:QuestTogether.unlockedSuperLevel')}</strong><br />
      {@html $i18n.t('quests:QuestTogether.unlockedSuperLevelInfo')}
    {/if}
  </p>
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

    :global(a) {
      text-decoration: underline;
    }
  }
</style>
