<script lang="ts" context="module">
  const getRadgemKeystoreAddress = (details: StateEntityDetailsResponseItemDetails) => {
    if (details!.type === 'Component') {
      return (details!.state! as any).fields.find(
        (field: any) => field.field_name === 'radgem_records'
      )!.value as string
    }
  }

  const getKeyValueStoreKeys = (keyStoreAddress: string) =>
    ResultAsync.fromPromise(
      GatewayApi(publicConfig.networkId).gatewayApiClient.state.innerClient.keyValueStoreKeys({
        stateKeyValueStoreKeysRequest: {
          key_value_store_address: keyStoreAddress!
        }
      }),
      (e) => e as Error
    )

  const getRawHexFromKeyValueStoreKeys =
    (userId: string) =>
    (keys: StateKeyValueStoreKeysResponse): ResultAsync<string, string> => {
      const userKey = keys.items.find(
        ({ key }) =>
          key.programmatic_json.type_name === 'UserId' &&
          key.programmatic_json.kind === 'String' &&
          key.programmatic_json.value === userId
      )

      return userKey ? okAsync(userKey.key.raw_hex) : errAsync('No claim available')
    }

  const getKeyValueStoreData = (keyStoreAddress: string) => (rawHex: string) => {
    if (!rawHex) {
      return errAsync('No claim available')
    } else {
      return ResultAsync.fromPromise(
        GatewayApi(publicConfig.networkId).gatewayApiClient.state.innerClient.keyValueStoreData({
          stateKeyValueStoreDataRequest: {
            key_value_store_address: keyStoreAddress,
            keys: [
              {
                key_hex: rawHex
              },
              {
                key_json: {
                  kind: 'Tuple',
                  fields: [
                    {
                      kind: 'U32',
                      value: '1'
                    }
                  ]
                }
              }
            ]
          }
        }),
        (e) => e as Error
      )
    }
  }

  const claimAvailableInKeyValueStore = (
    storeData: StateKeyValueStoreDataResponse
  ): ResultAsync<string[], string> => {
    const unclaimed = storeData.entries.find(
      ({ value }) =>
        value.programmatic_json.kind === 'Enum' &&
        value.programmatic_json.variant_name === 'Unclaimed'
    )

    if (unclaimed) {
      const nftIds = (
        (unclaimed.value.programmatic_json as ProgrammaticScryptoSborValueTuple).fields[0] as any
      ).elements.map((element: any) => element.value) as string[]

      return okAsync(nftIds)
    }

    return errAsync('No claim available')
  }

  export const checkClaimAvailable = (userId: string) =>
    pipe(
      () =>
        GatewayApi(publicConfig.networkId).callApi('getEntityDetailsVaultAggregated', [
          publicConfig.components.refinery
        ]),
      (result) => result.map(([{ details }]) => getRadgemKeystoreAddress(details!)),
      (result) =>
        result.andThen((keyStoreAddress) =>
          pipe(
            () => getKeyValueStoreKeys(keyStoreAddress!),
            (result) => result.andThen(getRawHexFromKeyValueStoreKeys(userId)),
            (result) => result.andThen(getKeyValueStoreData(keyStoreAddress!)),
            (result) => result.andThen(claimAvailableInKeyValueStore)
          )()
        )
    )()
</script>

