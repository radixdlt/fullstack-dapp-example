<script lang="ts" context="module">
  const gateway = GatewayApi(publicConfig.networkId)

  export const getRewards = (userId: string) =>
    pipe(
      () =>
        gateway.callApi('getEntityDetailsVaultAggregated', [publicConfig.components.giftBoxOpener]),
      (result) =>
        result.andThen(([response]) => {
          const keyValueStoreAddress = (
            (response.details as StateEntityDetailsResponseComponentDetails).state as any
          ).fields.find((field: any) => field.field_name === 'rewards_record').value

          return ResultAsync.fromPromise(
            gateway.gatewayApiClient.state.innerClient.keyValueStoreData({
              stateKeyValueStoreDataRequest: {
                key_value_store_address: keyValueStoreAddress,
                keys: [
                  {
                    key_json: {
                      kind: 'String',
                      value: userId
                    }
                  }
                ]
              }
            }),
            (e) => e as Error
          )
        }),
      (result) =>
        result.andThen((response) => {
          const entries = (response.entries[0]?.value.programmatic_json as any).elements[0]?.entries

          if (!entries) return errAsync(Error('Nothing to claim'))

          const amountOfElements = entries
            .find((entry: any) => entry.key.value === publicConfig.resources.elementAddress)
            .value.fields.find((field: any) => field.kind === 'Decimal').value as string

          const morphCardId = entries
            .find((entry: any) => entry.key.value === publicConfig.resources.morphEnergyCardAddress)
            .value.fields.find((field: any) => field.element_kind === 'NonFungibleLocalId')
            .elements.find((element: any) => element.kind === 'NonFungibleLocalId').value as string

          return okAsync({
            amountOfElements: parseInt(amountOfElements),
            morphCardId
          })
        }),
      (result) =>
        result.andThen(({ amountOfElements, morphCardId }) =>
          gateway
            .callApi('getNonFungibleData', publicConfig.resources.morphEnergyCardAddress, [
              morphCardId
            ])
            .map(([response]) => {
              const fields = (response.data!.programmatic_json as any).fields

              const cardData = {
                name: getStringDataValue('name')(fields),
                energy: getStringDataValue('energy_type')(fields),
                image: getStringDataValue('key_image_url')(fields),
                rarity: getStringDataValue('rarity')(fields),
                availability: getStringDataValue('availability')(fields),
                quality: parseInt(getStringDataValue('quality')(fields))
              }

              return {
                amountOfElements,
                cardData
              }
            })
        )
    )()
</script>

