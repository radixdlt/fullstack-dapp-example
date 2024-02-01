<script lang="ts">
  import Icon from '$lib/components/icon/Icon.svelte'

  export let options: {
    text: string
    iconUrl: string
    onClick: () => void
  }[]
</script>

<div class="menu">
  {#each options as option}
    <button class="option" on:click={option.onClick}>
      <Icon url={option.iconUrl} />
      {option.text}
    </button>
  {/each}
</div>

<style lang="scss">
  .menu {
    width: 100%;
    height: 100%;
    background: var(--color-background-dark);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
  }

  .option {
    display: flex;
    align-items: center;
    font-size: var(--text-sm);
    gap: var(--spacing-lg);
    font-weight: var(--font-weight-bold);
    color: var(--color-light);
    padding: var(--spacing-lg) var(--spacing-lg);
    border-radius: var(--border-radius-md);

    transition: filter 0.2s ease-in-out;

    &:hover {
      filter: brightness(0.5);
    }
  }
</style>
