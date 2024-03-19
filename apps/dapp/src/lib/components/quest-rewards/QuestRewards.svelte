<script lang="ts">
  import { typeToIcon } from '$lib/utils'
  import Icon from '../icon/Icon.svelte'
  import type { QuestReward } from 'content'

  export let rewards: Readonly<QuestReward[]> = []
</script>

<div class="rewards">
  {#each rewards as { name, amount }}
    <div>
      <Icon url={typeToIcon[name]} size="small">
        {amount}
      </Icon>
    </div>
  {/each}
</div>

<style lang="scss">
  .rewards {
    flex-flow: row-reverse;
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    gap: var(--spacing-xl);
  }
</style>
