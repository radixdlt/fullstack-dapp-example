<script lang="ts">
  import Icon from '$lib/components/icon/Icon.svelte'
  import { typeToIcon } from '$lib/utils/type-to-icon'
  import type { QuestReward } from 'content'
  import JettyActionButtons from '../quest/JettyActionButtons.svelte'
  import { i18n } from '$lib/i18n/i18n'

  export let rewards: Readonly<QuestReward[]>
  export let loading = false
  export let nextButtonText: string
  export let text: string
  export let onBack: () => void
  export let onNext: () => void
</script>

<div class="rewards">
  <div class="description">{@html text}</div>
  <div class="rewards-list">
    {#each rewards as { name, amount }}
      <div class="row">
        <Icon url={typeToIcon[name]} size="xlarge" />
        <div class="reward-text">
          {amount}
          {$i18n.t('jetty:reward-text', { count: 0, name })}
        </div>
      </div>
    {/each}
  </div>
</div>

<JettyActionButtons nextText={nextButtonText} {loading} on:back={onBack} on:next={onNext} />

<style lang="scss">
  .rewards {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xl);
  }

  .rewards-list {
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
  }

  .reward-text {
    text-transform: capitalize;
  }

  .row {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .description {
    width: 100%;
    text-align: left;
  }
</style>
