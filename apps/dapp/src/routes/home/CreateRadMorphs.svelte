<script lang="ts">
  import pipe from 'ramda/src/pipe'
  import { user } from '../../stores'
  import { publicConfig } from '$lib/public-config'
  import { GatewayApi } from 'common'
  import LoadingSpinner from '$lib/components/loading-spinner/LoadingSpinner.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import JettyMenuItemPage from './JettyMenuItemPage.svelte'
  import { createEventDispatcher, onMount, type ComponentProps } from 'svelte'
  import { context } from '$lib/components/jetty-menu/JettyMenu.svelte'
  import type {
    ProgrammaticScryptoSborValueTuple,
    ProgrammaticScryptoSborValueString,
    ProgrammaticScryptoSborValue
  } from '@radixdlt/babylon-gateway-api-sdk'
  import { sendTransaction } from '$lib/rdt'
  import { ResultAsync } from 'neverthrow'
  import { getRadmorphImage } from '$lib/api/radmorph-api'
  import TransformGems from './TransformGems.svelte'

  const gateway = GatewayApi(publicConfig.networkId)

  let loadingLedgerData = true
  let amountOfRadGems: number
  let amountOfEnergyCards: number
  let creatingRadmorphs = false
  let energyCardData: {
    id: string
    name: string
    energy: string
    image: string
    rarity: string
    availability: string
  }[]
  let gemData: {
    id: string
    name: string
    image: string
    color: string
    rarity: string
    material: string
  }[]

  const dispatch = createEventDispatcher<{ cancel: undefined }>()

  const getResources = pipe(
    () => gateway.callApi('getEntityDetailsVaultAggregated', [$user!.accountAddress!]),
    (result) =>
      result.map((items) => {
        const getAmountOfNft = (resourceAddress: string) => {
          const resource = items[0].non_fungible_resources.items.find(
            (item) => item.resource_address === resourceAddress
          )

          return (
            resource?.vaults.items.map((item) => item.total_count).reduce((a, b) => a + b, 0) || 0
          )
        }

        const getNftData = (resourceAddress: string) => {
          const resource = items[0].non_fungible_resources.items.find(
            (item) => item.resource_address === resourceAddress
          )

          const ids = resource?.vaults.items.map((item) => item.items || []).flat() || []

          return gateway.callApi('getNonFungibleData', resourceAddress, ids).map((response) =>
            response.map((item) => ({
              id: item.non_fungible_id,
              fields: (item.data?.programmatic_json as ProgrammaticScryptoSborValueTuple).fields
            }))
          )
        }

        const getStringDataValue = (name: string) => (fields: ProgrammaticScryptoSborValue[]) =>
          (fields.find((f) => f.field_name === name) as ProgrammaticScryptoSborValueString)?.value

        const getGemData = pipe(getNftData, (result) =>
          result.map((data) =>
            data.map(({ id, fields }) => ({
              id,
              name: getStringDataValue('name')(fields),
              material: getStringDataValue('material')(fields),
              image: getStringDataValue('key_image_url')(fields),
              rarity: getStringDataValue('rarity')(fields),
              color: getStringDataValue('color')(fields)
            }))
          )
        )

        const getEnergyCardData = pipe(getNftData, (result) =>
          result.map((data) =>
            data.map(({ id, fields }) => ({
              id,
              name: getStringDataValue('name')(fields),
              energy: getStringDataValue('energy')(fields),
              image: getStringDataValue('key_image_url')(fields),
              rarity: getStringDataValue('rarity')(fields),
              availability: getStringDataValue('availability')(fields)
            }))
          )
        )

        ;[amountOfRadGems, amountOfEnergyCards] = [
          publicConfig.resources.radgemAddress,
          publicConfig.resources.morphEnergyCardAddress
        ].map(getAmountOfNft)

        getGemData(publicConfig.resources.radgemAddress).map((data) => {
          gemData = data
        })

        getEnergyCardData(publicConfig.resources.morphEnergyCardAddress).map((data) => {
          energyCardData = data
        })

        loadingLedgerData = false
      })
  )

  onMount(getResources)

  const back = context.get('back')
  const close = context.get('closeMenuItem')

  $: if ($back) {
    close()
    $back = false
  }

  $: hasEnoughResources = amountOfRadGems >= 2 && amountOfEnergyCards >= 1

  const createRadmorphManifest = () =>
    getRadmorphImage(selectedRadgems[0].id, selectedRadgems[1].id, selectedCard.id).map(
      (response) => `
      CALL_METHOD
          Address("${$user!.accountAddress}")
          "withdraw_non_fungibles"
          Address("${publicConfig.resources.radgemAddress}")
          Array<NonFungibleLocalId>(
              NonFungibleLocalId("${selectedRadgems[0].id}"),
          );

      TAKE_ALL_FROM_WORKTOP Address("${publicConfig.resources.radgemAddress}") Bucket("radgem_1");

      CALL_METHOD
          Address("${$user!.accountAddress}")
          "withdraw_non_fungibles"
          Address("${publicConfig.resources.radgemAddress}")
          Array<NonFungibleLocalId>(
              NonFungibleLocalId("${selectedRadgems[1].id}")
          );

      TAKE_ALL_FROM_WORKTOP Address("${publicConfig.resources.radgemAddress}") Bucket("radgem_2");

      CALL_METHOD
          Address("${$user!.accountAddress}")
          "withdraw_non_fungibles"
          Address("${publicConfig.resources.morphEnergyCardAddress}")
          Array<NonFungibleLocalId>(
              NonFungibleLocalId("${selectedCard.id}")
          );

      TAKE_ALL_FROM_WORKTOP Address("${publicConfig.resources.morphEnergyCardAddress}") Bucket("morph_energy_card");

      CALL_METHOD
          Address("${publicConfig.components.refinery}")
          "create_radmorph"
          Bucket("radgem_1")
          Bucket("radgem_2")
          Bucket("morph_energy_card")
          "${response.imageUrl}";

      CALL_METHOD
          Address("${$user!.accountAddress}")
          "deposit_batch"
          Expression("ENTIRE_WORKTOP");
    `
    )

  const createRadmorph = async (
    setLoading: () => void,
    unsetLoading: () => void,
    success: () => void
  ) => {
    setLoading()

    const manifest = (await createRadmorphManifest())._unsafeUnwrap()

    sendTransaction({
      transactionManifest: manifest
    })
      .map(() => {
        unsetLoading()
        success()
      })
      .mapErr(() => {
        unsetLoading()
      })
  }

  const getPreview = pipe(
    () => gateway.callApi('getCurrent').map((response) => response.ledger_state.epoch),
    (result) =>
      result.andThen((epoch) =>
        pipe(
          () => createRadmorphManifest(),
          (result) =>
            result.andThen((manifest) =>
              ResultAsync.fromPromise(
                gateway.gatewayApiClient.transaction.innerClient.transactionPreview({
                  transactionPreviewRequest: {
                    start_epoch_inclusive: epoch,
                    end_epoch_exclusive: epoch + 2,
                    manifest,
                    tip_percentage: 0,
                    nonce: 1,
                    signer_public_keys: [],
                    flags: {
                      skip_epoch_check: false,
                      assume_all_signature_proofs: true,
                      use_free_credit: true
                    }
                  }
                }),
                (error) => error as Error
              )
            ),
          (result) =>
            result.map((response) => {
              const nftData = (response.receipt as any).events
                .find((event: any) => event.type.name === 'RadmorphCreatedEvent')
                .data.programmatic_json.fields.find((field: any) => field.kind === 'Tuple').fields

              return {
                image: nftData[0].value as string,
                firstRadmorph: `${nftData[3].value} ${nftData[4].value}`,
                secondRadmorph: `${nftData[5].value} ${nftData[6].value}`
              }
            })
        )()
      )
  )

  let selectedRadgems: [
    NonNullable<ComponentProps<TransformGems>['gems']>[number],
    NonNullable<ComponentProps<TransformGems>['gems']>[number]
  ]
  let selectedCard: NonNullable<ComponentProps<TransformGems>['cards']>[number]
