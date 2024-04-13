<script lang="ts">
  import '../global.scss'
  import { onMount } from 'svelte'
  import { DataRequestBuilder, RadixDappToolkit, createLogger } from '@radixdlt/radix-dapp-toolkit'
  import { authApi } from '$lib/api/auth-api'
  import { userApi } from '$lib/api/user-api'
  import { ResultAsync } from 'neverthrow'
  import { publicConfig } from '$lib/public-config'
  import Carousel from '$lib/components/carousel/Carousel.svelte'
  import QuestOverview from '$lib/components/quest-overview/QuestOverview.svelte'
  import { goto } from '$app/navigation'
  import {
    questRequirements,
    questStatus,
    quests,
    user,
    webSocketClient,
    type StoredRequirements
  } from '../stores'
  import Header from '$lib/components/header/Header.svelte'
  import Layout from '$lib/components/layout/Layout.svelte'
  import Tabs from '$lib/components/tabs/Tabs.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { resolveRDT } from '$lib/rdt'
  import { WebSocketClient } from '$lib/websocket-client'
  import { questApi } from '$lib/api/quest-api'
  import { QuestDefinitions, type QuestId } from 'content'
  import { PUBLIC_NETWORK_ID } from '$env/static/public'
  import type { QuestStatus } from '../types'
  import {
    clearQuestStatusFromLocalStorage,
    loadQuestStatusFromLocalStorage,
    useLocalStorage
  } from '$lib/utils/local-storage'
  import Backdrop from '$lib/components/backdrop/Backdrop.svelte'
  import LandingPopup from './LandingPopup.svelte'

  // TODO: move dApp toolkit to a better location
  let radixDappToolkit: RadixDappToolkit

  const { dAppDefinitionAddress, networkId } = publicConfig

  onMount(() => {
    const requirements: Record<QuestId, StoredRequirements[]> = {} as Record<
      QuestId,
      StoredRequirements[]
    >

    for (const questId in $quests) {
      const quest = $quests[questId as QuestId]

      requirements[questId as QuestId] = Object.entries(quest.requirements).map(
        ([id, requirement]) => ({
          id,
          complete: false,
          // @ts-ignore
          text: $i18n.t(`${questId as QuestId}.requirements`, {
            ns: 'quests',
            returnObjects: true
          })[id],
          type: requirement.type
        })
      )
    }

    $questRequirements = requirements

    Object.entries(useLocalStorage('requirements').get() ?? {}).forEach(
      ([questId, requirements]) => {
        $questRequirements[questId as QuestId] = $questRequirements[questId as QuestId].map(
          (requirement) => ({
            ...requirement,
            complete: Object.entries(requirements).some(
              ([id, complete]) => id === requirement.id && complete
            )
          })
        )
      }
    )

    showLandingPopup = !useLocalStorage('seen-landing-popup').get()
    $questStatus = loadQuestStatusFromLocalStorage()

    questRequirements.subscribe((value) => {
      if (value) {
        useLocalStorage('requirements').set(
          Object.entries(value).reduce(
            (prev, [questId, requirements]) => {
              prev[questId as QuestId] = requirements.reduce(
                (prev, cur) => {
                  prev[cur.id] = cur.complete
                  return prev
                },
                {} as { [key: string]: boolean }
              )
              return prev
            },
            {} as { [key in QuestId]: { [key: string]: boolean } }
          )
        )
      }
    })

    radixDappToolkit = RadixDappToolkit({
      networkId,
      dAppDefinitionAddress: dAppDefinitionAddress ?? '',
      logger: createLogger(1),
      onDisconnect: () => {
        // TODO: handle application state cleanup
        authApi.logout()
        $webSocketClient?.close()
        clearQuestStatusFromLocalStorage()
        $questStatus = loadQuestStatusFromLocalStorage()
        useLocalStorage('requirements').clear()
        $user = undefined
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
            // TODO:
            // - bootstrap the application state (quest progress, user, notifications etc...) and connect to notifications websocket
            const questInfoResult = await questApi.getQuestsInformation()

            if (questInfoResult.isErr()) throw questInfoResult.error

            const questInfo = questInfoResult.value

            const questDefinitions = QuestDefinitions(parseInt(PUBLIC_NETWORK_ID))

            $questStatus = Object.entries(questDefinitions).reduce(
              (prev, cur) => {
                const [id, quest] = cur

                if (questInfo[id as QuestId]?.status === 'COMPLETED') {
                  prev[id as QuestId] = 'completed'
                  return prev
                }

                const preRequisites = quest.preRequisites

                const isUnlocked = preRequisites.every(
                  (preReq) => questInfo[preReq]?.status === 'COMPLETED'
                )

                prev[id as QuestId] = isUnlocked ? 'unlocked' : 'locked'

                return prev
              },
              {} as { [key in QuestId]: QuestStatus }
            )

            if (authToken) {
              if (!$webSocketClient) {
                const ws = WebSocketClient({ authToken })
                $webSocketClient = ws
              }
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
                state={$questStatus?.[id]}
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
