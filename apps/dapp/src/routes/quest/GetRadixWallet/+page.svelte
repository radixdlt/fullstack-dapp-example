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
      id: 'text1',
      type: 'regular',
      footer: {
        type: 'navigation'
      }
    },
    {
      id: 'text2',
      type: 'regular',
      footer: {
        type: 'navigation'
      }
    },
    {
      id: 'text3',
      type: 'regular',
      footer: {
        type: 'navigation'
      }
    },
    {
      id: 'text4',
      type: 'regular',
      footer: {
        type: 'navigation'
      }
    },
    {
      id: 'text5',
      type: 'regular',
      footer: {
        type: 'navigation'
      }
    },
    {
      id: 'text6',
      type: 'regular',
      footer: {
        type: 'navigation'
      }
    },
    {
      id: 'text7',
      type: 'regular',
      footer: {
        type: 'navigation'
      }
    },
    {
      id: 'text8',
      type: 'regular',
      footer: {
        type: 'navigation'
      }
    },
    {
      id: 'text9',
      type: 'regular',
      footer: {
        type: 'navigation'
      }
    },
    {
      id: 'text10',
      type: 'regular',
      footer: {
        type: 'navigation'
      }
    },

    {
      id: 'complete',
      type: 'jetty',
      dialogs: 1
    }
  ]}
  let:render
>
  {#if render('text1')}
    {@html data.text['0.md']}
  {/if}

  {#if render('text2')}
    {@html data.text['1.md']}
  {/if}

  {#if render('text3')}
    {@html data.text['2.md']}
  {/if}

  {#if render('text4')}
    {@html data.text['3.md']}
  {/if}

  {#if render('text5')}
    {@html data.text['4.md']}
  {/if}

  {#if render('text6')}
    {@html data.text['5.md']}
  {/if}

  {#if render('text7')}
    {@html data.text['6.md']}
  {/if}

  {#if render('text8')}
    {@html data.text['7.md']}
  {/if}

  {#if render('text9')}
    {@html data.text['8.md']}
  {/if}

  {#if render('text10')}
    {@html data.text['9.md']}
  {/if}

  <svelte:fragment slot="jetty" let:render let:Button let:completeQuest>
    {#if render('complete')}
      {@html data.text['10.md']}

      <Button on:click={completeQuest}>Complete</Button>
    {/if}
  </svelte:fragment>
</Quest>
