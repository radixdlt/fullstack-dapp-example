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
  import { quests, user, webSocketClient } from '../stores'
  import Header from '$lib/components/header/Header.svelte'
  import Layout from '$lib/components/layout/Layout.svelte'
  import Tabs from '$lib/components/tabs/Tabs.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { resolveRDT } from '$lib/rdt'
  import { WebSocketClient } from '$lib/websocket-client'

  // TODO: move dApp toolkit to a better location
  let radixDappToolkit: RadixDappToolkit

  const { dAppDefinitionAddress, networkId } = publicConfig

  onMount(() => {
    radixDappToolkit = RadixDappToolkit({
      networkId,
      dAppDefinitionAddress: dAppDefinitionAddress ?? '',
      logger: createLogger(1),
      onDisconnect: () => {
        // TODO: handle application state cleanup
        authApi.logout()
        $webSocketClient?.close()
      }
    })

    radixDappToolkit.walletApi.provideChallengeGenerator(async () => {
      const result = await authApi.createChallenge()

      // TODO: handle challenge creation failure and give user some feedback
      if (result.isErr()) throw new Error('Failed to create challenge')

      return result.value
    })

    radixDappToolkit.walletApi.setRequestData(
      DataRequestBuilder.persona().withProof(),
      DataRequestBuilder.accounts().exactly(1).withProof()
    )

    radixDappToolkit.walletApi.dataRequestControl(async (data) => {
      const { proofs } = data
      const personaProof = proofs.find((proof) => proof.type === 'persona')
      const accountProof = proofs.find((proof) => proof.type === 'account')
      if (personaProof && accountProof) {
        // TODO: set the current user in a store
        const result = await authApi.login(personaProof, accountProof)

        // TODO: handle login failure and give user some feedback
        if (result.isErr()) throw new Error('Failed to login')
      }
    })

    radixDappToolkit.walletApi.walletData$.subscribe(({ persona }) => {
      if (persona?.identityAddress) {
        ResultAsync.combine([userApi.me(), authApi.authToken()])
          .map(([me, authToken]) => {
            user.set(me)
            // TODO:
            // - bootstrap the application state (quest progress, user, notifications etc...) and connect to notifications websocket

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
  })

  let _quests = Object.entries($quests) as [
    keyof typeof $quests,
    (typeof $quests)[keyof typeof $quests]
  ][]

  let activeTab: string
</script>

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
                state="unlocked"
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
