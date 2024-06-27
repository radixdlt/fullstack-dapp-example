<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { crossfade } from 'svelte/transition'

  export let tabs: {
    name: string
    id: string
  }[] = []

  export let activeTab = tabs[0].id

  export const setActiveTab = (tab: string) => {
    activeTab = tab
  }

  const dispatch = createEventDispatcher<{ 'tab-changed': string }>()

  const [send, receive] = crossfade({
    duration: 300
  })

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
        {#if activeTab === tab.id}
          <div class="underline" out:send={{ key: 1 }} in:receive={{ key: 1 }} />
        {/if}
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  .tabs {
    display: flex;
    gap: var(--spacing-2xl);
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
  }

  .inactive {
    opacity: 0.4;
    transition: opacity 0.4s ease-in-out;
  }

  .underline {
    width: 100%;
    height: 0.13rem;
    background: var(--color-dark);
    border-radius: var(--border-radius-md);
  }
</style>
