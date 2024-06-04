<script lang="ts">
  import { typeToIcon } from '$lib/utils/type-to-icon'
  import Icon from '../icon/Icon.svelte'
  import { questRewardDisplayName, type QuestReward } from 'content'

  export let rewards: Readonly<QuestReward[]> = []
  export let displayName = false
</script>

<div class="rewards">
  {#each rewards as { name, amount }}
    <div class="reward">
      <Icon url={typeToIcon[name]} size="small">
        {amount}
      </Icon>
      {#if displayName}
        {questRewardDisplayName[name]}{amount > 1 ? 's' : ''}
      {/if}
    </div>
  {/each}
</div>

<style lang="scss">
  .rewards {
    flex-flow: row-reverse;
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    gap: var(--spacing-2xl);
  }

  .reward {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }
</style>
