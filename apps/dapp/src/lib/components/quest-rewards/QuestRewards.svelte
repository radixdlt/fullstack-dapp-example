<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import { typeToIcon } from '$lib/utils/type-to-icon'
  import Icon from '../icon/Icon.svelte'
  import { type QuestReward } from 'content'

  export let rewards: Readonly<QuestReward[]> = []
  export let displayName = false
  export let vertical = false
</script>

<div class="rewards" class:vertical>
  {#each rewards as { name, amount }}
    <div class="reward">
      <Icon url={typeToIcon[name]} size="small">
        {amount}
      </Icon>
      {#if displayName}
        {$i18n.t(`rewards:${name}`, { count: Number(amount) })}
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
    gap: var(--rewards-gap, var(--spacing-lg));
  }

  .rewards.vertical {
    flex-direction: column;
    align-items: flex-start;
  }

  .reward {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }
</style>
