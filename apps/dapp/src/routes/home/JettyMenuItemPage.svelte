<script lang="ts">
  import Button from '$lib/components/button/Button.svelte'

  export let action:
    | {
        text: string
        onClick: () => void
      }
    | undefined = undefined

  export let actions:
    | {
        left: {
          text: string
          onClick: () => void
        }
        right: {
          text: string
          onClick: () => void
        }
      }
    | undefined = undefined

  export let loading: boolean | undefined = undefined
  export let disabled: boolean | undefined = undefined
</script>

<div class="menu-item-page">
  <div class="content">
    <slot />
  </div>

  <div class:action class:actions>
    {#if action}
      <Button {loading} on:click={action.onClick}>{action.text}</Button>
    {:else if actions}
      <Button secondary on:click={actions.left.onClick}>{actions.left.text}</Button>
      <Button {loading} {disabled} on:click={actions.right.onClick}>{actions.right.text}</Button>
    {/if}
  </div>
</div>

<style>
  .menu-item-page {
    color: var(--color-light);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    overflow-x: hidden;
  }

  .content {
    height: 18.5rem;
  }

  .action {
    display: flex;
    justify-content: center;
  }

  .actions {
    display: flex;
    justify-content: space-between;
    gap: var(--spacing-2xl);
  }
</style>