<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import { publicConfig } from '$lib/public-config'
  import { GatewayApi } from 'common'
  import { user } from '../../stores'
  import pipe from 'ramda/src/pipe'
  import { sendTransaction } from '$lib/rdt'
  import LoadingSpinner from '$lib/components/loading-spinner/LoadingSpinner.svelte'
  import { createEventDispatcher, onMount } from 'svelte'
  import { ResultAsync, errAsync, okAsync } from 'neverthrow'
  import type {
    StateEntityDetailsResponseItemDetails,
    StateKeyValueStoreKeysResponse,
    StateKeyValueStoreDataResponse,
    ProgrammaticScryptoSborValueTuple
  } from '@radixdlt/babylon-gateway-api-sdk'
  import ClaimRadGem from './ClaimRadGem.svelte'
  import { messageApi } from '$lib/api/message-api'
  import { context } from '$lib/components/jetty-menu/JettyMenu.svelte'
  import { webSocketClient } from '$lib/websocket-client'
  import JettyMenuItemPage from './JettyMenuItemPage.svelte'

  let rerender = false

  const gateway = GatewayApi(publicConfig.networkId)

  let loadingLedgerData = true
  let waitingForSendElements = false

  let noElements = false
  let amountOfElements: string
  let errorLoadingElements = false
  let claimAvailable: boolean
  let claimableRadGemIds: string[]
  let waitingForElementsDeposited = false
  let elementsDeposited = false
  let radgemClaimed = false

  const elementsToCreateRadgem = 5

  const sendElements = async () => {
    const transactionManifest = `
        CALL_METHOD
            Address("${$user?.accountAddress}")
            "create_proof_of_non_fungibles"
            Address("${publicConfig.badges.heroBadgeAddress}")
            Array<NonFungibleLocalId>(NonFungibleLocalId("<${$user?.id}>"))
        ;

        POP_FROM_AUTH_ZONE
            Proof("userBadge")
        ;

        CALL_METHOD
            Address("${$user?.accountAddress}")
            "withdraw" 
            Address("${publicConfig.resources.elementAddress}")
            Decimal("5") 
        ;

        TAKE_ALL_FROM_WORKTOP 
            Address("${publicConfig.resources.elementAddress}") 
            Bucket("elements")
        ;

        CALL_METHOD
            Address("${publicConfig.components.refinery}")
            "combine_elements_deposit"
            Proof("userBadge")
            Bucket("elements")
        ;

        CALL_METHOD
            Address("${$user?.accountAddress}")
            "deposit_batch"
            Expression("ENTIRE_WORKTOP")
        ;
    `

    waitingForSendElements = true
    return sendTransaction({ transactionManifest })
      .map(() => {
        waitingForSendElements = false
        waitingForElementsDeposited = true
      })
      .mapErr(() => {
        waitingForSendElements = false
      })
  }

  const checkAmountOfElements = pipe(
    () => gateway.callApi('getEntityDetailsVaultAggregated', [$user?.accountAddress!]),
    (result) =>
      result.map((items) =>
        items[0].fungible_resources.items.find(
          (item) => item.resource_address === publicConfig.resources.elementAddress
        )
      ),
    (result) =>
      result.map((element) => {
        if (!element) {
          noElements = true
          return
        }

        amountOfElements = element.vaults.items[0].amount

        if (parseInt(amountOfElements) === 0) {
          noElements = true
        }
      })
  )

  onMount(() => {
    ResultAsync.combineWithAllErrors([checkAmountOfElements(), checkClaimAvailable($user?.id!)])
      .map(([_, radGemIds]) => {
        loadingLedgerData = false
        claimAvailable = true
        claimableRadGemIds = radGemIds
      })
      .mapErr(([_, _errorLoadingElements]) => {
        loadingLedgerData = false
        if (_errorLoadingElements) errorLoadingElements = true
      })

    const unsub = webSocketClient.subscribe((ws) => {
      if (ws)
        ws.onMessage((msg) => {
          if (msg.type === 'CombineElementsAddRadgemImage') {
            checkClaimAvailable($user?.id!).map((radGemId) => {
              claimAvailable = true
              claimableRadGemIds = radGemId
              waitingForElementsDeposited = false
              elementsDeposited = true
            })
            messageApi.markAsSeen([msg.id])
          }
        })
    })

    return unsub
  })

  const dispatch = createEventDispatcher<{
    cancel: undefined
  }>()

  const back = context.get('back')
  const close = context.get('closeMenuItem')

  $: if ($back) {
    close()
    $back = false
  }

  $: if (waitingForElementsDeposited || claimAvailable) context.get('hideBackButton').set(true)
</script>

<div class="fuse-elements">
  {#if loadingLedgerData}
    <div class="loading">
      <LoadingSpinner />
    </div>
  {:else if errorLoadingElements}
    <!-- TODO handle error -->
    error loading elements
  {:else if waitingForElementsDeposited}
    <JettyMenuItemPage>
      <div slot="header" class="title">
        {$i18n.t('jetty:fuse-elements.fusing-elements')}
      </div>

      <div class="fusing-animation">
        <lottie-player
          autoplay
          loop
          mode="normal"
          src="/lottie/LoadingBar-Dust.json"
          style="width: 300px"
        />
      </div>
    </JettyMenuItemPage>
  {:else if radgemClaimed}
    <JettyMenuItemPage
      action={{
        text: $i18n.t('jetty:close'),
        onClick: () => dispatch('cancel')
      }}
    >
      <div>
        <p>
          {$i18n.t('jetty:fuse-elements.radgem-claimed')}
        </p>

        <p>
          {$i18n.t('jetty:fuse-elements.elements-left', {
            count: parseInt(amountOfElements)
          })}
        </p>
      </div>
    </JettyMenuItemPage>
  {:else if claimAvailable || elementsDeposited}
    <ClaimRadGem
      ids={claimableRadGemIds}
      on:claimed={() => {
        checkAmountOfElements().map(() => {
          radgemClaimed = true
        })
      }}
    />
  {:else}
    {#key rerender}
      <JettyMenuItemPage
        action={noElements || parseInt(amountOfElements) < elementsToCreateRadgem
          ? {
              text: $i18n.t('jetty:close'),
              onClick: () => dispatch('cancel')
            }
          : undefined}
        actions={parseInt(amountOfElements) >= elementsToCreateRadgem
          ? {
              left: {
                text: $i18n.t('jetty:close'),
                onClick: () => dispatch('cancel')
              },
              right: {
                text: $i18n.t('jetty:fuse-elements.send-button', {
                  count: 10
                }),
                onClick: sendElements
              }
            }
          : undefined}
        loading={waitingForSendElements}
      >
        <div>
          <p>
            {$i18n.t('jetty:fuse-elements.intro1')}
          </p>

          {#if parseInt(amountOfElements) >= elementsToCreateRadgem}
            <p>
              {$i18n.t('jetty:fuse-elements.intro2', { count: parseInt(amountOfElements) })}
            </p>

            <b>
              {$i18n.t('jetty:fuse-elements.enough-elements')}
            </b>
          {:else if noElements}
            <b class="bold">
              {$i18n.t('jetty:fuse-elements.no-elements')}
            </b>
          {:else}
            <b>
              {$i18n.t('jetty:fuse-elements.not-enough-elements', {
                count: parseInt(amountOfElements)
              })}
            </b>
          {/if}
        </div>
      </JettyMenuItemPage>
    {/key}
  {/if}
</div>

<style lang="scss">
  .fuse-elements {
    display: flex;
    justify-content: center;
    color: var(--color-light);
    height: 100%;
    padding: var(--spacing-2xl);
  }
  .bold {
    font-weight: var(--font-weight-bold);
  }

  .title {
    font-size: var(--text-md3);
    text-align: center;
  }

  .fusing-animation {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
