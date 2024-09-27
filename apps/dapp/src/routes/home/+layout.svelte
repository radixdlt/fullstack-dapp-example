<script lang="ts">
  import '../../global.scss'
  import { onMount, onDestroy, tick } from 'svelte'
  import { Logger, isMobile } from '@radixdlt/radix-dapp-toolkit'
  import { goto } from '$app/navigation'
  import { quests, user } from '../../stores'
  import Layout from '$lib/components/layout/Layout.svelte'
  import Tabs from '$lib/components/tabs/Tabs.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { webSocketClient, WebSocketClient } from '$lib/websocket-client'
  import { questApi } from '$lib/api/quest-api'
  import { loadQuests, QuestCategory, type QuestId } from 'content'
  import LandingPopup from './LandingPopup.svelte'
  import { page } from '$app/stores'
  import type { LayoutData } from './$types'
  import { useCookies } from '$lib/utils/cookies'
  import Jetty from './Jetty.svelte'
  import {
    hasSeenNotification,
    loadUnseenNotifications,
    pushNotification
  } from '$lib/notifications'
  import Footer from '$lib/components/footer/footer.svelte'
  import ErrorPopup from './ErrorPopup.svelte'
  import { CookieKeys } from 'common'
  import GoldenTicketAlert from './GoldenTicketAlert.svelte'
  import { messageApi } from '$lib/api/message-api'
  import { hasEnoughXrd } from '$lib/utils/has-enough-xrd'

  export let data: LayoutData

  const callbacks: (() => void)[] = []
  $quests = data.questDefinitions
  $: tick().then(() => ($quests = loadQuests('en', $user?.goldenTicketClaimed?.type)))

  const logger = Logger(1)

  const setGetWalletRequirementInStore = () => {
    // @ts-ignore
    useCookies('requirement-SetupWallet-ConnectWallet').set(true)
    // @ts-ignore
    useCookies('requirement-SetupWallet-DownloadWallet').set(true)
  }

  onMount(() => {
    import('@lottiefiles/lottie-player')

    if (isMobile() && $page.url.searchParams.get('wallet') === 'true') {
      setGetWalletRequirementInStore()
    }

    const savedProgress = localStorage.getItem('savedProgress')

    if (savedProgress) {
      const { questId, progress } = JSON.parse(savedProgress)
      goto(`/home/${$quests[questId as QuestId].category}/quest/${questId}#${progress}`)
    } else if ($user) {
      questApi.getSavedProgress().map((savedProgress) => {
        if (savedProgress.questId)
          goto(
            `home/${$quests[savedProgress.questId as QuestId].category}/quest/${savedProgress.questId}#${savedProgress.progress}`
          )
      })
    }

    const goldenTicket = $page.url.searchParams.get('t')

    if (goldenTicket) useCookies(CookieKeys.GoldenTicket).set(goldenTicket)
  })

  onDestroy(() => {
    callbacks.forEach((cb) => {
      cb()
    })
    clearXrdInterval()
  })

  const registerNotificationOnMessage = (
    webSocketClient: WebSocketClient,
    questId: QuestId,
    requirementId: string,
    notificationName: Parameters<typeof pushNotification>[0],
    markAsSeen = false
  ) => {
    callbacks.push(
      webSocketClient.onMessage((message) => {
        if (!$page.url.href.includes(questId)) {
          if (
            message.type === 'QuestRequirementCompleted' &&
            message.requirementId === requirementId
          ) {
            pushNotification(notificationName)
            if (markAsSeen) messageApi.markAsSeen(message.id)
          }
        }
      })
    )
  }

  $: if ($webSocketClient)
    registerNotificationOnMessage(
      $webSocketClient,
      'TransferTokens',
      'JettyReceivedClams',
      'clamsReceived'
    )

  $: if ($webSocketClient)
    registerNotificationOnMessage($webSocketClient, 'DEXSwaps', 'JettySwap', 'jettySwapCompleted')

  $: if ($webSocketClient)
    registerNotificationOnMessage($webSocketClient, 'DEXSwaps', 'LettySwap', 'lettySwapCompleted')

  $: if ($webSocketClient)
    registerNotificationOnMessage($webSocketClient, 'NetworkStaking', 'XrdStaked', 'stakeCompleted')

  $: if ($webSocketClient)
    registerNotificationOnMessage(
      $webSocketClient,
      'Thorswap',
      'MayaRouterWithdrawEvent',
      'thorswapSwapCompleted'
    )

  $: if ($webSocketClient)
    registerNotificationOnMessage(
      $webSocketClient,
      'QuestTogether',
      'BronzeLevel',
      'reachedTierBronze',
      true
    )

  $: if ($webSocketClient)
    registerNotificationOnMessage(
      $webSocketClient,
      'QuestTogether',
      'SilverLevel',
      'reachedTierSilver',
      true
    )

  $: if ($webSocketClient)
    registerNotificationOnMessage($webSocketClient, 'QuestTogether', 'GoldLevel', 'reachedTierGold')

  $: if ($webSocketClient)
    registerNotificationOnMessage(
      $webSocketClient,
      'QuestTogether',
      'SuperLevel',
      'reachedTierSuper',
      true
    )

  if (data.questStatus['TransferTokens']?.status === 'COMPLETED' && $user?.referredByUser) {
    pushNotification('joinedFriend')
  }

  let checkXrdInterval: ReturnType<typeof setInterval> | undefined

  const pollXrd = () => {
    if (checkXrdInterval) return
    hasSeenNotification('notEnoughXrd').map((seen) => {
      if (!seen) {
        checkXrdInterval = setInterval(() => {
          hasEnoughXrd().map((enough) => {
            if (!enough) {
              pushNotification('notEnoughXrd')
              clearInterval(checkXrdInterval)
            }
          })
        }, 10_000)
      }
    })
  }

  const clearXrdInterval = () => {
    if (checkXrdInterval) {
      clearInterval(checkXrdInterval)
      checkXrdInterval = undefined
    }
  }

  $: if ($user?.accountAddress && data.questStatus['GetStuff']?.status === 'COMPLETED') {
    pollXrd()
  }

  $: if (!$user?.accountAddress) {
    clearXrdInterval()
  }

  let showGoldenTicketAlert = false

  $: if ($user) {
    const ticket = $page.url.searchParams.get('t')
    if (ticket && !$user.goldenTicketClaimed) showGoldenTicketAlert = true

    loadUnseenNotifications().mapErr((err) => {
      logger.error('Failed to load notifications', { err })
    })

    if (
      data.questStatus['SetupWallet']?.status === 'IN_PROGRESS' &&
      !$page.url.href.includes('SetupWallet')
    ) {
      pushNotification('loggedIn')
    }

    if (
      data.questStatus['TransferTokens']?.status === 'IN_PROGRESS' &&
      !$page.url.href.includes('TransferTokens')
    ) {
      questApi
        .getQuestInformation('TransferTokens', fetch)
        .map((data) => data.requirements)
        .map((requirements) => {
          if (requirements.JettyReceivedClams.isComplete) {
            pushNotification('clamsReceived')
          }
        })
    }

    if (
      data.questStatus['DEXSwaps']?.status === 'IN_PROGRESS' &&
      !$page.url.href.includes('DEXSwaps')
    ) {
      questApi
        .getQuestInformation('DEXSwaps', fetch)
        .map((data) => data.requirements)
        .map((requirements) => {
          if (requirements.JettySwap.isComplete) {
            pushNotification('jettySwapCompleted')
          }

          if (requirements.LettySwap.isComplete) {
            pushNotification('lettySwapCompleted')
          }
        })
    }

    if (
      data.questStatus['NetworkStaking']?.status === 'IN_PROGRESS' &&
      !$page.url.href.includes('NetworkStaking')
    ) {
      questApi
        .getQuestInformation('NetworkStaking', fetch)
        .map((data) => data.requirements)
        .map((requirements) => {
          if (requirements.XrdStaked.isComplete) {
            pushNotification('stakeCompleted')
          }
        })
    }

    if (
      data.questStatus['Thorswap']?.status === 'IN_PROGRESS' &&
      !$page.url.href.includes('Thorswap')
    ) {
      questApi
        .getQuestInformation('Thorswap', fetch)
        .map((data) => data.requirements)
        .map((requirements) => {
          if (requirements.MayaRouterWithdrawEvent.isComplete) {
            pushNotification('thorswapSwapCompleted')
          }
        })
    }

    questApi.getQuestInformation('QuestTogether').map((data) => {
      if ($page.url.href.includes('QuestTogether')) return

      if (data.requirements.BronzeLevel.isComplete) {
        pushNotification('reachedTierBronze')
      }

      if (data.requirements.SilverLevel.isComplete) {
        pushNotification('reachedTierSilver')
      }

      if (data.requirements.GoldLevel.isComplete) {
        pushNotification('reachedTierGold')
      }

      if (data.requirements.SuperLevel.isComplete) {
        pushNotification('reachedTierSuper')
      }
    })
  }
</script>

<LandingPopup definitions={data.landingPopupDefinitions} />
<ErrorPopup />
<Jetty />

<Layout>
  <Tabs
    slot="tabs"
    tabs={[
      { name: $i18n.t('main:tabs-basics'), id: QuestCategory.Basic },
      { name: $i18n.t('main:tabs-advanced'), id: QuestCategory.Advanced }
    ]}
    activeTab={$page.params.category}
    on:tab-changed={(e) => {
      goto(`/home/${e.detail.toLowerCase()}`)
    }}
  />

  <svelte:fragment slot="quests">
    <slot />
  </svelte:fragment>

  <Footer slot="footer" userId={$user?.id} />
</Layout>

{#if showGoldenTicketAlert}
  <GoldenTicketAlert />
{/if}
