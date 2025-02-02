<script lang="ts">
  import Quest from '../Quest.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { onDestroy } from 'svelte'
  import type { PageData } from './$types'
  import { derived, writable } from 'svelte/store'
  import type { Quests } from 'content'
  import { userApi } from '$lib/api/user-api'
  import { user } from '../../../../../stores'
  import Button from '$lib/components/button/Button.svelte'
  import { messageApi } from '$lib/api/message-api'
  import { webSocketClient, type WebSocketClient } from '$lib/websocket-client'
  import { waitingWarning } from '$lib/utils/waiting-warning'
  import { completeRequirement } from '$lib/helpers/complete-requirement.svelte'
  import { hasEnoughXrd } from '$lib/utils/has-enough-xrd'


  export let data: PageData

  const text = data.text as Quests['GetStuff']['text']

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

  const directDepositXrd = () => {
    xrdDepositLoading = true
    userApi
      .directDepositXrd()
      .mapErr(() => {
        xrdDepositLoading = false
      })
      .andThen(() => completeRequirement(data.id, 'GetXRD'))
  }

  onDestroy(() => {
    unsubscribeWebSocket?.()
    waitingWarning(false)

    if (checkXrdInterval) clearInterval(checkXrdInterval)
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

  const hasXrd = writable(false)

  const checkHasEnoughXrd = () => {
    hasEnoughXrd().map((value) => {
      $hasXrd = value
    })
  }
  $: if ($user?.accountAddress) {
    checkHasEnoughXrd()
  }

  $: if ($hasXrd && !data.requirements['GetXRD'].isComplete) completeRequirement(data.id, 'GetXRD')

  let checkXrdInterval: ReturnType<typeof setInterval> | undefined

</script>

<Quest
  on:render={(ev) => {
    if (ev.detail === 'golden-ticket-valid') {
      onReceiveXRDPage()
    } else {
      waitingWarning(false)
    }

    if (ev.detail === '6' || ev.detail.includes('need-xrd')) {
      checkHasEnoughXrd()
    }

    if (ev.detail === 'get-xrd') {
      checkXrdInterval = setInterval(() => {
        checkHasEnoughXrd()
      }, 3_000)
    } else {
      clearInterval(checkXrdInterval)
    }
  }}
  {...data.questProps}
  steps={[
    {
      id: 'golden-ticket-valid',
      type: 'jetty',
      skip: derived([skipXrdDepositPage], ([$skipXrdDepositPage]) => $skipXrdDepositPage),
      footer: {
        next: {
          enabled: skipXrdDepositPage
        }
      }
    },
    {
      id: 'has-xrd',
      type: 'jetty',
      skip: derived([hasXrd], ([$hasXrd]) => !$hasXrd)
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
  {#if render('golden-ticket-valid')}
    {@html text['8-GOLDEN.md']}

    <div class="center">
      <Button on:click={directDepositXrd} loading={xrdDepositLoading} disabled={xrdDepositLoading}>
        {$i18n.t('quests:GetStuff.getXrd')}
      </Button>
    </div>
  {/if}

  {#if render('golden-ticket-invalid')}
    {@html text['7.md']}
  {/if}

  {#if render('has-xrd')}
    {@html text['8-HASXRD.md']}
  {/if}
</Quest>

<style lang="scss">
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
