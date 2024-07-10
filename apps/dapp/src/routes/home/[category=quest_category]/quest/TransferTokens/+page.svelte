<script lang="ts">
  import { Addresses } from 'common'
  import Quest from '../Quest.svelte'
  import type { PageData } from './$types'
  import { PUBLIC_NETWORK_ID } from '$env/static/public'
  import { onDestroy } from 'svelte'
  import { isMobile } from '$lib/utils/is-mobile'
  import CopyTextBox from '$lib/components/copy-text-box/CopyTextBox.svelte'
  import QR from '@svelte-put/qr/svg/QR.svelte'
  import { shortenAddress } from '$lib/utils/shorten-address'
  import { writable } from 'svelte/store'
  import type { Quests } from 'content'
  import { messageApi } from '$lib/api/message-api'
  import { webSocketClient, type WebSocketClient } from '$lib/websocket-client'

  export let data: PageData

  const text = data.text as Quests['TransferTokens']['text']

  let quest: Quest

  let receivedClams = writable(data.requirements?.JettyReceivedClams.isComplete)

  let unsubscribeWebSocket: ReturnType<WebSocketClient['onMessage']> | undefined
  $: if ($webSocketClient) {
    unsubscribeWebSocket = $webSocketClient.onMessage((message) => {
      if (
        message.type === 'QuestRequirementCompleted' &&
        message.requirementId === 'JettyReceivedClams'
      ) {
        quest.actions.next()
        $receivedClams = true
        messageApi.markAsSeen(message.id)
      }
    })
  }

  onDestroy(() => unsubscribeWebSocket?.())
</script>

<Quest
  id={data.id}
  requirements={data.requirements}
  bind:this={quest}
  steps={[
    {
      id: '0',
      type: 'regular'
    },
    {
      id: '1',
      type: 'regular'
    },
    {
      id: '2',
      type: 'regular'
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
      type: 'regular'
    },
    {
      id: '6',
      type: 'regular',
      skip: receivedClams,
      footer: {
        next: {
          enabled: receivedClams
        }
      }
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
      type: 'jettyQuiz',

      text: text['10.md'],
      quizRequirement: 'PersonaQuiz',

      answers: [
        {
          text: text['10a-answer.md'],
          info: text['10a-result.md'],
          correct: true
        },
        {
          text: text['10b-answer.md'],
          info: text['10b-result.md'],
          correct: false
        },
        {
          text: text['10c-answer.md'],
          info: text['10c-result.md'],
          correct: false
        }
      ]
    },
    {
      id: '11',
      type: 'jettyQuiz',
      text: text['11.md'],
      quizRequirement: 'TransactionQuiz',
      answers: [
        {
          text: text['11a-answer.md'],
          info: text['11a-result.md'],
          correct: false
        },
        {
          text: text['11b-answer.md'],
          info: text['11b-result.md'],
          correct: true
        },
        {
          text: text['11c-answer.md'],
          info: text['11c-result.md'],
          correct: false
        }
      ]
    },
    {
      id: '12',
      type: 'jettyQuiz',
      text: text['12.md'],
      quizRequirement: 'XrdQuiz',
      answers: [
        {
          text: text['12a-answer.md'],
          info: text['12a-result.md'],
          correct: true
        },
        {
          text: text['12b-answer.md'],
          info: text['12b-result.md'],
          correct: false
        },
        {
          text: text['12c-answer.md'],
          info: text['12c-result.md'],
          correct: false
        }
      ]
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
    {@const jettyAddress = Addresses(parseInt(PUBLIC_NETWORK_ID)).accounts.jetty}

    {#if isMobile()}
      {@html text['6b.md']}
      <div class="copy-address">
        <CopyTextBox text={shortenAddress(jettyAddress.address)} value={jettyAddress.address} />
      </div>
    {:else}
      {@html text['6a.md']}
      <div class="qr-code">
        <QR data={jettyAddress.address} />
      </div>
    {/if}
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
</Quest>

<style>
  .qr-code {
    width: 15rem;
    height: 15rem;
  }

  .copy-address {
    max-width: 20rem;
  }
</style>
