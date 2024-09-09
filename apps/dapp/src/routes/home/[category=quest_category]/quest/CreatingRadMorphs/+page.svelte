<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import type { LayoutData } from '../$types'
  import Quest from '../Quest.svelte'
  import Error from '$lib/components/error/Error.svelte'
  import { webSocketClient, type WebSocketClient } from '$lib/websocket-client'
  import { messageApi } from '$lib/api/message-api'
  import { pushNotification } from '$lib/notifications'

  import type { Quests } from 'content'
  import { writable } from 'svelte/store'
  import { onDestroy } from 'svelte'
  export let data: LayoutData

  let quest: Quest
  let error: boolean
  const isOpenGiftBoxCompleted = writable(data.requirements?.OpenGiftBox.isComplete)
  const isRadgemsClaimedCompleted = writable(data.requirements?.RadGemsClaimed.isComplete)
  const isRadMorphCreatedCompleted = writable(data.requirements?.RadMorphCreated.isComplete)

  const text = data.text as Quests['CreatingRadMorphs']['text']

  let unsubscribeWebSocket: ReturnType<WebSocketClient['onMessage']> | undefined
  $: if ($webSocketClient) {
    unsubscribeWebSocket = $webSocketClient.onMessage((message) => {
      if (message.type === 'QuestRequirementCompleted') {
        switch (message.requirementId) {
          case 'OpenGiftBox':
            isOpenGiftBoxCompleted.set(true)
            quest.actions.goToStep('6')
            break

          case 'RadGemsClaimed':
            isRadgemsClaimedCompleted.set(true)
            quest.actions.goToStep('10')
            break

          case 'RadMorphCreated':
            isRadMorphCreatedCompleted.set(true)
            quest.actions.goToStep('15')
            break

          default:
            break
        }

        messageApi.markAsSeen(message.id)
      }
    })
  }

  onDestroy(() => unsubscribeWebSocket?.())
</script>

<Quest
  bind:this={quest}
  {...data.questProps}
  on:completed={() => {
    //@ts-ignore
    dataLayer.push({ event: 'dl_click_5_basic_complete' })
    pushNotification('basicQuestsComplete')
  }}
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
      type: 'jetty'
    },
    {
      id: '5',
      type: 'jetty',
      footer: {
        next: {
          enabled: isOpenGiftBoxCompleted
        }
      }
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
      type: 'jetty',
      footer: {
        next: {
          enabled: isRadgemsClaimedCompleted
        }
      }
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
          enabled: isRadMorphCreatedCompleted
        }
      }
    },
    {
      id: '15',
      type: 'jetty'
    },
    {
      id: '16',
      type: 'jetty'
    },
    {
      id: '17',
      type: 'jetty'
    },
    {
      type: 'requirements'
    },
    {
      type: 'claimRewards'
    },
    {
      id: 'complete0',
      type: 'jetty'
    },
    {
      id: 'complete1',
      type: 'jetty'
    },
    {
      id: 'complete2',
      type: 'jetty'
    },
    {
      id: 'complete3',
      type: 'jetty'
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
  {#if render('17')}
    {@html text['17.md']}
  {/if}
  {#if render('complete0')}
    {@html text['complete0.md']}
  {/if}
  {#if render('complete1')}
    {@html text['complete1.md']}
  {/if}
  {#if render('complete2')}
    {@html text['complete2.md']}
  {/if}
  {#if render('complete3')}
    {@html text['complete3.md']}
  {/if}

  {#if error}
    <Error>{$i18n.t('quests:somethingWentWrong')}</Error>
  {/if}
</Quest>