</script>

<div class="create-radmorphs">
  {#if loadingLedgerData}
    <div class="loading">
      <LoadingSpinner />
    </div>
  {:else if creatingRadmorphs && energyCardData && gemData}
    <TransformGems
      cards={energyCardData}
      gems={gemData}
      {createRadmorph}
      getPreview={async () => {
        const preview = (await getPreview())._unsafeUnwrap()
        return {
          firstRadmorph: preview.firstRadmorph,
          secondRadmorph: preview.secondRadmorph,
          quality: 10,
          image: preview.image
        }
      }}
      on:cancel={close}
      on:selectedCard={(e) => {
        selectedCard = e.detail
      }}
      on:selectedGems={(e) => {
        selectedRadgems = e.detail
      }}
      on:complete={close}
    />
  {:else}
    <JettyMenuItemPage
      action={hasEnoughResources
        ? undefined
        : {
            text: $i18n.t('jetty:close'),
            onClick: () => dispatch('cancel')
          }}
      actions={hasEnoughResources
        ? {
            left: {
              text: $i18n.t('jetty:close'),
              onClick: () => dispatch('cancel')
            },
            right: {
              text: $i18n.t('jetty:create-radmorphs.get-started'),
              onClick: () => (creatingRadmorphs = true)
            }
          }
        : undefined}
    >
      {$i18n.t('jetty:create-radmorphs.intro')}
      <p>
        {$i18n.t('jetty:create-radmorphs.intro2')}
      </p>

      {#if hasEnoughResources}
        <p>
          {$i18n.t('jetty:create-radmorphs.intro3-success')}
        </p>
      {:else}
        <p class="text-bold">
          {$i18n.t('jetty:create-radmorphs.intro3-fail', {
            radgems: amountOfRadGems,
            energyCards: amountOfEnergyCards
          })}
        </p>
      {/if}
    </JettyMenuItemPage>
  {/if}
</div>

<style lang="scss">
  .create-radmorphs {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2xl);
    height: 100%;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
