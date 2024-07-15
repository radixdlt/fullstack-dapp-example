<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import type { LayoutData } from '../$types'
  import Quest from '../Quest.svelte'
  import Error from '$lib/components/error/Error.svelte'

  import type { Quests } from 'content'
  import { writable } from 'svelte/store'
  import { WebSocketClient, webSocketClient } from '$lib/websocket-client'
  import { onDestroy } from 'svelte'

  export let data: LayoutData

  let quest: Quest
  let error: boolean

  const text = data.text as Quests['CreatingRadMorphs']['text']

  const starterGiftBoxOpened = writable(data.requirements.GiftBoxOpened.isComplete)
  const hadTwoRadgems = writable(data.requirements.MintRadgems.isComplete)
  const checkedOutRadMorphs = writable(data.requirements.CheckOutRadMorph.isComplete)

  let unsubscribeWebSocket: ReturnType<WebSocketClient['onMessage']> | undefined
  $: if ($webSocketClient) {
    unsubscribeWebSocket = $webSocketClient.onMessage(async (message) => {
      console.log(message)
      if (message.type === 'QuestRequirementCompleted' && message.questId === 'CreatingRadMorphs') {
        if (message.requirementId === 'GiftBoxOpened') {
          starterGiftBoxOpened.set(true)
        } else if (message.requirementId === 'CheckOutRadMorph') {
          checkedOutRadMorphs.set(true)
        } else if (message.requirementId === 'MintRadgems') {
          hadTwoRadgems.set(true)
        }
      }
    })
  }

  onDestroy(() => unsubscribeWebSocket?.())
</script>

<Quest
  bind:this={quest}
  id={data.id}
  requirements={data.requirements}
  steps={[
    {
      id: '0',
      type: 'jetty'
    },
    {
      id: '1',
      type: 'jetty'
    },
    {
      id: '2',
      type: 'jetty'
    },
    {
      id: '3',
      type: 'jetty'
    },
    {
      id: '4',
      type: 'jetty',
      footer: {
        next: {
          enabled: starterGiftBoxOpened
        }
      }
    },
    {
      id: '5',
      type: 'jetty'
    },
    {
      id: '6',
      type: 'jetty'
    },
    {
      id: '7',
      type: 'jetty'
    },
    {
      id: '8',
      type: 'jetty'
    },
    {
      id: '9',
      type: 'jetty'
    },
    {
      id: '10',
      type: 'jetty'
    },
    {
      id: '11',
      type: 'jetty'
    },
    {
      id: '12',
      type: 'jetty'
    },
    {
      id: '13',
      type: 'jetty'
    },
    {
      id: '14',
      type: 'jetty',
      footer: {
        next: {
          enabled: hadTwoRadgems
        }
      }
    },
    {
      id: '15',
      type: 'jetty'
    },
    {
      id: '16',
      type: 'jetty',
      footer: {
        next: {
          enabled: checkedOutRadMorphs
        }
      }
    },
    {
      type: 'claimRewards'
    },
    {
      type: 'complete'
    }
  ]}
  let:render
>
  {#if render('0')}
    {@html text['0.md']}
  {/if}
  {#if render('1')}
    {@html text['1.md']}
  {/if}
  {#if render('2')}
    {@html text['2.md']}
  {/if}
  {#if render('3')}
    {@html text['3.md']}
  {/if}
  {#if render('4')}
    {@html text['4.md']}
  {/if}
  {#if render('5')}
    {@html text['5.md']}
  {/if}
  {#if render('6')}
    {@html text['6.md']}
  {/if}
  {#if render('7')}
    {@html text['7.md']}
  {/if}
  {#if render('8')}
    {@html text['8.md']}
  {/if}
  {#if render('9')}
    {@html text['9.md']}
  {/if}
  {#if render('10')}
    {@html text['10.md']}
  {/if}
  {#if render('11')}
    {@html text['11.md']}
  {/if}
  {#if render('12')}
    {@html text['12.md']}
  {/if}
  {#if render('13')}
    {@html text['13.md']}
  {/if}
  {#if render('14')}
    {@html text['14.md']}
  {/if}
  {#if render('15')}
    {@html text['15.md']}
  {/if}
  {#if render('16')}
    {@html text['16.md']}
  {/if}

  {#if error}
    <Error>{$i18n.t('quests:somethingWentWrong')}</Error>
  {/if}
</Quest>
