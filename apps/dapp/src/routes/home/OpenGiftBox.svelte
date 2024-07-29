<script lang="ts" context="module">
  import type { StateKeyValueStoreDataResponse } from '@radixdlt/babylon-gateway-api-sdk'
  const gateway = GatewayApi(publicConfig.networkId)
  export type GiftBoxV2Status = {
    depositedRewards: number
    claimedRewards: number
    recalledRewards: number
    openedGiftBoxes: number
  }

  const getLastGiftBoxContent = (data: StateKeyValueStoreDataResponse) => {
    const openedBoxes = (data.entries[0]?.value.programmatic_json as any)?.elements

    if (!openedBoxes) return okAsync(undefined)

    const entries = openedBoxes[openedBoxes.length - 1]?.entries

    if (!entries) return okAsync(undefined)

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
  }

  const getCardData = (morphCardId: string) =>
    gateway
      .callApi('getNonFungibleData', publicConfig.resources.morphEnergyCardAddress, [morphCardId])
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
          cardData
        }
      })

  export const getV1Rewards = (userId: string) =>
    gateway
      .getKeyValueStoreDataForUser(publicConfig.components.giftBoxRecordsKeyValueStore, userId)
      .andThen((data) => getLastGiftBoxContent(data))
      .andThen((data) => {
        if (!data) return okAsync(undefined)
        const { amountOfElements, morphCardId } = data
        return getCardData(morphCardId).map((cardData) => ({
          amountOfElements,
          ...cardData
        }))
      })

  export const getGiftBoxV2RewardsStatus = (userId: string) =>
    gateway.getGiftBoxV2RewardsStatus(userId)

  export const isV2ReadyToClaim = (data: GiftBoxV2Status) =>
    data.depositedRewards - data.claimedRewards - data.recalledRewards > 0

  export const isV2PendingDeposit = (data: GiftBoxV2Status) =>
    data.openedGiftBoxes - data.depositedRewards > 0

  export const getGiftBoxStatus = (userId: string) =>
    ResultAsync.combineWithAllErrors([getV1Rewards(userId), getGiftBoxV2RewardsStatus(userId)]).map(
      ([v1, v2]) =>
        v1
          ? { version: 'v1' as const, giftBoxRewardsAvailable: true, waitingForGiftBox: false }
          : {
              version: 'v2' as const,
              giftBoxRewardsAvailable: isV2ReadyToClaim(v2),
              waitingForGiftBox: isV2PendingDeposit(v2)
            }
    )
</script>

