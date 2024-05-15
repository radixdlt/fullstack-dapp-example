<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import type { Quests } from 'content'

  const tabs = ['rewardTiersTab', 'partyParticipantsTab'] as const
  let selectedTab: (typeof tabs)[number] = 'rewardTiersTab'
  const setSelectedTab = (tab: (typeof tabs)[number]) => {
    selectedTab = tab
  }
</script>

<div class="quest-content">
  <h3>{$i18n.t('quests:ReferralQuest.rewardsTitle')}</h3>
  <div class="tabs">
    {#each tabs as tab}
      <button
        on:click={() => setSelectedTab(tab)}
        class="text-bold interactive"
        class:inactive={tab !== selectedTab}
      >
        {$i18n.t(`quests:ReferralQuest.${tab}`)}
      </button>
    {/each}
  </div>
  <div class="rewards-list"></div>
</div>

<style lang="scss">
  h3 {
    margin: 0;
  }

  .tabs {
    display: flex;
    gap: var(--spacing-lg);
    justify-content: center;
    align-items: center;
  }

  .inactive {
    opacity: 40%;
  }

  .interactive {
    cursor: pointer;
  }

  .quest-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-lg);
    text-align: center;
    overflow: hidden;
  }
</style>
