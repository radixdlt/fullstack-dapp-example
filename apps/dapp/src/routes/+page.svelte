<script lang="ts">
  import '../global.scss'
  import { onMount } from 'svelte'
  import {
    DataRequestBuilder,
    OneTimeDataRequestBuilder,
    RadixDappToolkit,
    createLogger
  } from '@radixdlt/radix-dapp-toolkit'
  import { authApi } from './api/auth/auth-api'
  import { userApi } from './api/(protected)/user/user-api'
  import { env } from '$env/dynamic/public'
  import { ResultAsync } from 'neverthrow'
  import { publicConfig } from '$lib/public-config'
  import { writable } from 'svelte/store'
  import { loadQuests, type LoadedQuest } from 'content'
  import Carousel from '$lib/components/carousel/Carousel.svelte'
  import QuestOverview from '$lib/components/quest-overview/QuestOverview.svelte'
  import MdQuest from '$lib/components/quest/MDQuest.svelte'

  // TODO: move dApp toolkit to a better location
  let radixDappToolkit: RadixDappToolkit
  let connected: boolean = false

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
        connected = true
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

  const handleMintUserBadge = async () => {
    radixDappToolkit.walletApi
      .sendOneTimeRequest(OneTimeDataRequestBuilder.accounts().exactly(1).withProof())
      .andThen(({ accounts }) => {
        const account = accounts[0]
        return userApi.mintUserBadge(account.address)
      })
  }
  const currentInputValue = writable<string>('')

  const currentQuest = writable<LoadedQuest | undefined>()
  const questConfig = {
    placeholders: {},
    events: {
      onNextClick: () => {
        return ResultAsync.fromPromise(
          new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve()
            }, 1000)
          }),
          () => 'Failed to complete quest'
        )
      }
    }
  }

  let quests = loadQuests('en', networkId)
</script>

<div><radix-connect-button></radix-connect-button></div>

<h1>Welcome to RadQuest</h1>

{#if connected}
  <div>
    <button on:click={handleMintUserBadge}>Mint user badge</button>
  </div>
{/if}

<div>
  input value: {$currentInputValue}
</div>

{#if quests}
  <Carousel let:Item>
    {#each quests as quest}
      <Item>
        <QuestOverview
          title={quest.title}
          description={quest.description}
          minutesToComplete={quest.minutesToComplete}
          rewards={quest.rewards}
          backgroundImage={quest.splashImage}
          state="unlocked"
          on:click={() => currentQuest.set(quest)}
        />
      </Item>
    {/each}
  </Carousel>
{/if}

{#if $currentQuest}
  <MdQuest quest={$currentQuest} {questConfig} on:closeClick={() => currentQuest.set(undefined)}
  ></MdQuest>
{/if}

<style lang="scss">
  div {
    display: flex;
    justify-content: flex-end;
  }
</style>
