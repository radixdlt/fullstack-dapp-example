<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let tabs: {
    name: string
    id: string
  }[] = []

  export let activeTab = tabs[0].id

  export const setActiveTab = (tab: string) => {
    activeTab = tab
  }

  const dispatch = createEventDispatcher<{ 'tab-changed': string }>()

  $: dispatch('tab-changed', activeTab)
</script>

<div class="tabs">
  {#each tabs as tab}
    <div class="tab-container">
      <div class="tab">
        <button
          class:active={activeTab === tab.id}
          class:inactive={activeTab !== tab.id}
          on:click={() => (activeTab = tab.id)}
        >
          {tab.name}
        </button>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  .tabs {
    display: flex;
    gap: var(--spacing-2xl);
    align-items: center;
  }

  .tab-container {
    width: 5rem;
    display: flex;
    justify-content: center;
  }

  .tab {
    display: flex;
    flex-direction: column;
    width: fit-content;
    font-weight: var(--font-weight-bold);
  }

  .active {
    color: var(--color-dark);
    background: color-mix(in srgb, var(--color-dark) 20%, transparent);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-xs) var(--spacing-md);
  }

  .inactive {
    opacity: 0.4;
    transition: opacity 0.4s ease-in-out;
  }
</style>
