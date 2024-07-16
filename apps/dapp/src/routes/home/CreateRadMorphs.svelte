<script lang="ts" context="module">
  const gateway = GatewayApi(publicConfig.networkId)

  const getNftData = (items: StateEntityDetailsVaultResponseItem[], resourceAddress: string) => {
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

  export const getStringDataValue = (name: string) => (fields: ProgrammaticScryptoSborValue[]) =>
    (fields.find((f) => f.field_name === name) as ProgrammaticScryptoSborValueString)?.value

  export const getBoolDataValue = (name: string) => (fields: ProgrammaticScryptoSborValue[]) =>
    (fields.find((f) => f.field_name === name) as ProgrammaticScryptoSborValueBool)?.value

  const getGemData = pipe(getNftData, (result) =>
    result.map((data) =>
      data.map(({ id, fields }) => ({
        id,
        name: getStringDataValue('name')(fields),
        material: getStringDataValue('material')(fields),
        imageUrl: getStringDataValue('key_image_url')(fields),
        quality: getStringDataValue('quality')(fields),
        color: getStringDataValue('color')(fields)
      }))
    )
  )

  const getEnergyCardData = pipe(getNftData, (result) =>
    result.map((data) =>
      data.map(({ id, fields }) => ({
        id,
        name: getStringDataValue('name')(fields),
        energy: getStringDataValue('energy_type')(fields),
        imageUrl: getStringDataValue('key_image_url')(fields),
        rarity: getStringDataValue('rarity')(fields),
        availability: getStringDataValue('availability')(fields),
        quality: parseInt(getStringDataValue('quality')(fields)),
        limitedEdition: getBoolDataValue('limited_edition')(fields)
      }))
    )
  )
</script>

<script lang="ts">
  import pipe from 'ramda/src/pipe'
  import { creatingRadMorphSeen, user } from '../../stores'
  import { publicConfig } from '$lib/public-config'
  import { GatewayApi } from 'common'
  import LoadingSpinner from '$lib/components/loading-spinner/LoadingSpinner.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import JettyMenuItemPage from './JettyMenuItemPage.svelte'
  import { createEventDispatcher, onMount, type ComponentProps } from 'svelte'
  import { context } from '$lib/components/jetty-menu/JettyMenu.svelte'
  import type {
    ProgrammaticScryptoSborValue,
    ProgrammaticScryptoSborValueBool,
    ProgrammaticScryptoSborValueString,
    ProgrammaticScryptoSborValueTuple,
    StateEntityDetailsVaultResponseItem
  } from '@radixdlt/babylon-gateway-api-sdk'
  import { sendTransaction } from '$lib/rdt'
  import { ResultAsync } from 'neverthrow'
  import { getRadmorphImage } from '$lib/api/radmorph-api'
  import TransformGems from './TransformGems.svelte'
  import { completeRequirement } from '$lib/helpers/complete-requirement.svelte'

  let loadingLedgerData = true
  let amountOfRadGems: number
  let amountOfEnergyCards: number
  let creatingRadmorphs = false
  let energyCardData: {
    id: string
    name: string
    energy: string
    imageUrl: string
    rarity: string
    availability: string
    quality: number
    limitedEdition: boolean
  }[]
  let gemData: {
    id: string
    name: string
    imageUrl: string
    color: string
    quality: string
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

        ;[amountOfRadGems, amountOfEnergyCards] = [
          publicConfig.resources.radgemAddress,
          publicConfig.resources.morphEnergyCardAddress
        ].map(getAmountOfNft)

        getGemData(items, publicConfig.resources.radgemAddress).map((data) => {
          gemData = data
        })

        getEnergyCardData(items, publicConfig.resources.morphEnergyCardAddress).map((data) => {
          energyCardData = data
        })

        loadingLedgerData = false
      })
  )

  onMount(() => {
    getResources()
    completeRequirement('CreatingRadMorphs', 'CheckOutRadMorph')
    creatingRadMorphSeen.set(true)
  })

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
              NonFungibleLocalId("${selectedRadgems[1].id}")
          );

      TAKE_ALL_FROM_WORKTOP Address("${publicConfig.resources.radgemAddress}") Bucket("radgem");

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
          Bucket("radgem")
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
                    manifest,
                    start_epoch_inclusive: epoch,
                    end_epoch_exclusive: epoch + 2,
                    tip_percentage: 0,
                    nonce: 1,
                    signer_public_keys: [],
                    flags: {
                      skip_epoch_check: true,
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
                name: nftData[1].value as string,
                quality: nftData[3].value as number,
                limitedEdition: nftData[8].value as boolean
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
          name: preview.name,
          quality: preview.quality,
          limitedEdition: preview.limitedEdition,
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
    padding: var(--spacing-2xl);
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
