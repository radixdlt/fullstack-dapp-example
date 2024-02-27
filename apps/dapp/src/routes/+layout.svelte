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

  let questsContainerHeight: number
</script>

<div class="header">
  <radix-connect-button class="radix-btn" />
</div>

<div
  class="quests"
  bind:clientHeight={questsContainerHeight}
  style:--offsetHeight={`${questsContainerHeight / 2}px`}
>
  <Carousel let:Item>
    {#each loadedQuests as quest}
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
</div>

<slot />

<style lang="scss">
  :global(body) {
    background: var(--gradient-3) no-repeat center fixed;
  }

  .radix-btn {
    z-index: 1;
  }
  .header {
    display: flex;
    justify-content: flex-end;
    padding: var(--spacing-xl);
  }
  .quests {
    position: fixed;
    top: calc(50% - var(--offsetHeight));
    left: 0;
    right: 0;
  }
</style>
