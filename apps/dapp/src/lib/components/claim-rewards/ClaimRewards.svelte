<script lang="ts">
  import Button from '$lib/components/button/Button.svelte'
  import Icon from '$lib/components/icon/Icon.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { typeToIcon } from '$lib/utils/type-to-icon'
  import type { QuestReward } from 'content'

  export let rewards: Readonly<QuestReward[]>
  export let loading = false
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

<div class="btn">
  <Button on:click {loading}>{$i18n.t('quests:claimButton')}</Button>
</div>

<style lang="scss">
  .rewards {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xl);
  }

  .btn {
    margin-top: var(--spacing-xl);
    display: flex;
    justify-content: center;
  }
</style>
