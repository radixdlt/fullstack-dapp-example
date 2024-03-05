<script lang="ts">
  import Button from '$lib/components/button/Button.svelte'
  import Icon from '$lib/components/icon/Icon.svelte'
  import { i18n } from '$lib/i18n'
  import { typeToIcon } from '$lib/utils'
  import type { QuestReward } from 'content'

  export let rewards: QuestReward[]
</script>

<slot />
<div class="rewards">
  {#each rewards as { name, amount }}
    <div>
      <Icon url={typeToIcon[name]} size="medium">
        {amount}
      </Icon>
    </div>
  {/each}
</div>

<div class="btn">
  <Button on:click>{$i18n.t('quest_claimButton')}</Button>
</div>

<style lang="scss">
  .rewards {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xl);
  }

  .btn {
    display: flex;
    justify-content: center;
  }
</style>
