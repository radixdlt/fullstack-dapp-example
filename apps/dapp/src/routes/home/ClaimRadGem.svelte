<script lang="ts">
  import Button from '$lib/components/button/Button.svelte'
  import { publicConfig } from '$lib/public-config'
  import { sendTransaction } from '$lib/rdt'
  import { createEventDispatcher, onMount } from 'svelte'
  import { user } from '../../stores'
  import { GatewayApi } from 'common'
  import type {
    ProgrammaticScryptoSborValueTuple,
    ProgrammaticScryptoSborValueString
  } from '@radixdlt/babylon-gateway-api-sdk'
  import pipe from 'ramda/src/pipe'
  import { i18n } from '$lib/i18n/i18n'
  import FuseElementsPage from './FuseElementsPage.svelte'

  export let id: string

  let loading = false
  let preview: {
    image: string
    name: string
  }

  $: manifest = `
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
    ;
      `

  const getRadgemPreview = pipe(
    () =>
      GatewayApi(publicConfig.networkId).callApi(
        'getNonFungibleData',
        publicConfig.resources.radgemAddress,
        [id]
      ),
    (result) =>
      result.map(([response]) => {
        const fields = (response.data?.programmatic_json as ProgrammaticScryptoSborValueTuple)
          .fields

        return {
          image: (
            fields.find(
              (field) => field.field_name === 'key_image_url'
            ) as ProgrammaticScryptoSborValueString
          ).value,
          name: (
            fields.find(
              (field) => field.field_name === 'name'
            ) as ProgrammaticScryptoSborValueString
          ).value
        }
      })
  )

  onMount(() => {
    getRadgemPreview().map((_preview) => {
      console.log(_preview)
      preview = _preview
    })
  })

  const dispatch = createEventDispatcher<{
    claimed: undefined
  }>()

  const onClick = () => {
    loading = true
    sendTransaction({ transactionManifest: manifest })
      .map(() => {
        loading = false
        dispatch('claimed')
      })
      .mapErr(() => {
        loading = false
      })
  }
</script>

<FuseElementsPage singleAction>
  <div class="claim-radgem" slot="content">
    {#if preview}
      {$i18n.t('jetty:fuse-elements.new-radgem')}
      <img src={preview.image} alt="A Radgem" />
      {preview.name}
    {/if}
  </div>

  <Button slot="actions" {loading} on:click={onClick}>Claim</Button>
</FuseElementsPage>

<style lang="scss">
  .claim-radgem {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xl);
  }
  img {
    width: 10rem;
    height: 10rem;
  }
</style>
