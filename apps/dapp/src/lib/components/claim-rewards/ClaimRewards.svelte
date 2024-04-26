<script lang="ts">
  import Icon from '$lib/components/icon/Icon.svelte'
  import { typeToIcon } from '$lib/utils/type-to-icon'
  import type { QuestReward } from 'content'

  export let rewards: Readonly<QuestReward[]>
</script>

<slot />
<div class="rewards">
  <div><slot /></div>
  {#each rewards as { name, amount }}
    <div>
      <Icon url={typeToIcon[name]} size="medium">
        {amount}
      </Icon>
    </div>
  {/each}
</div>

<style lang="scss">
  .rewards {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xl);
  }
</style>
