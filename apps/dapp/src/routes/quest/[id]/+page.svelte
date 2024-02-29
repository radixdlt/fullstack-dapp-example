<script lang="ts">
  import { goto } from '$app/navigation'
  import Backdrop from '$lib/components/backdrop/Backdrop.svelte'
  import DefQuest from '$lib/components/quest/DefQuest.svelte'
  import { fly } from 'svelte/transition'
  import { quests } from '../../../stores'
  import type { PageData } from './$types'

  export let data: PageData

  const quest = $quests.find((quest) => quest.id === data.id)!

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') close()
  }

  const close = () => goto('/')
</script>

<svelte:window on:keydown={(e) => handleKeydown(e)} />

<Backdrop>
  <div class="container">
    <div
      class="quest"
      transition:fly={{
        x: -1000
      }}
    >
      <DefQuest {quest} on:close={close} />
    </div>
  </div>
</Backdrop>

<style lang="scss">
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .quest {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    max-height: 50rem;
    width: 80vw;
    max-width: 50rem;
  }
</style>
