<script lang="ts">
  import '../global.scss'
  import { onMount } from 'svelte'
  import { DataRequestBuilder, RadixDappToolkit, Logger } from '@radixdlt/radix-dapp-toolkit'
  import { authApi } from '$lib/api/auth-api'
  import { userApi } from '$lib/api/user-api'
  import { ResultAsync } from 'neverthrow'
  import { publicConfig } from '$lib/public-config'
  import Carousel from '$lib/components/carousel/Carousel.svelte'
  import QuestOverview from '$lib/components/quest-overview/QuestOverview.svelte'
  import { goto, invalidateAll } from '$app/navigation'
  import { quests, user, webSocketClient, jettyMessage } from '../stores'
  import Header from '$lib/components/header/Header.svelte'
  import Layout from '$lib/components/layout/Layout.svelte'
  import Tabs from '$lib/components/tabs/Tabs.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { resolveRDT } from '$lib/rdt'
  import { WebSocketClient } from '$lib/websocket-client'
  import { questApi } from '$lib/api/quest-api'
  import { type QuestId } from 'content'
  import type { QuestStatus } from '../types'
  import { useLocalStorage } from '$lib/utils/local-storage'
  import Backdrop from '$lib/components/backdrop/Backdrop.svelte'
  import LandingPopup from './LandingPopup.svelte'
  import { page } from '$app/stores'
  import { isMobile } from '$lib/utils/is-mobile'
  import type { LayoutData } from './$types'
  import { useCookies } from '$lib/utils/cookies'
  import Jetty from './Jetty.svelte'

  export let data: LayoutData

  $quests = data.questDefinitions

  // TODO: move dApp toolkit to a better location
  let radixDappToolkit: RadixDappToolkit

  const { dAppDefinitionAddress, networkId } = publicConfig

  const setGetWalletRequirementInStore = () => {
    // @ts-ignore
    useCookies('requirement-GetRadixWallet-GetTheWallet').set(true)
  }

  onMount(() => {
    showLandingPopup = !useLocalStorage('seen-landing-popup').get()

    if (isMobile() && $page.url.searchParams.get('wallet') === 'true') {
      setGetWalletRequirementInStore()
    }

    const logger = Logger(1)

    radixDappToolkit = RadixDappToolkit({
      networkId,
      dAppDefinitionAddress: dAppDefinitionAddress ?? '',
      logger,
      featureFlags: ['ExperimentalMobileSupport'],
      onDisconnect: async () => {
        authApi.logout()
        $webSocketClient?.close()
        $webSocketClient = undefined

        Object.entries($quests).forEach(([questId, quest]) => {
          useCookies(`quest-status-${questId as QuestId}`).clear()
          useCookies(`saved-progress-${questId as QuestId}`).clear()
          Object.keys(quest.requirements).forEach((id) => {
            // @ts-ignore
            useCookies(`requirement-${questId}-${id}`).clear()
          })
        })
        useLocalStorage('savedProgress').clear()
        useLocalStorage('seen-jetty-get-wallet-notification').clear()

        $user = undefined

        await invalidateAll()
      }
    })

    radixDappToolkit.walletApi.provideChallengeGenerator(async () => {
      const result = await authApi.createChallenge()

      // TODO: handle challenge creation failure and give user some feedback
      if (result.isErr()) throw new Error('Failed to create challenge')

      return result.value
    })

    radixDappToolkit.walletApi.setRequestData(DataRequestBuilder.persona().withProof())

    radixDappToolkit.walletApi.dataRequestControl(async (data) => {
      const { proofs } = data
      const personaProof = proofs.find((proof) => proof.type === 'persona')
      if (personaProof) {
        // TODO: set the current user in a store
        const result = await authApi.login(personaProof)

        // TODO: handle login failure and give user some feedback
        if (result.isErr()) throw Error('Failed to login')
      }
    })

    radixDappToolkit.walletApi.walletData$.subscribe(({ persona }) => {
      if (persona?.identityAddress) {
        ResultAsync.combine([userApi.me(), authApi.authToken()])
          .map(async ([me, authToken]) => {
            $user = {
              ...me,
              label: persona.label
            }

            if (authToken) {
              const ws = WebSocketClient({ authToken, radixDappToolkit })
              $webSocketClient = ws
            }

            await invalidateAll()

            // TODO:
            // - bootstrap the application state (quest progress, user, notifications etc...) and connect to notifications websocket

            if (
              data.questStatus['LoginWithWallet']?.status === 'IN_PROGRESS' &&
              !useLocalStorage('seen-jetty-get-wallet-notification').get()
            ) {
              useLocalStorage('seen-jetty-get-wallet-notification').set(true)
              $jettyMessage = 'LoggedIn'
            }
          })
          .mapErr(({ status }) => {
            // TODO: logout user and give feedback that the session has expired
            if (status === 401) radixDappToolkit.disconnect()
          })
      }
    })

    resolveRDT(radixDappToolkit)

    const savedProgress = localStorage.getItem('savedProgress')

    if (savedProgress) {
      const { questId, progress } = JSON.parse(savedProgress)
      goto(`/quest/${questId}#${progress}`)
    } else if ($user) {
      questApi.getSavedProgress().map((savedProgress) => {
        if (savedProgress.questId) goto(`/quest/${savedProgress.questId}#${savedProgress.progress}`)
      })
    }
  })

  $: questCardState = Object.entries(data.questDefinitions).reduce(
    (prev, cur) => {
      const [id, quest] = cur

      if (data.questStatus[id as QuestId]?.status === 'COMPLETED') {
        prev[id as QuestId] = 'completed'
        return prev
      }

      const preRequisites = quest.preRequisites

      const isUnlocked = preRequisites.every(
        (preReq) => data.questStatus[preReq]?.status === 'COMPLETED'
      )

      const isInProgress = data.questStatus[id as QuestId]?.status === 'IN_PROGRESS'

      prev[id as QuestId] = isInProgress ? 'in-progress' : isUnlocked ? 'unlocked' : 'locked'

      return prev
    },
    {} as { [key in QuestId]: QuestStatus }
  )

  let _quests = Object.entries($quests) as [
    keyof typeof $quests,
    (typeof $quests)[keyof typeof $quests]
  ][]

  let activeTab: string

  let showLandingPopup = false
