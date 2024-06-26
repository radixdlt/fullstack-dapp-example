<script lang="ts">
  import Icon from '../icon/Icon.svelte'

  export let text: string
  export let icon: string
</script>

<button class="jetty-menu-button" on:click>
  <Icon url={icon} />
  {text}
</button>

<style lang="scss">
  .jetty-menu-button {
    display: flex;
    gap: var(--spacing-lg);
    align-items: center;
    width: 100%;
    background: var(--gradient-6);
    border-radius: var(--border-radius-2xl);
    overflow: hidden;
    height: 4rem;
    padding: 0 var(--spacing-2xl);
    color: var(--color-light);
    font-weight: var(--font-weight-bold);
  }
</style>
