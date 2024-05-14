<script lang="ts">
  import type { Quests } from 'content'

  export let questId: keyof Quests

  let tab: 'reward_tiers' | 'party_participants'
</script>

<div class="text-content">
  <h3 class="title">Party rewards Status</h3>
</div>

<style lang="scss">
  h3,
  p {
    margin: 0;
  }
  .text-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-lg);
    text-align: center;
    overflow: hidden;
  }
</style>