</script>

{#if showLandingPopup}
  <Backdrop>
    <LandingPopup
      on:click={() => {
        showLandingPopup = false
        useLocalStorage('seen-landing-popup').set(true)
      }}
    />
  </Backdrop>
{/if}

<Jetty
  onGlossaryClose={() => {
    $page.url.searchParams.delete('glossaryAnchor')
    goto(`?${$page.url.searchParams.toString()}`)
  }}
/>

<Layout>
  <Header slot="header" />

  <Tabs
    slot="tabs"
    tabs={[
      { name: $i18n.t('main:tabs-basics'), id: 'basics' },
      { name: $i18n.t('main:tabs-advanced'), id: 'advanced' }
    ]}
    bind:activeTab
  />

  <svelte:fragment slot="quests">
    {#if activeTab === 'basics'}
      <Carousel let:Item>
        {#each _quests as [id, quest]}
          {#if quest.category === 'Basic'}
            <Item>
              <QuestOverview
                title={$i18n.t(`${id}.title`, { ns: 'quests' })}
                description={$i18n.t(`${id}.description`, { ns: 'quests' })}
                minutesToComplete={quest.minutesToComplete}
                rewards={quest.rewards}
                backgroundImage={quest.splashImage}
                state={questCardState[id] ?? 'locked'}
                on:click={() => goto(`/quest/${id}`)}
              />
            </Item>
          {/if}
        {/each}
      </Carousel>
    {/if}
  </svelte:fragment>
</Layout>

<slot />