<script lang="ts">
  import { publicConfig } from '$lib/public-config'
  import pipe from 'ramda/src/pipe'
  import { GatewayApi } from 'common'
  import { user } from '../../stores'
  import LoadingSpinner from '$lib/components/loading-spinner/LoadingSpinner.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import JettyMenuItemPage from './JettyMenuItemPage.svelte'
  import { sendTransaction } from '$lib/rdt'
  import type {
    FungibleResourcesCollectionItemVaultAggregated,
    StateEntityDetailsResponseComponentDetails
  } from '@radixdlt/babylon-gateway-api-sdk'
  import Carousel from '$lib/components/carousel/Carousel.svelte'
  import { context } from '$lib/components/jetty-menu/JettyMenu.svelte'
  import { errAsync, okAsync, ResultAsync } from 'neverthrow'
  import { getStringDataValue } from './CreateRadMorphs.svelte'
  import TransformCard from '$lib/components/resource-card/TransformCard.svelte'
  import ElementCard from '$lib/components/resource-card/ElementCard.svelte'
  import { onMount } from 'svelte'
  import ResourceCard from '$lib/components/resource-card/ResourceCard.svelte'
  import { webSocketClient } from '$lib/websocket-client'

  let loadingLedgerData = true
  let ownedGiftBoxes: {
    [address: string]: {
      amount: number
      name: string
      image: string
    }
  }
  let rewards: {
    amountOfElements: number
    cardData: {
      name: string
      energy: string
      image: string
      rarity: string
      availability: string
      quality: number
    }
  }

  const openGiftBoxManifest = (giftBoxAddress: string) => `
    CALL_METHOD
      Address("${$user!.accountAddress!}")
      "create_proof_of_non_fungibles"
      Address("${publicConfig.badges.heroBadgeAddress}")
      Array<NonFungibleLocalId>(
          NonFungibleLocalId("<${$user!.id}>")
      );

    POP_FROM_AUTH_ZONE
        Proof("hero_badge_proof");

    CALL_METHOD
        Address("${$user!.accountAddress!}")
        "withdraw"
        Address("${giftBoxAddress}")
        Decimal("1");

    TAKE_ALL_FROM_WORKTOP
        Address("${giftBoxAddress}")
        Bucket("gift_box");

    CALL_METHOD
        Address("${publicConfig.components.giftBoxOpener}")
        "open_gift_box"
        Proof("hero_badge_proof")
        Bucket("gift_box");
  `

  const claimItemsManifest = `
    CALL_METHOD
      Address("${$user!.accountAddress!}")
      "create_proof_of_non_fungibles"
      Address("${publicConfig.badges.heroBadgeAddress}")
      Array<NonFungibleLocalId>(
        NonFungibleLocalId("<${$user!.id}>")
      )
    ;
    POP_FROM_AUTH_ZONE
        Proof("hero_badge_proof")
    ;
    CALL_METHOD
        Address("${publicConfig.components.giftBoxOpener}")
        "claim_gift_box_rewards"
        Proof("hero_badge_proof")
    ;
    CALL_METHOD
        Address("${$user!.accountAddress!}")
        "deposit_batch"
        Expression("ENTIRE_WORKTOP")
    ;

`

  const getGiftBoxes = pipe(
    () =>
      gateway.callApi('getEntityDetailsVaultAggregated', [$user!.accountAddress!], {
        explicitMetadata: ['icon_url']
      }),
    (result) =>
      result.map(([{ fungible_resources }]) => {
        const types = ['Starter', 'Simple', 'Fancy', 'Elite'] as const

        const [starter, simple, fancy, elite] = types.map((type) =>
          fungible_resources.items.find(
            (item) => item.resource_address === publicConfig.resources.giftBox[type]
          )
        )

        const getAmount = (collection: FungibleResourcesCollectionItemVaultAggregated) =>
          collection.vaults.items
            .map((item) => item.amount)
            .reduce((acc, curr) => acc + parseInt(curr), 0)

        return [starter, simple, fancy, elite].reduce(
          (acc, curr, i) => {
            acc[curr?.resource_address!] = {
              amount: curr ? getAmount(curr) : 0,
              name: types[i],
              image: (
                curr?.explicit_metadata?.items.find((item) => item.key === 'icon_url')!.value
                  .typed as any
              ).value as string
            }
            return acc
          },
          {} as typeof ownedGiftBoxes
        )
      })
  )

  const openGiftBox = (giftBoxAddress: string) => {
    waitingForOpenTransaction = true
    sendTransaction({
      transactionManifest: openGiftBoxManifest(giftBoxAddress)
    })
      .andThen(() => {
        waitingForOpenTransaction = false
        waitingForDepositedRewards = true

        let resolveDeposited: () => void

        const promise = new Promise<void>((resolve) => {
          resolveDeposited = resolve
        })

        const unsub = $webSocketClient!.onMessage((msg) => {
          if (msg.type === 'GiftBoxDeposited') {
            resolveDeposited()
          }
        })

        return ResultAsync.fromSafePromise(promise).map(unsub)
      })
      .andThen(() => {
        return getRewards($user!.id)
      })
      .map(({ amountOfElements, cardData }) => {
        rewards = {
          amountOfElements,
          cardData
        }

        waitingForDepositedRewards = false
        readyToClaim = true
      })
      .mapErr(() => {
        waitingForDepositedRewards = false
      })
  }

  const claimItems = () => {
    waitingForClaimTransaction = true
    sendTransaction({
      transactionManifest: claimItemsManifest
    })
      .map(() => {
        waitingForClaimTransaction = false
        readyToClaim = false
        claimed = true
      })
      .mapErr(() => {
        waitingForClaimTransaction = false
      })
  }

  getGiftBoxes()
    .map((amount) => {
      ownedGiftBoxes = amount
      loadingLedgerData = false
    })
    .mapErr(() => {
      loadingLedgerData = false
    })

  const findOneGiftBox = () => Object.entries(ownedGiftBoxes).find(([, { amount }]) => amount > 0)!

  $: totalGiftBoxes = ownedGiftBoxes
    ? Object.values(ownedGiftBoxes).reduce((acc, curr) => acc + curr.amount, 0)
    : undefined

  let selectedGiftBox: string

  const close = context.get('closeMenuItem')

  onMount(() => {
    getRewards($user!.id)
      .map(({ amountOfElements, cardData }) => {
        rewards = {
          amountOfElements,
          cardData
        }

        readyToClaim = true
        loadingClaimStatus = false
      })
      .mapErr(() => {
        loadingClaimStatus = false
      })
  })

  let loadingClaimStatus = true
  let waitingForOpenTransaction = false
  let waitingForClaimTransaction = false
  let waitingForDepositedRewards = false
  let readyToClaim = false
  let claimed = false

  const hideBackButton = context.get('hideBackButton')

  $hideBackButton = true
