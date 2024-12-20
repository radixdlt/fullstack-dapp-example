<script lang="ts" context="module">
  export const checkClaimAvailable = (userId: string) => {
    const manifest = `
    CALL_METHOD
        Address("${publicConfig.components.radgemForgeV2}")
        "get_user_counts"
        "${userId}"
    ;
    `
    const res = gatewayApi.preview(manifest).map((res: any) => {
      return (
        res.receipt.output[0].programmatic_json.fields[1].value >
        res.receipt.output[0].programmatic_json.fields[2].value
      )
    })

    return res
  }
</script>

<script lang="ts">
  import { gatewayApi, publicConfig } from '$lib/public-config'
  import { sendTransaction } from '$lib/rdt'
  import { createEventDispatcher, onMount } from 'svelte'
  import { user } from '../../stores'
  import { GatewayApi, type ColorCodeDescription, type ShaderCodeDescription } from 'common'
  import type {
    ProgrammaticScryptoSborValueTuple,
    ProgrammaticScryptoSborValueString,
    StateKeyValueStoreDataResponse
  } from '@radixdlt/babylon-gateway-api-sdk'
  import pipe from 'ramda/src/pipe'
  import { i18n } from '$lib/i18n/i18n'
  import JettyMenuItemPage from './JettyMenuItemPage.svelte'
  import GemCard from '$lib/components/resource-card/GemCard.svelte'
  import Carousel from '$lib/components/carousel/Carousel.svelte'
  import LoadingSpinner from '$lib/components/loading-spinner/LoadingSpinner.svelte'
  import { errAsync, okAsync, type ResultAsync } from 'neverthrow'

  export let useV2 = true
  let data:
    | {
        name: string
        quality: number
        material: ShaderCodeDescription
        color: ColorCodeDescription
      }[]
    | undefined
  let ids: string[]

  let loading = false

  const manifest = `
      CALL_METHOD
        Address("${$user?.accountAddress}")
        "create_proof_of_non_fungibles"
        Address("${publicConfig.badges.heroBadgeAddress}")
        Array<NonFungibleLocalId>(NonFungibleLocalId("<${$user?.id}>"))
      ;
      POP_FROM_AUTH_ZONE
          Proof("hero_badge_proof")
      ;
      CALL_METHOD
          Address("${publicConfig.components.radgemForgeV2}")
          "claim_radgems"
          Proof("hero_badge_proof")
      ;
      CALL_METHOD
          Address("${$user?.accountAddress}")
          "deposit_batch"
          Expression("ENTIRE_WORKTOP")
      ;
    `

  const manifestOld = `
  CALL_METHOD
        Address("${$user?.accountAddress}")
        "create_proof_of_non_fungibles"
        Address("${publicConfig.badges.heroBadgeAddress}")
        Array<NonFungibleLocalId>(NonFungibleLocalId("<${$user?.id}>"))
    ;
    POP_FROM_AUTH_ZONE
        Proof("user_badge_proof")
    ;
    CALL_METHOD
        Address("${publicConfig.components.refinery}")
        "combine_elements_claim"
        Proof("user_badge_proof")
    ;
    CALL_METHOD
        Address("${$user?.accountAddress}")
        "deposit_batch"
        Expression("ENTIRE_WORKTOP")
    ;`

  const getRadgemPreview = pipe(
    () =>
      GatewayApi(publicConfig.networkId).callApi(
        'getNonFungibleData',
        publicConfig.resources.radgemAddress,
        ids
      ),
    (result) =>
      result.map((response) => {
        const fields = response.map(
          (items) => (items.data?.programmatic_json as ProgrammaticScryptoSborValueTuple).fields
        )

        return fields.map((fields) => ({
          name: (
            fields.find(
              (field) => field.field_name === 'name'
            ) as ProgrammaticScryptoSborValueString
          ).value,
          quality: parseInt(
            (
              fields.find(
                (field) => field.field_name === 'quality'
              ) as ProgrammaticScryptoSborValueString
            ).value
          ),
          material: (
            fields.find(
              (field) => field.field_name === 'material'
            ) as ProgrammaticScryptoSborValueString
          ).value as ShaderCodeDescription,
          color: (
            fields.find(
              (field) => field.field_name === 'color'
            ) as ProgrammaticScryptoSborValueString
          ).value as ColorCodeDescription
        }))
      })
  )

  onMount(() => {
    checkClaimAvailable($user?.id!)
      .andThen((value) => {
        if (value) return getRadgemPreview()
        return okAsync([])
      })
      .map((_preview) => {
        data = _preview
      })
  })

  const dispatch = createEventDispatcher<{
    claimed: undefined
  }>()

  const onClick = () => {
    loading = true
    sendTransaction({ transactionManifest: useV2 ? manifest : manifestOld })
      .map(() => {
        loading = false
        dispatch('claimed')
      })
      .mapErr(() => {
        loading = false
      })
  }
</script>

<JettyMenuItemPage
  action={{
    text: 'Claim',
    onClick
  }}
  {loading}
>
  <div class="claim-radgem">
    {#if !data}
      <div class="loading">
        <LoadingSpinner dark />
      </div>
    {:else}
      <h2>
        {$i18n.t('jetty:fuse-elements.success')}
      </h2>

      <b>
        {data.length === 1
          ? $i18n.t('jetty:fuse-elements.new-radgem')
          : $i18n.t('jetty:fuse-elements.new-radgems')}
      </b>

      <div class="cards">
        <Carousel let:Item>
          {#each data as gem}
            <Item>
              <GemCard {gem} selectable={false} />
            </Item>
          {/each}
        </Carousel>
      </div>
    {/if}
  </div>
</JettyMenuItemPage>

<style lang="scss">
  .claim-radgem {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: var(--spacing-lg);
    overflow: hidden;
  }

  h2 {
    color: var(--color-light);
    font-size: var(--text-md3);
    font-weight: var(--font-weight-regular);
    line-height: 0;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .claim-radgem {
    :global(.carousel > .item) {
      padding: var(--spacing-2xl) 0 var(--spacing-3xl);
      @include short {
        padding-top: var(--spacing-lg);
      }
    }
  }

  .cards {
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
  }
</style>
