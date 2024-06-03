<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import Jetty from '../images/jetty.webp'
  import JettySwap from '../images/jetty-swap.webp'
  import JettyGlow from '../images/jetty-glow.webp'
  import Icon from '$lib/components/icon/Icon.svelte'
  import TokenSwapInput from '$lib/components/tokenSwapInput/TokenSwapInput.svelte'
  import ArrowDownIcon from '../lib/components/icon/ArrowDown.svelte'
  import Button from '$lib/components/button/Button.svelte'
  import { allowOnlyPositiveNumberInString } from '$lib/tools'
  import { entityToResource } from '$lib/utils/entityToResource'
  import { onMount } from 'svelte'
  import { DataRequestBuilder, RadixDappToolkit } from '@radixdlt/radix-dapp-toolkit'
  import { dAppDefinitionAddress } from '$lib/constants'
  import {
    GatewayApiClient,
    type FungibleResourcesCollectionItemVaultAggregated
  } from '@radixdlt/babylon-gateway-api-sdk'
  import { gatewayApi, rdt, walletData } from '$lib/stores'
  import { Addresses, typedError } from 'common'
  import { ResultAsync, ok } from 'neverthrow'
  import { PUBLIC_NETWORK_ID } from '$env/static/public'
  import type { Resource, SwappedResource } from '../types'
  import { previewTransaction, getBalanceChange } from '$lib/utils/previewTranasction'
  import { createSwapManifest } from '$lib/utils/createSwapManifest'
  import Backdrop from '$lib/components/backdrop/Backdrop.svelte'
  import SwapResult from '$lib/components/swapResult/SwapResult.svelte'

  let clamResource: Resource | undefined
  let elementResource: Resource | undefined

  $: swapButtonLoading = false
  let swapResult: SwappedResource | undefined = undefined
  let modal: 'success' | 'failure' | undefined = undefined

  let conversionRateFrom = '1'
  let conversionRateTo = '2'

  let fromInput = ''
  let toInput = ''

  $: fromInput = allowOnlyPositiveNumberInString(fromInput.toString())
  $: connected = !!$walletData?.accounts[0]
  $: arrowFill = connected ? 'var(--color-primary)' : 'var(--color-dark)'

  let balances: FungibleResourcesCollectionItemVaultAggregated[] = []
  $: currentBalance =
    balances.find((b) => b.resource_address === clamResource?.id)?.vaults.items[0].amount ?? 0
  $: enoughBalance = +currentBalance >= +fromInput

  const addresses = Addresses(parseInt(PUBLIC_NETWORK_ID, 0))
  const turnEntityIntoObject = entityToResource(addresses.resources.clamAddress)

  const preview = async (fromInput: string): Promise<string> => {
    if (!elementResource || !clamResource || !$walletData?.accounts[0]) return '0'
    const tx = await ResultAsync.fromPromise(
      previewTransaction({
        amount: fromInput,
        fromTokenAddress: clamResource.id,
        toTokenAddress: elementResource.id,
        swapComponent: addresses.components.jettySwap,
        userAddress: $walletData.accounts[0].address
      }),
      typedError
    )

    //todo add error handling
    if (tx.isErr()) return '0'

    const balanceChange: any = tx.value?.resource_changes.find(
      (change: any) => change.resource_changes[0]?.resource_address === elementResource?.id
    )

    return balanceChange?.resource_changes[0]?.amount as string
  }

  const updateBalances = async (walletAddress?: string) => {
    /* Logged out, reset balances */
    if (!walletAddress) {
      balances = []
      return
    }

    const details = await ResultAsync.fromPromise(
      ($gatewayApi as GatewayApiClient).state.getEntityDetailsVaultAggregated(walletAddress),
      typedError
    )

    //todo add error handling
    if (details.isErr()) return

    balances = details.value.fungible_resources.items.filter((i) =>
      [elementResource, clamResource].some((resource) => resource?.id === i.resource_address)
    )
  }

  onMount(async () => {
    //todo update
    const jettySwapConfig = {
      // networkId is 2 for Stokenet, 1 for Mainnet
      networkId: +PUBLIC_NETWORK_ID,
      applicationVersion: '1.0.0',
      applicationName: 'Jetty Swap',
      applicationDappDefinitionAddress: dAppDefinitionAddress
    }

    $rdt = RadixDappToolkit(jettySwapConfig)
    $gatewayApi = GatewayApiClient.initialize(jettySwapConfig)
    $rdt?.walletApi.setRequestData(DataRequestBuilder.accounts().exactly(1))
    $rdt?.walletApi.walletData$.subscribe((data) => {
      $walletData = data
      updateBalances(data?.accounts[0]?.address)
    })

    const result = await ResultAsync.combine([
      ResultAsync.fromPromise(
        $gatewayApi.state.getEntityMetadata(addresses.resources.elementAddress),
        typedError
      ).map(turnEntityIntoObject),
      ResultAsync.fromPromise(
        $gatewayApi.state.getEntityMetadata(addresses.resources.clamAddress),
        typedError
      ).map(turnEntityIntoObject)
    ])

    //todo add handling
    if (result.isErr()) return

    elementResource = result.value[0]
    clamResource = result.value[1]

    if (!$walletData?.accounts[0]?.address) return
    updateBalances($walletData?.accounts[0].address)

    if (!elementResource || !clamResource) return
    ResultAsync.fromPromise(
      getBalanceChange({
        amount: conversionRateFrom,
        fromTokenAddress: clamResource.id,
        toTokenAddress: elementResource.id,
        swapComponent: addresses.components.jettySwap,
        userAddress: $walletData?.accounts[0].address
      }),
      typedError
    ).map((receiveAmount) => {
      conversionRateTo = receiveAmount
    })
  })

  let timer: NodeJS.Timeout
  const debounce = (v: string) => {
    if (fromInput === '') return

    clearTimeout(timer)
    timer = setTimeout(() => {
      swapButtonLoading = true

      ResultAsync.fromPromise(preview(v), typedError)
        .map((v) => {
          toInput = v
        })
        .mapErr(typedError)
        .andThen(() => {
          swapButtonLoading = false
          return ok('')
        })
    }, 750)
  }

  $: debounce(fromInput)

  const onSwap = async () => {
    if (!elementResource || !clamResource || !$walletData?.accounts[0]) return
    swapButtonLoading = true
    $rdt?.walletApi
      .sendTransaction({
        transactionManifest: createSwapManifest({
          amount: fromInput,
          fromTokenAddress: clamResource.id,
          toTokenAddress: elementResource.id,
          swapComponent: addresses.components.jettySwap,
          userAddress: $walletData.accounts[0]?.address
        })
      })
      .map(() => {
        modal = 'success'
        swapResult = { ...(elementResource as Resource), count: toInput }
        updateBalances($walletData?.accounts[0].address as string)
      })
      .mapErr(() => {
        //todo add handling
      })
      .andThen(() => {
        swapButtonLoading = false
        return ok('')
      })
  }
