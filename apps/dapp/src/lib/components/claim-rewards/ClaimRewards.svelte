<script lang="ts">
  import Icon from '$lib/components/icon/Icon.svelte'
  import { typeToIcon } from '$lib/utils/type-to-icon'
  import type { QuestReward } from 'content'
  import JettyActionButtons from '../quest/JettyActionButtons.svelte'

  export let rewards: Readonly<QuestReward[]>
  export let loading = false
  export let nextButtonText: string
  export let text: string
  export let onBack: () => void
  export let onNext: () => void
</script>

<div class="rewards">
  <div>{@html text}</div>
  {#each rewards as { name, amount }}
    <div>
      <Icon url={typeToIcon[name]} size="medium">
        {amount}
      </Icon>
    </div>
  {/each}
</div>

<JettyActionButtons nextText={nextButtonText} {loading} on:back={onBack} on:next={onNext} />

<style lang="scss">
  .rewards {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xl);
  }
</style>
