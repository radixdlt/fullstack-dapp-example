<script lang="ts">
  import { writable } from 'svelte/store'
  import Icon from '../icon/Icon.svelte'

  export let text: string
  export let icon: string
  export let alert = writable(false)
  export let disabled = false
</script>

<button class="jetty-menu-button" class:disabled on:click>
  <div class="icon-and-text">
    <Icon url={icon} />
    {text}
  </div>
  {#if $alert}
    <div class="alert" />
  {/if}
</button>

<style lang="scss">
  .jetty-menu-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: var(--gradient-6);
    border-radius: var(--border-radius-2xl);
    overflow: hidden;
    height: 4rem;
    padding: 0 var(--spacing-2xl);
    color: var(--color-light);
    font-weight: var(--font-weight-bold);
  }

  .icon-and-text {
    display: flex;
    gap: var(--spacing-lg);
    align-items: center;
  }

  .alert {
    content: '';
    width: 0.8rem;
    height: 0.8rem;
    background-color: red;
    border-radius: 50%;
  }
</style>
