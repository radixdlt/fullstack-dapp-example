<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import { createEventDispatcher } from 'svelte'
  import Button from '../button/Button.svelte'
  import Icon from '../icon/Icon.svelte'
  import CrossIcon from '@images/cross.svg'

  export let title: string
  export let html: string

  const dispatch = createEventDispatcher<{
    dismiss: undefined
    goToQuest: undefined
  }>()
</script>

<div class="notification">
  <div class="red-dot" />
  <div class="info">
    <div class="header">
      <div class="title">
        {title}
      </div>

      <Icon clickable on:click={() => dispatch('dismiss')} url={CrossIcon} />
    </div>

    <div class="content">
      {@html html}
    </div>

    <Button on:click={() => dispatch('goToQuest')}>
      {$i18n.t('jetty:notification-cta')}
    </Button>
  </div>
</div>

<style>
  .notification {
    display: grid;
    grid-template-columns: 1rem auto;
    grid-template-rows: auto;
    width: 100%;
    height: fit-content;
    background: var(--gradient-7);
    border-radius: var(--border-radius-xl);
    padding: var(--spacing-xl);
    gap: var(--spacing-xl);
  }

  .red-dot {
    width: 0.9rem;
    height: 0.9rem;
    background-color: red;
    border-radius: 50%;
    grid-column: 1;
    transform: translateY(0.3rem);
  }

  .info {
    grid-column: 2;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-s);
  }

  .title {
    font-weight: var(--font-weight-bold);
  }

  .content {
    margin-bottom: var(--spacing-md);
  }
</style>