<script lang="ts">
  import { publicConfig } from '$lib/public-config'
  import { GatewayApi, getGiftBoxRewardsFromMapSbor } from 'common'
  import { user } from '../../stores'
  import type { TransactionReceipt } from '@radixdlt/babylon-core-api-sdk'
  import type { ProgrammaticScryptoSborValueTuple } from '@radixdlt/babylon-gateway-api-sdk'
  import LoadingSpinner from '$lib/components/loading-spinner/LoadingSpinner.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import JettyMenuItemPage from './JettyMenuItemPage.svelte'
  import { sendTransaction } from '$lib/rdt'
  import Carousel from '$lib/components/carousel/Carousel.svelte'
  import { context } from '$lib/components/jetty-menu/JettyMenu.svelte'
  import { okAsync, ResultAsync } from 'neverthrow'
  import { getBoolDataValue, getStringDataValue } from './CreateRadMorphs.svelte'
  import TransformCard from '$lib/components/resource-card/TransformCard.svelte'
  import ElementCard from '$lib/components/resource-card/ElementCard.svelte'
  import { onMount } from 'svelte'
  import { webSocketClient } from '$lib/websocket-client'
  import BoxCard from '$lib/components/resource-card/BoxCard.svelte'
  import { messageApi } from '$lib/api/message-api'
  import { waitingWarning } from '$lib/utils/waiting-warning'
  import { GiftBoxManifests } from '$lib/helpers/giftbox-manifests'

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

  $: manifests = GiftBoxManifests($user!.id, $user!.accountAddress!)

  const getV2Rewards = () =>
    gateway.preview(manifests.claimItemsV2()).andThen((data) => {
      const receipt = data.receipt as TransactionReceipt
      const event = receipt.events?.find(
        ({ type }) =>
          type.name === 'GiftBoxRewardsClaimedEvent' &&
          type.emitter.type === 'Method' &&
          type.emitter.entity.entity_address === publicConfig.components.giftBoxOpenerV2
      )
      if (!event) return okAsync(undefined)
      const sborJson = event?.data.programmatic_json as ProgrammaticScryptoSborValueTuple
      const arrayValue = (sborJson.fields.find((field) => field.kind === 'Array') as any)
        ?.elements[0] as ProgrammaticScryptoSborValueTuple
      const targetMapSbor = arrayValue?.fields[1]
      const extractedValues = getGiftBoxRewardsFromMapSbor(targetMapSbor)
      const amountOfElements = extractedValues.fungibles[0].amount
      const morphCardId = extractedValues.nonFungibles[0].localIds[0]
      return getCardData(morphCardId).map((cardData) => ({
        amountOfElements,
        ...cardData
      }))
    })

  const openGiftBox = (giftBoxAddress: string) => {
    waitingForOpenTransaction = true

    sendTransaction({
      transactionManifest: manifests.openGiftBoxV2(giftBoxAddress)
    })
      .map(() => {
        waitingForOpenTransaction = false
        waitingForDepositedRewards = true
      })
      .mapErr(() => {
        waitingForOpenTransaction = false
        waitingForDepositedRewards = false
      })
  }

  const claimItems = () => {
    waitingForClaimTransaction = true
    sendTransaction({
      transactionManifest:
        readyToClaim === 'v1'
          ? manifests.claimItemsV1(rewards.amountOfElements)
          : manifests.claimItemsV2(rewards.amountOfElements)
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

  const findOneGiftBox = () => Object.entries(ownedGiftBoxes).find(([, { amount }]) => amount > 0)!

  $: totalGiftBoxes = ownedGiftBoxes
    ? Object.values(ownedGiftBoxes).reduce((acc, curr) => acc + curr.amount, 0)
    : undefined

  let selectedGiftBox: string
  let timeoutId: ReturnType<typeof setTimeout>

  const close = context.get('closeMenuItem')

  const updatePendingV2Rewards = () => {
    getV2Rewards().map((rewardsData) => {
      if (!rewardsData) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => updatePendingV2Rewards(), 700)
        return
      }
      waitingForDepositedRewards = false
      rewards = rewardsData
      readyToClaim = 'v2'
      loadingClaimStatus = false
    })
  }

  onMount(() => {
    const gateway = GatewayApi(publicConfig.networkId)

    const unsubscribe = $webSocketClient!.onMessageType('GiftBoxesDeposited', (msg) => {
      updatePendingV2Rewards()
      messageApi.markAsSeen([msg.id])
    })

    ResultAsync.combineWithAllErrors([
      gateway.getAccountGiftBoxes($user?.accountAddress!),
      getGiftBoxStatus($user?.id!)
    ])
      .map(([data, status]) => {
        ownedGiftBoxes = data
        loadingLedgerData = false
        waitingForDepositedRewards = status.waitingForGiftBox
        if (status.giftBoxRewardsAvailable) {
          ;(status.version === 'v1' ? getV1Rewards($user!.id) : getV2Rewards()).map(
            (rewardsData) => {
              if (!rewardsData) {
                loadingClaimStatus = false
                return
              }
              rewards = rewardsData
              readyToClaim = status.version
              loadingClaimStatus = false
            }
          )
        } else {
          loadingClaimStatus = false
        }
      })
      .mapErr(() => {
        loadingLedgerData = false
      })

    return () => {
      waitingWarning(false)
      clearTimeout(timeoutId)
      unsubscribe?.()
    }
  })

  let loadingClaimStatus = true
  let waitingForOpenTransaction = false
  let waitingForClaimTransaction = false
  let waitingForDepositedRewards = false
  let readyToClaim: false | 'v1' | 'v2' = false
  let readyToOpen = false
  let claimed = false

  $: waitingWarning(waitingForDepositedRewards)
</script>

<div class="open-gift-box">
  {#if loadingLedgerData || loadingClaimStatus}
    <div class="loading">
      <LoadingSpinner dark />
    </div>
  {:else if waitingForDepositedRewards}
    <JettyMenuItemPage>
      <div slot="header" class="title">
        {$i18n.t('jetty:open-gift-box.opening-gift-box')}
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
          {$i18n.t('jetty:open-gift-box.gift-box-opened-subtitle')}
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
      <div class="padding">
        {$i18n.t('jetty:open-gift-box.no-boxes')}
      </div>
    </JettyMenuItemPage>
  {:else if readyToOpen || totalGiftBoxes === 1}
    <div class="page-with-subtitle">
      <JettyMenuItemPage
        actions={{
          left: {
            text: $i18n.t('quests:backButton'),
            onClick: () => {
              if (totalGiftBoxes === 1) close()
              else readyToOpen = false
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

  .padding {
    padding: var(--spacing-2xl);

    @include mobile {
      padding: var(--spacing-xl);
    }
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
    @include smallMobile {
      transform: translateY(-1rem);
    }
  }
</style>
