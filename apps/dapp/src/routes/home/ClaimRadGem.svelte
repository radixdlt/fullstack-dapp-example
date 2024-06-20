<script lang="ts">
  import Button from '$lib/components/button/Button.svelte'
  import SpeechBubble from '$lib/components/jetty-dialog/speech-bubble/SpeechBubble.svelte'
  import { publicConfig } from '$lib/public-config'
  import { sendTransaction } from '$lib/rdt'
  import { createEventDispatcher, onMount } from 'svelte'
  import { user } from '../../stores'
  import { GatewayApi } from 'common'
  import type {
    StateEntityDetailsResponseNonFungibleVaultDetails,
    ProgrammaticScryptoSborValueTuple,
    ProgrammaticScryptoSborValueString
  } from '@radixdlt/babylon-gateway-api-sdk'
  import pipe from 'ramda/src/pipe'
  import { ResultAsync } from 'neverthrow'

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
      ResultAsync.fromPromise(
        GatewayApi(
          publicConfig.networkId
        ).gatewayApiClient.transaction.innerClient.transactionPreview({
          transactionPreviewRequest: {
            manifest,
            start_epoch_inclusive: 0,
            end_epoch_exclusive: 1,
            nonce: 1,
            signer_public_keys: [],
            tip_percentage: 0,
            flags: {
              use_free_credit: true,
              assume_all_signature_proofs: true,
              skip_epoch_check: true
            }
          }
        }),
        (e) => e as Error
      ),
    (result) =>
      result.andThen((response) =>
        GatewayApi(publicConfig.networkId).callApi('getEntityDetailsVaultAggregated', [
          (response.resource_changes[0] as any).resource_changes[0].vault_entity.entity_address
        ])
      ),
    (result) =>
      result.map(([response]) => ({
        resourceAddress: (response.details as StateEntityDetailsResponseNonFungibleVaultDetails)
          .resource_address,
        nonFungibleId: (response.details as StateEntityDetailsResponseNonFungibleVaultDetails)
          .balance.items?.[0]!
      })),
    (result) =>
      result.andThen(({ resourceAddress, nonFungibleId }) =>
        GatewayApi(publicConfig.networkId).callApi('getNonFungibleData', resourceAddress, [
          nonFungibleId
        ])
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
    getRadgemPreview().map((_preview) => (preview = _preview))
  })

  const onClick = () => {
    const dispatch = createEventDispatcher<{
      claimed: undefined
    }>()

    loading = true
    sendTransaction({ transactionManifest: manifest })
      .then(() => {
        loading = false
        dispatch('claimed')
      })
      .catch(() => {
        loading = false
      })
  }
</script>

<SpeechBubble>
  {#if preview}
    <img src={preview.image} alt="A Radgem" />
    {preview.name}
  {/if}
  <Button {loading} on:click={onClick}>Claim</Button>
</SpeechBubble>
