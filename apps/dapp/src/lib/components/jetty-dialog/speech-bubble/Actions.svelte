<script lang="ts">
  import Button from '$lib/components/button/Button.svelte'

  export let actions: {
    text: string
    onClick: () => void
  }[]
</script>

<div class="actions">
  {#each actions as action}
    <Button on:click={action.onClick}>
      {action.text}
    </Button>
  {/each}
  <Button secondary>Cancel</Button>
</div>

<style lang="scss">
  .actions {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
    max-width: 15rem;
    margin: 0 auto;
  }
</style>
