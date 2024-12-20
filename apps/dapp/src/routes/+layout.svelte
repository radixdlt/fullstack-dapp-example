<script lang="ts">
  import Header from '$lib/components/header/Header.svelte'
  import { DataRequestBuilder, Logger, RadixDappToolkit } from '@radixdlt/radix-dapp-toolkit'
  import { onMount } from 'svelte'
  import { authApi } from '$lib/api/auth-api'
  import { userApi } from '$lib/api/user-api'
  import { ResultAsync } from 'neverthrow'
  import { publicConfig } from '$lib/public-config'
  import { WebSocketClient, webSocketClient } from '$lib/websocket-client'
  import { useCookies } from '$lib/utils/cookies'
  import { ErrorPopupId, errorPopupStore, hasHeroBadge, jettyNotifications, user } from '../stores'
  import { loadQuests, type QuestId } from 'content'
  import { useLocalStorage } from '$lib/utils/local-storage'
  import { invalidateAll } from '$app/navigation'
  import { GatewayApi } from 'common'
  import { resolveRDT } from '$lib/rdt'
  import DevMode from './home/[category=quest_category]/DevMode.svelte'

  const { dAppDefinitionAddress, networkId } = publicConfig

  const logger = Logger(1)

  onMount(() => {
    const radixDappToolkit = RadixDappToolkit({
      networkId,
      dAppDefinitionAddress: dAppDefinitionAddress ?? '',
      logger,
      onDisconnect: async () => {
        await authApi.logout()

        $webSocketClient?.close()
        $webSocketClient = undefined

        useCookies('jwt').clear()

        const quests = loadQuests('en')

        Object.entries(quests).forEach(([questId, quest]) => {
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

        $jettyNotifications = []

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

        if (['PERMANENTLY_BLOCKED'].includes(result.value.status)) {
          errorPopupStore.set({
            id: ErrorPopupId.PermanentlyBlocked
          })
        } else if (['TEMPORARILY_BLOCKED'].includes(result.value.status)) {
          errorPopupStore.set({
            id: result.value.vpn ? ErrorPopupId.GetOffVPN : ErrorPopupId.SessionBlocked
          })
        }
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
              $webSocketClient = WebSocketClient({ authToken, radixDappToolkit })
            }

            await invalidateAll()

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
  })
</script>

<div class="header">
  <Header />
</div>

<slot />

<DevMode />

<style lang="scss">
  .header {
    height: 10dvh;
    @include shortMobile {
      position: absolute;
      width: 100%;
    }
  }
</style>