</script>

<div class="open-gift-box">
  {#if loadingLedgerData || loadingClaimStatus}
    <div class="loading">
      <LoadingSpinner />
    </div>
  {:else if waitingForDepositedRewards}
    <div class="title">
      {$i18n.t('jetty:open-gift-box.opening-gift-box')}...
    </div>
  {:else if claimed}
    {$i18n.t('jetty:open-gift-box.claimed')}
  {:else if readyToClaim}
    <JettyMenuItemPage
      action={{
        text: $i18n.t('quests:claimButton'),
        onClick: claimItems
      }}
      loading={waitingForClaimTransaction}
    >
      <div class="header-text" slot="header">
        <div class="title">
          {$i18n.t('jetty:open-gift-box.gift-box-opened-title')}
        </div>
        <div class="subtitle">
          {$i18n.t('jetty:open-gift-box.gift-box-opened-subtitle')}...
        </div>
      </div>
      <div class="rewards-page">
        <div class="cards">
          <div>
            <TransformCard
              disabled={false}
              selectable={false}
              image={rewards.cardData.image}
              energy={rewards.cardData.energy}
              rarity={rewards.cardData.rarity}
              quality={rewards.cardData.quality}
            />
          </div>

          <div>
            <ElementCard quantity={rewards.amountOfElements} />
          </div>
        </div>
      </div>
    </JettyMenuItemPage>
  {:else if totalGiftBoxes === 0}
    <JettyMenuItemPage
      action={{
        text: $i18n.t('jetty:close'),
        onClick: close
      }}
    >
      {$i18n.t('jetty:open-gift-box.no-boxes')}
    </JettyMenuItemPage>
  {:else if totalGiftBoxes === 1}
    <JettyMenuItemPage
      actions={{
        left: {
          text: $i18n.t('quests:backButton'),
          onClick: close
        },
        right: {
          text: $i18n.t('jetty:open-gift-box.open-gift-box-button'),
          onClick: () => openGiftBox(findOneGiftBox()[0])
        }
      }}
      loading={waitingForOpenTransaction}
    >
      <div class="title">
        {$i18n.t('jetty:open-gift-box.one-box-title')}
      </div>
      <img class="gift-box-image" src={findOneGiftBox()[1].image} alt="A gift box" />
    </JettyMenuItemPage>
  {:else}
    <JettyMenuItemPage
      actions={{
        left: {
          text: $i18n.t('quests:backButton'),
          onClick: close
        },
        right: {
          text: $i18n.t('jetty:open-gift-box.open-gift-box-button'),
          onClick: () => openGiftBox(selectedGiftBox)
        }
      }}
      disabled={!selectedGiftBox}
      loading={waitingForOpenTransaction}
    >
      <div class="title" slot="header">
        {$i18n.t('jetty:open-gift-box.multiple-boxes-title')}
      </div>
      <div class="cards">
        <Carousel let:Item>
          {#each Object.entries(ownedGiftBoxes) as [address, { amount, name, image }]}
            {#if amount > 0}
              <Item>
                <ResourceCard
                  selected={selectedGiftBox === address}
                  on:selected={() => {
                    selectedGiftBox = address
                  }}
                >
                  <div class="gift-box" style:--image={`url(${image})`} />
                  <div slot="text">{$i18n.t('jetty:open-gift-box.gift-box-title', { name })}</div>
                </ResourceCard>
              </Item>
            {/if}
          {/each}
        </Carousel>
      </div>
    </JettyMenuItemPage>
  {/if}
</div>

<style lang="scss">
  .open-gift-box {
    display: flex;
    justify-content: center;
    color: var(--color-light);
    height: 100%;
    padding: var(--spacing-2xl);
  }

  .header-text {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    align-items: center;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .title {
    font-size: var(--text-md3);
    text-align: center;
  }

  .subtitle {
    font-weight: var(--font-weight-bold);
  }

  .gift-box-image {
    height: 13rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .gift-box {
    position: relative;
    width: 100%;
    background: var(--image) center / 80% no-repeat;
  }

  .rewards-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
  }

  .cards {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 3rem;
  }
</style>
