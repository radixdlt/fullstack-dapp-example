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

<div class="menu-item-page" class:without-header={!$$slots.header}>
  <div class="content">
    {#if $$slots.header}
      <div>
        <slot name="header" />
      </div>
    {/if}

    <div>
      <slot />
    </div>
  </div>

  <div class:action class:actions>
    {#if action}
      <Button {loading} on:click={action.onClick}>{action.text}</Button>
    {:else if actions}
      <Button theme="dark" on:click={actions.left.onClick}>{actions.left.text}</Button>
      <Button {loading} {disabled} on:click={actions.right.onClick}>{actions.right.text}</Button>
    {/if}
  </div>
</div>

<style lang="scss">
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 251, 244, 0.6);
    background-clip: content-box;
    border: 5px solid transparent;
    border-radius: 10px;
  }

  .menu-item-page {
    color: var(--color-light);
    display: grid;
    grid-template-rows: auto 3.5rem;
    height: 100%;
  }

  .without-header {
    grid-template-rows: auto 3.5rem;
  }

  .content {
    overflow-y: auto;
  }

  .action,
  .actions {
    display: flex;
    align-items: end;
    gap: var(--spacing-2xl);
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
