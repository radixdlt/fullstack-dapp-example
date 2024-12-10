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
  let render: (id: string) => boolean

  let unsubscribeWebSocket: ReturnType<WebSocketClient['onMessage']> | undefined
  $: if ($webSocketClient) {
    unsubscribeWebSocket = $webSocketClient.onMessage((message) => {
      if (message.type === 'QuestRequirementCompleted') {
        switch (message.requirementId) {
          case 'OpenGiftBox':
            $isOpenGiftBoxCompleted = true
            if (quest && render('5')) quest.actions.next()
            break

          case 'RadGemsClaimed':
            $isRadgemsClaimedCompleted = true
            if (quest && render('9')) quest.actions.next()
            break

          case 'RadMorphCreated':
            $isRadMorphCreatedCompleted = true
            if (quest && render('14')) quest.actions.next()
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
  bind:render
  {...data.questProps}
  on:completed={() => {
    pushNotification('basicQuestsComplete')
  }}
  steps={[
    {
      id: '5',
      type: 'regular',
      footer: {
        next: {
          enabled: isOpenGiftBoxCompleted
        }
      }
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
      id: '14',
      type: 'jetty',
      footer: {
        next: {
          enabled: isRadMorphCreatedCompleted
        }
      }
    },
    {
      type: 'requirements'
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
  {#if render('5')}
    {@html text['5.md']}
  {/if}
  {#if render('9')}
    {@html text['9.md']}
  {/if}
  {#if render('14')}
    {@html text['14.md']}
  {/if}

  {#if error}
    <Error>{$i18n.t('quests:somethingWentWrong')}</Error>
  {/if}
</Quest>
