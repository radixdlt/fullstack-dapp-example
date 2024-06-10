<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import Button from '../button/Button.svelte'
  import Icon from '../icon/Icon.svelte'

  export let title = ''
  export let subtitle = ''
  export let onClose = () => {}
  export let rewards: Array<{ url: string }> = []
</script>

<div class="card">
  <div class="result-content">
    <h3 class="title">{@html title}</h3>
    <p class="subtitle">{@html subtitle}</p>
    <div class="rewards">
      {#each rewards as reward}
        <Icon url={reward.url} --size="46px" />
      {/each}
    </div>
    <div class="button">
      <Button --width="9rem" on:click={onClose} variation="secondary">
        {$i18n.t('main:modal.button')}
      </Button>
    </div>
  </div>
</div>

<style lang="scss">
  p,
  h3 {
    margin: 0;
    line-height: normal;
  }

  .result-content {
    width: 20rem;
    display: flex;
    flex-direction: column;
  }

  .rewards {
    display: flex;
    gap: 1px;
    justify-content: center;
    align-items: center;
    min-height: 2.625rem;
    padding-bottom: var(--spacing-xl);
  }

  .title {
    display: flex;
    text-align: center;
    justify-content: center;
    padding-bottom: 0.725rem;
  }

  .subtitle {
    justify-content: center;
    display: flex;
    text-align: center;
    padding-bottom: 0.725rem;
    font-family: var(--font-main);
    font-size: var(--text-sm);
    font-style: normal;
    font-weight: var(--font-weight-regular);
    color: var(--color-background-dark);
  }

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card {
    background-color: var(--color-linen);
    padding: 36px 57px 40px 57px;
    border-radius: var(--border-radius-2xl);
    width: 400px;
  }
</style>
