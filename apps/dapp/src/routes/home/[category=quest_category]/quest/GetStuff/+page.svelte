<script lang="ts">
  import Quest from '../Quest.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { onDestroy } from 'svelte'
  import type { PageData } from './$types'
  import { derived, writable } from 'svelte/store'
  import type { Quests } from 'content'
  import { type ComponentProps } from 'svelte'
  import { userApi } from '$lib/api/user-api'
  import { user } from '../../../../../stores'
  import Button from '$lib/components/button/Button.svelte'
  import { messageApi } from '$lib/api/message-api'
  import { webSocketClient, type WebSocketClient } from '$lib/websocket-client'
  import { waitingWarning } from '$lib/utils/waiting-warning'
  import GetXrdMethodOptions from './GetXrdMethodOptions.svelte'
  import { completeRequirement } from '$lib/helpers/complete-requirement.svelte'
  import CopyTextBox from '$lib/components/copy-text-box/CopyTextBox.svelte'
  import { shortenAddress } from '$lib/utils/shorten-address'
  import { hasEnoughXrd } from '$lib/utils/has-enough-xrd'
  import { useCookies } from '$lib/utils/cookies'

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

  const hasGoldenTicket = writable(false)
  const hasInvalidGoldenTicket = writable(false)

  $: if ($user?.goldenTicketClaimed?.status === 'CLAIMED') $hasGoldenTicket = true
  $: if (
    $user?.goldenTicketClaimed?.status === 'CLAIMED_INVALID' ||
    (!$user?.goldenTicketClaimed && useCookies('golden-ticket').get())
  )
    $hasInvalidGoldenTicket = true

  let checkXrdInterval: ReturnType<typeof setInterval> | undefined

  let selectedGetXrdMethod: ComponentProps<GetXrdMethodOptions>['selectedOption'] = 'card'

  $: address = $user?.accountAddress
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
      id: '0',
      type: 'jetty'
    },
    {
      id: '1',
      type: 'jetty'
    },
    {
      id: '2',
      type: 'regular'
    },
    {
      id: '3',
      type: 'regular'
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
      type: 'regular'
    },
    {
      id: 'golden-ticket-valid',
      type: 'jetty',
      skip: derived(
        [hasGoldenTicket, skipXrdDepositPage],
        ([$hasGoldenTicket, $skipXrdDepositPage]) => !$hasGoldenTicket || $skipXrdDepositPage
      ),
      footer: {
        next: {
          enabled: skipXrdDepositPage
        }
      }
    },
    {
      id: 'golden-ticket-invalid',
      skip: derived(hasInvalidGoldenTicket, ($hasInvalidGoldenTicket) => !$hasInvalidGoldenTicket),
      type: 'jetty'
    },
    {
      id: 'has-xrd',
      type: 'jetty',
      skip: derived(
        [hasXrd, hasGoldenTicket, hasInvalidGoldenTicket],
        ([$hasXrd, $hasGoldenTicket, $hasInvalidGoldenTicket]) =>
          !$hasXrd || $hasGoldenTicket || $hasInvalidGoldenTicket
      )
    },
    {
      id: 'need-xrd',
      type: 'jetty',
      skip: hasXrd
    },
    {
      id: 'need-xrd-2',
      type: 'jetty',
      skip: hasXrd
    },
    {
      id: 'need-xrd-3',
      type: 'regular',
      skip: hasXrd
    },
    {
      id: 'get-xrd',
      type: 'regular',
      skip: hasXrd,
      footer: {
        next: {
          enabled: hasXrd
        }
      }
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
      id: '13',
      type: 'jetty'
    },
    {
      id: '14',
      type: 'jetty'
    },
    {
      id: '15',
      type: 'jetty'
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

  {#if render('need-xrd')}
    {@html text['8-NEEDXRD.md']}
  {/if}

  {#if render('need-xrd-2')}
    {@html text['8-NEEDXRD-1.md']}
  {/if}

  {#if render('need-xrd-3')}
    {@html text['8-NEEDXRD-2.md']}

    <GetXrdMethodOptions bind:selectedOption={selectedGetXrdMethod} />
  {/if}

  {#if render('get-xrd')}
    {#if selectedGetXrdMethod === 'card'}
      {@html text['8-NEEDXRD-3.md']}
      {#if address}
        <CopyTextBox text={shortenAddress(address)} value={address} />
      {/if}
      {@html text['8-NEEDXRD-3a.md']}
      <div class="center">
        <Button
          link={'https://ramp.alchemypay.org/?appId=qjpmy9BwBPRGBneF&crypto=XRD#/index'}
          isExternal
        >
          {$i18n.t('quests:GetStuff.buyXRDButton')}
        </Button>
      </div>
      {@html text['8-NEEDXRD-3b.md']}
    {:else if selectedGetXrdMethod === 'exchange'}
      {@html text['8-NEEDXRD-4.md']}
      <div class="center">
        <Button isExternal link="https://www.radixdlt.com/token#exchanges">
          {$i18n.t('quests:GetStuff.viewExchangesButton')}
        </Button>
      </div>
      {@html text['8-NEEDXRD-4a.md']}
    {:else if selectedGetXrdMethod === 'thorswap'}
      {@html text['8-NEEDXRD-5.md']}
      {#if address}
        <CopyTextBox text={shortenAddress(address)} value={address} />
      {/if}
      {@html text['8-NEEDXRD-5a.md']}
      <div class="center">
        <Button
          link={'https://app.thorswap.finance/swap/ETH.ETH_XRD.XRD?sellAmount=0.001'}
          isExternal
        >
          {$i18n.t('quests:GetStuff.goToThorSwap')}
        </Button>
      </div>
      {@html text['8-NEEDXRD-5b.md']}
    {/if}
  {/if}

  {#if render('9')}
    {@html text['9.md']}
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

<style lang="scss">
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
