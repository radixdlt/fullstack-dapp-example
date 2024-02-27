<script lang="ts">
  import { goto } from '$app/navigation'
  import Backdrop from '$lib/components/backdrop/Backdrop.svelte'
  import DefQuest from '$lib/components/quest/DefQuest.svelte'
  import { quests } from '../../../stores'
  import type { PageData } from './$types'

  export let data: PageData

  const quest = $quests.find((quest) => quest.id === data.id)!
</script>

<Backdrop>
  <div class="container">
    <div class="quest">
      <DefQuest {quest} on:close={() => goto('/')} />
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
