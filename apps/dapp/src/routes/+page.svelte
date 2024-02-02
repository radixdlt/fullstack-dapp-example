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
  import { GlossaryContent } from 'virtual:glossary'
  import { publicConfig } from '$lib/public-config'

  let radixDappToolkit: RadixDappToolkit
  let connected: boolean = false

  const { dAppDefinitionAddress, networkId } = publicConfig

  // TODO: move dApp toolkit to a better location
  onMount(() => {
    radixDappToolkit = RadixDappToolkit({
      networkId,
      dAppDefinitionAddress,
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

    radixDappToolkit.walletApi.dataRequestControl(async ({ proofs, accounts }) => {
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
          .map(([user, authToken]) => {
            // TODO:
            // - bootstrap the application state (quest progress, user, notifications etc...) and connect to notifications websocket
            // - improve the websocket connection logic and handle reconnection
            new WebSocket(env.PUBLIC_NOTIFICATION_URL)
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
</script>

<div><radix-connect-button></radix-connect-button></div>

<h1>Welcome to RadQuest</h1>

{#if connected}
  <div>
    <button on:click={handleMintUserBadge}>Mint user badge</button>
  </div>
{/if}

{#each GlossaryContent['en'] as entry}
  <h1>{entry.title}</h1>
  {@html entry.content}
{/each}

<style lang="scss">
  div {
    display: flex;
    justify-content: flex-end;
  }
</style>
