<script lang="ts">
  import '../global.scss'
  import { onMount } from 'svelte'
  import { DataRequestBuilder, RadixDappToolkit, createLogger } from '@radixdlt/radix-dapp-toolkit'
  import { authApi } from './api/auth/auth-api'
  import { userApi } from './api/(protected)/user/user-api'
  import { env } from '$env/dynamic/public'
  import { ResultAsync } from 'neverthrow'
  import { publicConfig } from '$lib/public-config'
  import { loadQuests } from 'content'
  import Carousel from '$lib/components/carousel/Carousel.svelte'
  import QuestOverview from '$lib/components/quest-overview/QuestOverview.svelte'
  import { goto } from '$app/navigation'
  import { quests } from '../stores'
  import Header from '$lib/components/header/Header.svelte'
  import Layout from '$lib/components/layout/Layout.svelte'
  import Tabs from '$lib/components/tabs/Tabs.svelte'
  import { i18n } from '$lib/i18n'
  import JettyDialog from '$lib/components/jetty-dialog/JettyDialog.svelte'
  import GlossaryIcon from '@images/book-open.svg'
  import Glossary from '$lib/components/glossary/Glossary.svelte'
  import Backdrop from '$lib/components/backdrop/Backdrop.svelte'

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
      DataRequestBuilder.accounts().exactly(1)
    )

    radixDappToolkit.walletApi.dataRequestControl(async ({ proofs }) => {
      const personaProof = proofs.find((proof) => proof.type === 'persona')
      if (personaProof) {
        // TODO: set the current user in a store
        const result = await authApi.login(personaProof)

        // TODO: handle login failure and give user some feedback
        if (result.isErr()) throw new Error('Failed to login')
      }
    })

    radixDappToolkit.walletApi.walletData$.subscribe(({ persona }) => {
      if (persona?.identityAddress) {
        ResultAsync.combine([userApi.me(), authApi.authToken()])
          .map(([_, authToken]) => {
            // TODO:
            // - bootstrap the application state (quest progress, user, notifications etc...) and connect to notifications websocket
            // - improve the websocket connection logic and handle reconnection
            if (authToken) new WebSocket(env.PUBLIC_NOTIFICATION_URL, ['Authorization', authToken])
          })
          .mapErr(({ status }) => {
            // TODO: logout user and give feedback that the session has expired
            if (status === 401) radixDappToolkit.disconnect()
          })
      }
    })
  })

  let loadedQuests = loadQuests('en', networkId)

  quests.set(loadedQuests)

  let basicQuests = loadedQuests.filter((quest) => quest.category === 'Basic')

  let advancedQuests = loadedQuests.filter((quest) => quest.category === 'Advanced')

  let activeTab: string

  let showJettyMenu = false

  let showGlossary = false

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      if (showGlossary) {
        showGlossary = false
      } else {
        showJettyMenu = false
      }
    }
  }
</script>

<svelte:window on:keydown={(e) => handleKeydown(e)} />

<Layout>
  <Header slot="header" />

  <Tabs
    slot="tabs"
    tabs={[
      { name: $i18n.t('tabs_basics'), id: 'basics' },
      { name: $i18n.t('tabs_advanced'), id: 'advanced' }
    ]}
    bind:activeTab
  />

  <svelte:fragment slot="quests">
    {#if activeTab === 'basics'}
      <Carousel let:Item>
        {#each basicQuests as quest}
          <Item>
            <QuestOverview
              title={quest.title}
              description={quest.description}
              minutesToComplete={quest.minutesToComplete}
              rewards={quest.rewards}
              backgroundImage={quest.splashImage}
              state="unlocked"
              on:click={() => goto(`/quest/${quest.id}`)}
            />
          </Item>
        {/each}
      </Carousel>
    {/if}

    {#if activeTab === 'advanced'}
      <Carousel let:Item>
        {#each advancedQuests as quest}
          <Item>
            <QuestOverview
              title={quest.title}
              description={quest.description}
              minutesToComplete={quest.minutesToComplete}
              rewards={quest.rewards}
              backgroundImage={quest.splashImage}
              state="unlocked"
              on:click={() => goto(`/quest/${quest.id}`)}
            />
          </Item>
        {/each}
      </Carousel>
    {/if}
  </svelte:fragment>
</Layout>

<JettyDialog
  dialogs={showJettyMenu ? 1 : 0}
  let:Menu
  on:click={() => (showJettyMenu = !showJettyMenu)}
>
  {$i18n.t('jettyDialog_menu_text')}
  <Menu
    options={[
      {
        text: $i18n.t('jettyDialog_menu_glossary'),
        iconUrl: GlossaryIcon,
        onClick: () => (showGlossary = true)
      }
    ]}
  />
</JettyDialog>

{#if showGlossary}
  <Backdrop>
    <Glossary on:close={() => (showGlossary = false)} />
  </Backdrop>
{/if}

<slot />
