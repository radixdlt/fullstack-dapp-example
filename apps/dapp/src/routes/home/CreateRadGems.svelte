<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import { publicConfig } from '$lib/public-config'
  import { GatewayApi } from 'common'
  import { user } from '../../stores'
  import pipe from 'ramda/src/pipe'
  import { sendTransaction } from '$lib/rdt'
  import LoadingSpinner from '$lib/components/loading-spinner/LoadingSpinner.svelte'
  import { createEventDispatcher, onMount } from 'svelte'
  import { ResultAsync } from 'neverthrow'
  import ClaimRadGem, { checkClaimAvailable } from './ClaimRadGem.svelte'
  import { messageApi } from '$lib/api/message-api'
  import { context } from '$lib/components/jetty-menu/JettyMenu.svelte'
  import { webSocketClient } from '$lib/websocket-client'
  import JettyMenuItemPage from './JettyMenuItemPage.svelte'
  import { waitingWarning } from '$lib/utils/waiting-warning'
  import { userApi } from '$lib/api/user-api'

  let rerender = false

  const gateway = GatewayApi(publicConfig.networkId)

  let loadingLedgerData = true
  let waitingForSendElements = false

  let noElements = false
  let amountOfElements: string
  let errorLoadingElements = false
  let claimAvailable = false
  let waitingForElementsDeposited = false
  let elementsDeposited = false
  let radgemClaimed = false

  let useV2 = true

  $: hasOverMaxElements = parseInt(amountOfElements) > 100

  const elementsToCreateRadgem = 5

  $: enoughElementsForRadgems = parseInt(amountOfElements) >= elementsToCreateRadgem

  $: elementsAbleToSend = hasOverMaxElements
    ? 100
    : Math.floor(parseInt(amountOfElements) / elementsToCreateRadgem) * elementsToCreateRadgem

  const sendElements = async () => {
    const transactionManifest = `
        CALL_METHOD
            Address("${$user?.accountAddress}")
            "create_proof_of_non_fungibles"
            Address("${publicConfig.badges.heroBadgeAddress}")
            Array<NonFungibleLocalId>(NonFungibleLocalId("<${$user?.id}>"))
        ;

        POP_FROM_AUTH_ZONE
            Proof("hero_badge")
        ;

        CALL_METHOD
            Address("${$user?.accountAddress}")
            "withdraw" 
            Address("${publicConfig.resources.elementAddress}")
            Decimal("${elementsAbleToSend}") 
        ;

        TAKE_ALL_FROM_WORKTOP 
            Address("${publicConfig.resources.elementAddress}") 
            Bucket("elements")
        ;

        CALL_METHOD
          Address("${publicConfig.components.radgemForgeV2}")
          "deposit_elements"
          Proof("hero_badge")
          Bucket("elements")
        ;

        CALL_METHOD
            Address("${$user?.accountAddress}")
            "deposit_batch"
            Expression("ENTIRE_WORKTOP")
        ;
    `

    console.log('transactionManifest', transactionManifest)

    waitingForSendElements = true
    return sendTransaction({ transactionManifest }).then(() => {
      waitingForSendElements = false
      waitingForElementsDeposited = !elementsDeposited
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
    ResultAsync.combineWithAllErrors([
      userApi.hasWaitingRadgemJob(),
      checkAmountOfElements(),
      checkClaimAvailable($user?.id!, useV2)
    ])
      .map(([hasWaitingRadgemJob, _]) => {
        waitingForElementsDeposited = !claimAvailable && !elementsDeposited && hasWaitingRadgemJob
        loadingLedgerData = false
        claimAvailable = true
      })
      .mapErr(([_, _errorLoadingElements]) => {
        loadingLedgerData = false
        if (_errorLoadingElements) errorLoadingElements = true
      })

    let onMessageUnsubscribe: (() => void) | undefined

    const unsub = webSocketClient.subscribe((ws) => {
      if (ws)
        onMessageUnsubscribe = ws.onMessage((msg) => {
          if (msg.type === 'RadgemsMinted') {
            claimAvailable = true
            waitingForElementsDeposited = false
            elementsDeposited = true
            messageApi.markAsSeen([msg.id])
          }
        })
    })

    return () => {
      onMessageUnsubscribe?.()
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
      {useV2}
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
                text: $i18n.t('jetty:fuse-elements.send-button', {
                  count: elementsAbleToSend
                }),
                onClick: sendElements
              }}
          loading={waitingForSendElements}
        >
          <div class="content">
            {$i18n.t('jetty:fuse-elements.intro1')}

            {#if enoughElementsForRadgems}
              {#if hasOverMaxElements}
                <p>
                  {$i18n.t('jetty:fuse-elements.more-than-max-elements', {
                    count: parseInt(amountOfElements)
                  })}
                </p>
              {:else}
                <p>
                  {$i18n.t('jetty:fuse-elements.intro2', { count: parseInt(amountOfElements) })}
                </p>
              {/if}

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
      </div>
    {/key}
  {/if}
</div>

<style lang="scss">
  .fuse-elements {
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
      text-wrap: pretty;
    }
  }
</style>
