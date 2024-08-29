<script lang="ts">
  import Quest from '../Quest.svelte'
  import { okAsync } from 'neverthrow'
  import { onMount, onDestroy } from 'svelte'
  import type { PageData } from './$types'
  import { writable } from 'svelte/store'
  import type { Quests } from 'content'
  import { gatewayApi, publicConfig } from '$lib/public-config'
  import { userApi } from '$lib/api/user-api'
  import { user } from '../../../../../stores'
  import { ResultAsync } from 'neverthrow'
  import { messageApi } from '$lib/api/message-api'
  import { webSocketClient, type WebSocketClient } from '$lib/websocket-client'
  import { waitingWarning } from '$lib/utils/waiting-warning'
  import { questApi } from '$lib/api/quest-api'

  export let data: PageData

  const text = data.text as Quests['GetStuff']['text']

  let quest: Quest
  let xrdDepositLoading = false

  let unsubscribeWebSocket: ReturnType<WebSocketClient['onMessage']> | undefined

  const skipXrdDepositPage = writable<boolean>(false)

  $: if ($webSocketClient) {
    unsubscribeWebSocket = $webSocketClient.onMessage(async (message) => {
      if (message.type === 'XrdDepositedToAccount') {
        xrdDepositLoading = false
        messageApi.markAsSeen(message.id)
        skipXrdDepositPage.set(true)
      }
    })
  }

  onMount(() => {
    userApi.hasReceivedXrd().andThen((received) => {
      if (received) {
        skipXrdDepositPage.set(true)
        return okAsync(undefined)
      }

      if ($user?.accountAddress) {
        return ResultAsync.combine([
          gatewayApi
            .isDepositDisabledForResource($user.accountAddress, publicConfig.xrd)
            .map((disabled) => {
              if (disabled) {
                skipXrdDepositPage.set(true)
              }
            })
        ])
      }

      return okAsync(undefined)
    })
  })

  onDestroy(() => {
    unsubscribeWebSocket?.()
    waitingWarning(false)
  })

  $: waitingWarning(xrdDepositLoading)

  const onReceiveXRDPage = async () => {
    xrdDepositLoading = true
    if (!$skipXrdDepositPage) {
      const receivedResult = await userApi.hasReceivedXrd()
      xrdDepositLoading = false

      if (receivedResult.isErr()) return

      const received = receivedResult.value

      skipXrdDepositPage.set(received)
    }
  }
</script>

<Quest
  on:render={(ev) => {
    if (ev.detail === '15') {
      onReceiveXRDPage()
    }
  }}
  {...data.questProps}
  bind:this={quest}
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
      id: '4',
      type: 'regular'
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
      type: 'regular'
    },
    {
      id: '8',
      type: 'regular'
    },
    {
      id: '9',
      type: 'jetty'
    },
    {
      id: '10',
      type: 'regular'
    },
    {
      id: '11',
      type: 'regular'
    },
    {
      id: '12',
      type: 'jetty'
    },
    {
      id: '13',
      type: 'regular'
    },
    {
      id: '14',
      type: 'regular'
    },
    {
      id: '15',
      type: 'jetty',
      skip: skipXrdDepositPage,
      footer: {
        next: {
          onClick: (next) => {
            questApi
              .completeRequirement('GetStuff', 'GetReadyToDoTransactionsOnRadix', fetch)
              .map(() => {
                next()
              })
          },
          enabled: writable(true) // TODO change when implementing new quest flows
        }
      }
    },
    { type: 'requirements' },
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
</Quest>
