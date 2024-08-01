<script lang="ts" context="module">
  const getKeyValueStoreData = (userId: string) => {
    return ResultAsync.fromPromise(
      GatewayApi(publicConfig.networkId).gatewayApiClient.state.innerClient.keyValueStoreData({
        stateKeyValueStoreDataRequest: {
          key_value_store_address: publicConfig.components.radgemRecordsKeyValueStore,
          keys: [
            {
              key_json: {
                value: userId,
                kind: 'String',
                type_name: 'UserId'
              }
            }
          ]
        }
      }),
      (e) => e as Error
    )
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
    getKeyValueStoreData(userId).andThen(claimAvailableInKeyValueStore)
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
    StateKeyValueStoreDataResponse,
    ProgrammaticScryptoSborValueTuple
  } from '@radixdlt/babylon-gateway-api-sdk'
  import ClaimRadGem from './ClaimRadGem.svelte'
  import { messageApi } from '$lib/api/message-api'
  import { context } from '$lib/components/jetty-menu/JettyMenu.svelte'
  import { webSocketClient } from '$lib/websocket-client'
  import JettyMenuItemPage from './JettyMenuItemPage.svelte'
  import { waitingWarning } from '$lib/utils/waiting-warning'
  import { useLocalStorage } from '$lib/utils/local-storage'

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

  $: enoughElementsForRadgems = parseInt(amountOfElements) >= elementsToCreateRadgem

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
        useLocalStorage('waiting-for-radgems').set(true)
        waitingForElementsDeposited = true
      })
      .mapErr(() => {
        useLocalStorage('waiting-for-radgems').set(false)
        waitingForSendElements = false
        waitingForElementsDeposited = false
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
    if (useLocalStorage('waiting-for-radgems').get()) {
      waitingForElementsDeposited = true
    }
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
              useLocalStorage('waiting-for-radgems').set(false)
              waitingForElementsDeposited = false
              elementsDeposited = true
            })
            messageApi.markAsSeen([msg.id])
          }
        })
    })

    return () => {
      unsub()
      waitingWarning(false)
    }
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

  $: waitingWarning(waitingForElementsDeposited)
</script>

<div class="fuse-elements">
  {#if loadingLedgerData}
    <div class="loading">
      <LoadingSpinner dark />
    </div>
  {:else if errorLoadingElements}
    <!-- TODO handle error -->
    error loading elements
  {:else if waitingForElementsDeposited}
    <JettyMenuItemPage>
      <div slot="header" class="title">
        {$i18n.t('jetty:fuse-elements.fusing-elements')}
      </div>

      <div class="fusing-animation content">
        <lottie-player
          autoplay
          loop
          mode="normal"
          src="/lottie/loading.json"
          style="width: 250px"
        />
      </div>
    </JettyMenuItemPage>
  {:else if radgemClaimed}
    <JettyMenuItemPage
      action={!enoughElementsForRadgems
        ? {
            text: $i18n.t('jetty:close'),
            onClick: () => dispatch('cancel')
          }
        : undefined}
      actions={enoughElementsForRadgems
        ? {
            left: {
              text: $i18n.t('jetty:close'),
              onClick: () => dispatch('cancel')
            },
            right: {
              text: $i18n.t('jetty:fuse-elements.create-another'),
              onClick: () => {
                radgemClaimed = false
              }
            }
          }
        : undefined}
    >
      <div slot="header">
        {$i18n.t('jetty:fuse-elements.radgem-claimed')}

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
          elementsDeposited = false
          claimAvailable = false
        })
      }}
    />
  {:else}
    {#key rerender}
      <div class="page-with-subtitle">
        <JettyMenuItemPage
          action={noElements || !enoughElementsForRadgems
            ? {
                text: $i18n.t('jetty:close'),
                onClick: () => dispatch('cancel')
              }
            : {
                text: $i18n.t('jetty:fuse-elements.send-button'),
                onClick: sendElements
              }}
          loading={waitingForSendElements}
        >
          <div class="content">
            <img
              style:width="100%"
              src="/quests-images/key/JettyConversation_MultipleRadGems.webp"
              alt="Radgems"
            />

            {$i18n.t('jetty:fuse-elements.intro1')}

            {#if enoughElementsForRadgems}
              <p>
                {$i18n.t('jetty:fuse-elements.intro2', { count: parseInt(amountOfElements) })}
              </p>

              <b>
                {$i18n.t('jetty:fuse-elements.enough-elements')}
              </b>
            {:else if noElements}
              <p class="bold">
                {$i18n.t('jetty:fuse-elements.no-elements')}
              </p>
            {:else}
              <p class="bold">
                {$i18n.t('jetty:fuse-elements.not-enough-elements', {
                  count: parseInt(amountOfElements)
                })}
              </p>
            {/if}
          </div>
        </JettyMenuItemPage>
        <div class="sub">
          {$i18n.t('jetty:fuse-elements.send-elements-subtitle')}
        </div>
      </div>
    {/key}
  {/if}
</div>

<style lang="scss">
  .fuse-elements {
    display: flex;
    justify-content: center;
    color: var(--color-light);
    height: 100%;
  }
  .bold {
    font-weight: var(--font-weight-bold);
  }

  .content {
    padding: 0 var(--spacing-2xl);

    @include mobile {
      padding: 0 var(--spacing-xl);
    }
  }

  .title {
    font-size: var(--text-md3);
    text-align: center;
  }

  .fusing-animation {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .page-with-subtitle {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    .sub {
      padding: 0 var(--spacing-xl);
      padding-bottom: var(--spacing-xl);
      text-align: center;
      font-size: var(--text-xs);
    }
  }
</style>
