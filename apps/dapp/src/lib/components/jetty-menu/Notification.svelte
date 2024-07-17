<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import Icon from '../icon/Icon.svelte'
  import CrossIcon from '@images/cross.svg'

  export let title: string
  export let text: string

  const dispatch = createEventDispatcher<{
    dismiss: undefined
    goToQuest: undefined
  }>()
</script>

<button class="notification" on:click={() => dispatch('goToQuest')}>
  <div class="red-dot" />
  <div class="info">
    <div class="header">
      <div class="title">
        {title}
      </div>

      <Icon clickable on:click={() => dispatch('dismiss')} url={CrossIcon} />
    </div>

    <div class="content">
      {text}
    </div>
  </div>
</button>

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
    color: var(--color-dark);
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
