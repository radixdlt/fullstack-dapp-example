<script lang="ts">
  import JettyActionButton from '$lib/components/quest/JettyActionButton.svelte'
  import JettyActionButtons from '$lib/components/quest/JettyActionButtons.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { publicConfig } from '$lib/public-config'
  import { useLocalStorage } from '$lib/utils/local-storage'
  import { GatewayApi } from 'common'
  import { user, webSocketClient } from '../../stores'
  import pipe from 'ramda/src/pipe'
  import { sendTransaction } from '$lib/rdt'
  import LoadingSpinner from '$lib/components/loading-spinner/LoadingSpinner.svelte'
  import { createEventDispatcher, onMount } from 'svelte'
  import { ResultAsync, errAsync, okAsync } from 'neverthrow'
  import type {
    StateEntityDetailsResponseItemDetails,
    StateKeyValueStoreKeysResponse,
    StateKeyValueStoreDataResponse
  } from '@radixdlt/babylon-gateway-api-sdk'
  import ClaimRadGem from './ClaimRadGem.svelte'
  import { messageApi } from '$lib/api/message-api'
  import { context } from '$lib/components/jetty-menu/JettyMenu.svelte'

  let rerender = false

  const gateway = GatewayApi(publicConfig.networkId)

  let loadingLedgerData = true
  let waitingForSendElements = false

  let noElements = false
  let amountOfElements: string
  let errorLoadingElements = false
  let claimAvailable: boolean
  let elementsDeposited = false

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
            Decimal("10") 
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
    return (await sendTransaction({ transactionManifest }))
      .map(() => {
        waitingForSendElements = false
      })
      .mapErr(() => {
        waitingForSendElements = false
      })
  }

  const getRadgemKeystoreAddress = (details: StateEntityDetailsResponseItemDetails) => {
    if (details!.type === 'Component') {
      return (details!.state! as any).fields.find(
        (field: any) => field.field_name === 'radgem_records'
      )!.value as string
    }
  }

  const getKeyValueStoreKeys = (keyStoreAddress: string) =>
    ResultAsync.fromPromise(
      gateway.gatewayApiClient.state.innerClient.keyValueStoreKeys({
        stateKeyValueStoreKeysRequest: {
          key_value_store_address: keyStoreAddress!
        }
      }),
      (e) => e as Error
    )

  const getRawHexFromKeyValueStoreKeys = (
    keys: StateKeyValueStoreKeysResponse
  ): ResultAsync<string, string> => {
    const userKey = keys.items.find(
      ({ key }) =>
        key.programmatic_json.kind === 'Tuple' &&
        key.programmatic_json.fields.find(
          (field) => field.kind === 'NonFungibleLocalId' && field.value === `<${$user?.id}>`
        )
    )

    return userKey ? okAsync(userKey.key.raw_hex) : errAsync('No claim available')
  }

  const getKeyValueStoreData = (keyStoreAddress: string) => (rawHex: string) => {
    if (!rawHex) {
      return errAsync('No claim available')
    } else {
      return ResultAsync.fromPromise(
        gateway.gatewayApiClient.state.innerClient.keyValueStoreData({
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
  ): ResultAsync<boolean, string> => {
    const unclaimed = storeData.entries.find(
      ({ value }) =>
        value.programmatic_json.kind === 'Enum' &&
        value.programmatic_json.variant_name === 'Unclaimed'
    )

    if (unclaimed) return okAsync(true)
    return errAsync('No claim available')
  }

  const checkClaimAvailable = pipe(
    () => gateway.callApi('getEntityDetailsVaultAggregated', [publicConfig.components.refinery]),
    (result) => result.map(([{ details }]) => getRadgemKeystoreAddress(details!)),
    (result) =>
      result.andThen((keyStoreAddress) =>
        pipe(
          () => getKeyValueStoreKeys(keyStoreAddress!),
          (result) => result.andThen(getRawHexFromKeyValueStoreKeys),
          (result) => result.andThen(getKeyValueStoreData(keyStoreAddress!)),
          (result) => result.andThen(claimAvailableInKeyValueStore)
        )()
      )
  )

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
      })
  )

  onMount(() => {
    ResultAsync.combineWithAllErrors([checkAmountOfElements(), checkClaimAvailable()])
      .map(([_, _claimAvailable]) => {
        loadingLedgerData = false
        claimAvailable = _claimAvailable
      })
      .mapErr(([_, _errorLoadingElements]) => {
        loadingLedgerData = false
        if (_errorLoadingElements) errorLoadingElements = true
      })

    const unsub = webSocketClient.subscribe((ws) => {
      if (ws)
        ws.onMessage((msg) => {
          if (msg.type === 'CombineElementsMintRadgem') {
            elementsDeposited = true
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
</script>

<div class="fuse-elements">
  {#if loadingLedgerData}
    <LoadingSpinner />
  {:else if errorLoadingElements}
    error loading elements
  {:else if claimAvailable || elementsDeposited}
    <ClaimRadGem
      on:claimed={() => {
        close()
      }}
    />
  {:else}
    {#key rerender}
      {#if useLocalStorage('seen-fuse-elements-intro').get()}
        {$i18n.t('jetty:fuse-elements.intro')}
        <JettyActionButton
          on:click={() => {
            useLocalStorage('seen-fuse-elements-intro').set(true)
            rerender = true
          }}
        >
          {$i18n.t('quests:nextButton')}
        </JettyActionButton>
      {:else if noElements}
        you have no elements
      {:else}
        {$i18n.t('jetty:fuse-elements.text1', { count: parseInt(amountOfElements) })}
        {$i18n.t('jetty:fuse-elements.text2', { count: 10 })}

        <JettyActionButtons
          backText={$i18n.t('jetty:cancel')}
          nextText={$i18n.t('jetty:fuse-elements.send-button', {
            count: 10
          })}
          loading={waitingForSendElements}
          on:back={() => dispatch('cancel')}
          on:next={sendElements}
        />
      {/if}
    {/key}
  {/if}
</div>

<style>
  .fuse-elements {
    color: var(--color-light);
  }
</style>