</script>

{#if modal === 'failure'}
  <Backdrop>
    <SwapResult
      onClose={() => (modal = undefined)}
      title={$i18n.t('main:modal.failure-title')}
      subtitle={$i18n.t('main:modal.failure-desc')}
    />
  </Backdrop>
{/if}
{#if modal === 'success'}
  <Backdrop>
    <SwapResult
      onClose={() => (modal = undefined)}
      title={$i18n.t('main:modal.success-title')}
      subtitle={$i18n.t('main:modal.success-desc', {
        count: +(swapResult?.count ?? '0'),
        resource: swapResult?.name
      })}
    />
  </Backdrop>
{/if}

<section>
  <div class="jetty-img-section">
    <img src={JettyGlow} class="jetty-img-glow" alt="jetty-glow" />
    <img src={Jetty} class="jetty-img" alt="jetty-img" />
  </div>
  <div class="swap-card">
    <div>
      <div class="swap-card-header">
        <img class="jetty-swap-img" src={JettySwap} alt="jetty-swap-logo" />
        <div class="market-price">
          <div>{@html $i18n.t('main:marketplace-estimates')}</div>
          <div class="row">
            <span class="row">
              {conversionRateFrom}
              <Icon --size="18px" url={clamResource?.icon ?? ''} />
            </span>
            =
            <span class="row">
              {conversionRateTo}
              <Icon --size="18px" url={elementResource?.icon ?? ''} />
            </span>
          </div>
        </div>
      </div>
      <div class="swap">
        <TokenSwapInput
          bind:value={fromInput}
          cardTitle={$i18n.t('main:from')}
          resource={clamResource}
          state={enoughBalance ? 'default' : 'error'}
        >
          {#if !enoughBalance}
            <p class="error-text">
              {$i18n.t('main:not-enough-resource', { resource: clamResource?.name })}
            </p>
          {/if}
        </TokenSwapInput>
        <div class="switch-button-wrapper">
          <div class:disabled={!connected} class="switch">
            <ArrowDownIcon fill={arrowFill} />
          </div>
        </div>
        <TokenSwapInput
          bind:value={toInput}
          cardTitle={$i18n.t('main:to')}
          resource={elementResource}
        >
          <p class="estimated-amount">
            <span class="estimated-amount-bold">{$i18n.t('main:estimated-amount-pt1')}</span>
            {$i18n.t('main:estimated-amount-pt2')}
          </p>
        </TokenSwapInput>J
      </div>
    </div>
    <div class="guarantee-text">
      <p>{$i18n.t('main:guarantee-hint')}</p>
      <p>{$i18n.t('main:guarantee-hint-part-2')}</p>
    </div>
    <div class="swap-button">
      <Button
        --width="100%"
        on:click={onSwap}
        disabled={!connected || !fromInput}
        loading={swapButtonLoading}
      >
        <p>
          {connected
            ? $i18n.t('main:swap-button.swap')
            : $i18n.t('main:swap-button.connect-wallet')}
        </p>
      </Button>
    </div>
  </div>
</section>

<style lang="scss">
  p {
    padding: 0;
    margin: 0;
  }

  section {
    display: flex;
    max-width: 48rem;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .jetty-img {
    position: absolute;
    z-index: 0;
    top: -1.75rem;
    width: 20rem;

    @include mobile {
      position: absolute;
      width: 244px;
      top: -1.5rem;
      left: -1.5rem;
    }
  }

  .jetty-img-glow {
    height: 400px;
    width: 500px;
    position: absolute;
    top: -1.5rem;

    @include mobile {
      left: -3rem;
    }
  }

  .jetty-img-section {
    display: flex;
    color: black;
    width: 100%;
    justify-content: end;
    position: relative;
    height: 109px;

    @include desktop {
      height: 129px;
      justify-content: center;
    }
  }

  .swap-card {
    z-index: 1;
    background: var(--color-linen);
    border-radius: var(--border-radius-2xl);
    min-height: 33.125rem;
    padding: 1.125rem 0.938rem;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;
    min-width: 17.625rem;
    max-width: 21.375rem;
    width: 80vw;

    @include desktop {
      margin-top: 1rem;
      width: 21.375rem;
    }
  }

  .swap-card-header {
    display: flex;
    flex-shrink: 1;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;
    gap: 1.375rem;
  }

  .market-price {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: 500;
    line-height: 20px;
    font-size: var(--text-sm);
    font-style: normal;
    letter-spacing: 0.14px;
    color: var(--color-background-dark);
    text-align: center;
  }

  .swap {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .switch-button-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 2.688rem;
    height: 2.688rem;
  }

  .row {
    display: flex;
    gap: 0.25rem;
  }

  .switch {
    display: flex;
    white-space: nowrap;
    padding: 0.8rem;
    justify-content: center;
    align-items: center;
    border-radius: var(--border-radius-3xl);
    height: 2.6875rem;
    width: 2.6875rem;
    background: var(--color-linen);
  }

  .switch {
    display: flex;
    white-space: nowrap;
    padding: 0.8rem;
    justify-content: center;
    align-items: center;
    border-radius: var(--border-radius-3xl);
    height: 2.6875rem;
    width: 2.6875rem;
    background: var(--color-linen);
  }

  .estimated-amount {
    color: var(--color-background-dark);
    font-family: var(--font-main);
    font-size: var(--text-sm);
    font-style: normal;
    font-weight: var(--font-weight-regular);
  }

  .estimated-amount-bold {
    font-weight: var(--font-weight-bold);
  }

  .guarantee-text {
    font-size: var(--text-xs);
    font-weight: var(--font-weight-regular);
    line-height: 18.23px;
    letter-spacing: 0.01em;
    text-align: center;
    color: var(--color-background-dark);
    margin: 1.5rem 0rem;

    @include desktop {
      margin: 1.5rem 0.5rem;
    }
  }
</style>
