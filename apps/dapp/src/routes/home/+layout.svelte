<script lang="ts">
  import '../../global.scss'
  import { onMount, onDestroy } from 'svelte'
  import {
    DataRequestBuilder,
    RadixDappToolkit,
    Logger,
    isMobile
  } from '@radixdlt/radix-dapp-toolkit'
  import { authApi } from '$lib/api/auth-api'
  import { userApi } from '$lib/api/user-api'
  import { ResultAsync } from 'neverthrow'
  import { publicConfig } from '$lib/public-config'
  import { goto, invalidateAll } from '$app/navigation'
  import { ErrorPopupId, errorPopupStore, hasHeroBadge, quests, user } from '../../stores'
  import Header from '$lib/components/header/Header.svelte'
  import Layout from '$lib/components/layout/Layout.svelte'
  import Tabs from '$lib/components/tabs/Tabs.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { resolveRDT } from '$lib/rdt'
  import { webSocketClient, WebSocketClient } from '$lib/websocket-client'
  import { questApi } from '$lib/api/quest-api'
  import { QuestCategory, type QuestId } from 'content'
  import { useLocalStorage } from '$lib/utils/local-storage'
  import LandingPopup from './LandingPopup.svelte'
  import { page } from '$app/stores'
  import type { LayoutData } from './$types'
  import { useCookies } from '$lib/utils/cookies'
  import Jetty from './Jetty.svelte'
  import { loadUnseenNotifications, pushNotification } from '$lib/notifications'
  import Footer from '$lib/components/footer/footer.svelte'
  import ErrorPopup from './ErrorPopup.svelte'
  import { CookieKeys, GatewayApi } from 'common'
  import NetworkCongestedBanner from './NetworkCongestedBanner.svelte'
  import { PUBLIC_NETWORK_ID } from '$env/static/public'
  import GoldenTicketAlert from './GoldenTicketAlert.svelte'

  export let data: LayoutData

  const callbacks: (() => void)[] = []
  $quests = data.questDefinitions
  // TODO: move dApp toolkit to a better location
  let radixDappToolkit: RadixDappToolkit
  const { dAppDefinitionAddress, networkId } = publicConfig

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

    const logger = Logger(1)

    radixDappToolkit = RadixDappToolkit({
      networkId,
      dAppDefinitionAddress: dAppDefinitionAddress ?? '',
      logger,
      onDisconnect: async () => {
        await authApi.logout()

        $webSocketClient?.close()
        $webSocketClient = undefined

        useCookies('jwt').clear()

        Object.entries($quests).forEach(([questId, quest]) => {
          useCookies(`quest-status-${questId as QuestId}`).clear()
          useCookies(`saved-progress-${questId as QuestId}`).clear()
          Object.keys(quest.requirements).forEach((id) => {
            useCookies(`requirement-${questId}-${id}`).clear()
          })
        })
        useLocalStorage('savedProgress').clear()
        useLocalStorage('seen-landing-popup').clear()

        $hasHeroBadge = false

        $user = undefined

        await invalidateAll()
      }
    })

    radixDappToolkit.walletApi.provideChallengeGenerator(async () => {
      const result = await authApi.createChallenge()

      if (result.isErr()) throw new Error('Failed to create challenge')

      return result.value
    })

    radixDappToolkit.walletApi.setRequestData(DataRequestBuilder.persona().withProof())

    radixDappToolkit.walletApi.dataRequestControl(async (data) => {
      const { proofs } = data
      const personaProof = proofs.find((proof) => proof.type === 'persona')
      if (personaProof) {
        const result = await authApi.login(personaProof)

        if (result.isErr()) {
          radixDappToolkit.disconnect()
          throw Error('Failed to login')
        }
      }
    })

    radixDappToolkit.walletApi.walletData$.subscribe(({ persona }) => {
      if (persona?.identityAddress) {
        ResultAsync.combine([userApi.me(), authApi.authToken()])
          .map(async ([me, authToken]) => {
            //@ts-ignore
            dataLayer.push({ event: 'dl_click_4_wallet_connected' })

            if (['PERMANENTLY_BLOCKED', 'TEMPORARILY_BLOCKED'].includes(me.status)) {
              errorPopupStore.set({ id: ErrorPopupId.AccountLocked })
            }

            $user = {
              ...me,
              label: persona.label
            }

            if ($page.url.searchParams.get('t') && !$user.goldenTicketClaimed)
              showGoldenTicketAlert = true

            if (authToken) {
              $webSocketClient = WebSocketClient({ authToken, radixDappToolkit })
            }

            loadUnseenNotifications().mapErr((err) => {
              logger.error('Failed to load notifications', { err })
            })

            await invalidateAll()

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

            if (me.accountAddress) {
              GatewayApi(publicConfig.networkId)
                .hasHeroBadge(me.accountAddress)
                .map((hasBadge) => {
                  if (hasBadge) {
                    $hasHeroBadge = true
                  }
                })
            }
          })
          .mapErr(({ status }) => {
            if (status === 401) radixDappToolkit.disconnect()
          })
      } else {
        authApi.logout()
      }
    })

    resolveRDT(radixDappToolkit)

    const savedProgress = localStorage.getItem('savedProgress')

    if (savedProgress) {
      const { questId, progress } = JSON.parse(savedProgress)
      goto(
        `/home/${data.questDefinitions[questId as QuestId].category}/quest/${questId}#${progress}`
      )
    } else if ($user) {
      questApi.getSavedProgress().map((savedProgress) => {
        if (savedProgress.questId)
          goto(
            `home/${data.questDefinitions[savedProgress.questId as QuestId].category}/quest/${savedProgress.questId}#${savedProgress.progress}`
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
  })

  const registerNotificationOnMessage = (
    webSocketClient: WebSocketClient,
    questId: QuestId,
    requirementId: string,
    notificationName: Parameters<typeof pushNotification>[0]
  ) => {
    callbacks.push(
      webSocketClient.onMessage((message) => {
        if (!$page.url.href.includes(questId)) {
          if (
            message.type === 'QuestRequirementCompleted' &&
            message.requirementId === requirementId
          ) {
            pushNotification(notificationName)
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
      'reachedTierBronze'
    )

  $: if ($webSocketClient)
    registerNotificationOnMessage(
      $webSocketClient,
      'QuestTogether',
      'SilverLevel',
      'reachedTierSilver'
    )

  $: if ($webSocketClient)
    registerNotificationOnMessage($webSocketClient, 'QuestTogether', 'GoldLevel', 'reachedTierGold')

  $: if ($webSocketClient)
    registerNotificationOnMessage(
      $webSocketClient,
      'QuestTogether',
      'SuperLevel',
      'reachedTierSuper'
    )

  if (data.questStatus['TransferTokens']?.status === 'COMPLETED' && $user?.referredByUser) {
    pushNotification('joinedFriend')
  }

  let showGoldenTicketAlert = false
</script>

<LandingPopup definitions={data.landingPopupDefinitions} />
<ErrorPopup />
<Jetty />

<Layout>
  <Header slot="header" />

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

{#if PUBLIC_NETWORK_ID === '1'}
  <NetworkCongestedBanner />
{/if}

{#if showGoldenTicketAlert}
  <GoldenTicketAlert />
{/if}
