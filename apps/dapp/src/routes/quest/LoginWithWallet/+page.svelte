<script lang="ts">
  import { user } from '../../../stores'
  import Quest from '../Quest.svelte'
  import type { PageData } from './$types'

  export let data: PageData

  let quest: Quest

  $: if (quest && $user) {
    quest.actions.goToStep('complete')
  }
</script>

<Quest
  bind:this={quest}
  {...data.questProps}
  steps={[
    {
      type: 'regular',
      id: '1'
    },
    {
      type: 'jetty',
      id: 'complete',
      dialogs: 1
    }
  ]}
  let:render
>
  {#if render('1')}
    Login with your Radix Wallet using the connect button.
  {/if}

  <svelte:fragment slot="jetty" let:render let:Button let:completeQuest>
    {#if render('complete')}
      Well done! You have successfully logged in with your Radix Wallet.
      <Button on:click={completeQuest}>Complete</Button>
    {/if}
  </svelte:fragment>
</Quest>
