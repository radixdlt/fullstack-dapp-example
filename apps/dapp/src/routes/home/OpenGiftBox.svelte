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
                id: morphCardId,
                name: getStringDataValue('name')(fields),
                energy: getStringDataValue('energy_type')(fields),
                imageUrl: getStringDataValue('key_image_url')(fields),
                rarity: getStringDataValue('rarity')(fields),
                quality: parseInt(getStringDataValue('quality')(fields)),
                limitedEdition: getBoolDataValue('limited_edition')(fields)
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
  import { GatewayApi, type Messages } from 'common'
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
  import { getBoolDataValue, getStringDataValue } from './CreateRadMorphs.svelte'
  import TransformCard from '$lib/components/resource-card/TransformCard.svelte'
  import ElementCard from '$lib/components/resource-card/ElementCard.svelte'
  import { onMount } from 'svelte'
  import { webSocketClient } from '$lib/websocket-client'
  import BoxCard from '$lib/components/resource-card/BoxCard.svelte'

  let loadingLedgerData = true
  let ownedGiftBoxes: {
    [address: string]: {
      amount: number
      name: string
      imageUrl: string
    }
  }

  let rewards: {
    amountOfElements: number
    cardData: {
      id: string
      name: string
      energy: string
      imageUrl: string
      rarity: string
      quality: number
      limitedEdition: boolean
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
              imageUrl: (
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

        let resolveDeposited: (message: Messages['GiftBoxDeposited']) => void

        const promise = new Promise<Messages['GiftBoxDeposited']>((resolve) => {
          resolveDeposited = resolve
        })

        const unsub = $webSocketClient!.onMessage((msg) => {
          if (msg.type === 'GiftBoxDeposited') {
            resolveDeposited(msg)
          }
        })

        return ResultAsync.fromSafePromise(promise).map((data) => {
          unsub()
          return data
        })
      })
      .map((data) => {
        const amountOfElements = data.rewards.fungibles[0].amount
        const [id] = data.rewards.nonFungibles[0].localIds
        const { keyImageUrl: imageUrl, energyType: energy, ...energyCard } = data.energyCard
        const cardData = { ...energyCard, imageUrl, energy, id }
        return { amountOfElements, cardData }
      })
      .map(({ amountOfElements, cardData }) => {
        rewards = {
          amountOfElements,
          cardData
        }
        waitingForOpenTransaction = false
        waitingForDepositedRewards = false
        readyToClaim = true
      })
      .mapErr(() => {
        waitingForOpenTransaction = false
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
  let readyToOpen = false
  let claimed = false
</script>

<div class="open-gift-box">
  {#if loadingLedgerData || loadingClaimStatus}
    <div class="loading">
      <LoadingSpinner dark />
    </div>
  {:else if waitingForDepositedRewards}
    <JettyMenuItemPage>
      <div slot="header" class="title padding">
        {$i18n.t('jetty:open-gift-box.opening-gift-box')}...
      </div>

      <div class="loading">
        <lottie-player
          autoplay
          loop
          mode="normal"
          src="/lottie/loading.json"
          style:width="250px"
          style:height="250px"
        />
      </div>
    </JettyMenuItemPage>
  {:else if claimed}
    <JettyMenuItemPage
      action={{
        text: $i18n.t('jetty:close'),
        onClick: close
      }}
    >
      <div slot="header">
        {$i18n.t('jetty:open-gift-box.claimed')}
      </div>
    </JettyMenuItemPage>
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
              card={rewards.cardData}
              showClassName
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
  {:else if readyToOpen || totalGiftBoxes === 1}
    <div class="page-with-subtitle">
      <JettyMenuItemPage
        actions={{
          left: {
            text: $i18n.t('quests:backButton'),
            onClick: () => {
              readyToOpen = false
            }
          },
          right: {
            text: $i18n.t('jetty:open-gift-box.open-gift-box-button'),
            onClick: () => openGiftBox(totalGiftBoxes === 1 ? findOneGiftBox()[0] : selectedGiftBox)
          }
        }}
        loading={waitingForOpenTransaction}
      >
        <div slot="header" class="title">
          {$i18n.t('jetty:open-gift-box.one-box-title', {
            giftBox:
              totalGiftBoxes === 1 ? findOneGiftBox()[1].name : ownedGiftBoxes[selectedGiftBox].name
          })}
        </div>
        <div class="gift-box-image">
          <lottie-player
            autoplay
            loop
            mode="normal"
            src={`/lottie/GiftBox-${
              totalGiftBoxes === 1 ? findOneGiftBox()[1].name : ownedGiftBoxes[selectedGiftBox].name
            }.json`}
            style="width: 320px"
          />
        </div>
      </JettyMenuItemPage>
      <div class="sub">
        {$i18n.t('jetty:create-radmorphs.open-gift-box-subtitles')}
      </div>
    </div>
  {:else}
    <JettyMenuItemPage
      actions={{
        left: {
          text: $i18n.t('quests:backButton'),
          onClick: close
        },
        right: {
          text: $i18n.t('quests:continueButton'),
          onClick: () => (readyToOpen = true)
        }
      }}
      disabled={!selectedGiftBox}
      loading={waitingForOpenTransaction}
    >
      <div class="title" slot="header">
        {$i18n.t('jetty:open-gift-box.multiple-boxes-title')}
      </div>
      <div class="cards">
        <Carousel let:Item stepSize={200}>
          {#each Object.entries(ownedGiftBoxes) as [address, { amount, name, imageUrl: image }]}
            {#if amount > 0}
              <Item>
                <BoxCard
                  name={name + ' Gift Box'}
                  selected={selectedGiftBox === address}
                  on:selected={() => {
                    selectedGiftBox = address
                  }}
                  {image}
                />
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
    color: var(--color-light);
    height: 100%;
    width: 100%;
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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .rewards-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
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

  .cards {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    transform: translateY(-2rem);
  }
</style>
