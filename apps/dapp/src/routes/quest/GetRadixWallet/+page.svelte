<script lang="ts">
  import { onMount } from 'svelte'
  import Quest from '../Quest.svelte'
  import type { PageData } from './$types'

  export let data: PageData

  onMount(() => {
    const callback = ({ detail }: any) => {
      if (detail.eventType !== 'extensionStatus') return
      const { isWalletLinked } = detail

      if (isWalletLinked) {
        quest.actions.goToStep('complete')
      }
    }

    window.addEventListener('radix#chromeExtension#receive', callback)

    const timeout = setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('radix#chromeExtension#send', {
          detail: {
            interactionId: 'id',
            discriminator: 'extensionStatus'
          }
        })
      )
    }, 1000)

    return () => {
      window.removeEventListener('radix#chromeExtension#receive', callback)
      clearTimeout(timeout)
    }
  })

  let quest: Quest
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
    Install the Radix Wallet extension. This will allow you to link your wallet to the Radix Dapp.
  {/if}

  <svelte:fragment slot="jetty" let:render let:Button let:completeQuest>
    {#if render('complete')}
      Congratulations! You have successfully installed the Radix Wallet extension and linked your
      wallet.

      <Button on:click={completeQuest}>Complete</Button>
    {/if}
  </svelte:fragment>
</Quest>
