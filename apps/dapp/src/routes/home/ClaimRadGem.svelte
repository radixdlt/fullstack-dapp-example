<script lang="ts">
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
  import JettyMenuItemPage from './JettyMenuItemPage.svelte'

  export let ids: string[]

  let loading = false
  let preview: {
    image: string
    name: string
    quality: string
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
        ids
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
          ).value,
          quality: (
            fields.find(
              (field) => field.field_name === 'quality'
            ) as ProgrammaticScryptoSborValueString
          ).value
        }
      })
  )

  onMount(() => {
    if (ids.length === 1) {
      getRadgemPreview().map((_preview) => {
        preview = _preview
      })
    }
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

<JettyMenuItemPage
  action={{
    text: 'Claim',
    onClick
  }}
  {loading}
>
  <div class="claim-radgem">
    {#if preview}
      <h2>
        {$i18n.t('jetty:fuse-elements.success')}
      </h2>
      <b>
        {$i18n.t('jetty:fuse-elements.new-radgem')}
      </b>
      <img src={preview.image} alt="A Radgem" />
      <h3>
        {preview.name.split('{')[0]}
      </h3>
      {$i18n.t('jetty:fuse-elements.quality', { quality: preview.quality })}
    {/if}
    {#if ids.length > 1}
      {$i18n.t('jetty:fuse-elements.multiple-radgems')}
      <enhanced:img src="@images/multiple-gems.webp?enhanced" />
    {/if}
  </div>
</JettyMenuItemPage>

<style lang="scss">
  .claim-radgem {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  h2 {
    color: var(--color-light);
    font-size: var(--text-md3);
    font-weight: var(--font-weight-regular);
    line-height: 0;
  }

  h3 {
    color: var(--color-light);
    font-size: var(--text-md2);
    font-weight: var(--font-weight-regular);
    line-height: 0;
  }

  img {
    width: 12rem;
    height: 12rem;
    margin-top: 1rem;
  }
</style>
