<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import Jetty from '../images/jetty.webp'
  import Letty from '../images/letty.webp'
  import JettySwap from '../images/jetty-logo.webp'
  import LettySwap from '../images/letty-logo.webp'
  import JettyGlow from '../images/jetty-glow.webp'
  import LettyGlow from '../images/letty-glow.webp'
  import TokenSwapInput from '$lib/components/tokenSwapInput/TokenSwapInput.svelte'
  import ArrowDownIcon from '../lib/components/icon/ArrowDown.svelte'
  import Button from '$lib/components/button/Button.svelte'
  import { allowOnlyPositiveNumberInString } from '$lib/tools'
  import { entityToResource } from '$lib/utils/entityToResource'
  import { onMount } from 'svelte'
  import { DataRequestBuilder, RadixDappToolkit } from '@radixdlt/radix-dapp-toolkit'
  import { jettySwapDefinitionAddress, lettySwapDefinitionAddress } from '$lib/constants'
  import { type FungibleResourcesCollectionItemVaultAggregated } from '@radixdlt/babylon-gateway-api-sdk'
  import { rdt, walletData, gatewayApi } from '$lib/stores'
  import { Addresses, GatewayApi } from 'common'
  import { ok } from 'neverthrow'
  import { env } from '$env/dynamic/public'
  import type { Resource, SwappedResource } from '../types'
  import { getBalanceChange } from '$lib/utils/previewTranasction'
  import { createSwapManifest } from '$lib/utils/createSwapManifest'
  import Backdrop from '$lib/components/backdrop/Backdrop.svelte'
  import SwapResult from '$lib/components/swapResult/SwapResult.svelte'
  import SwapCardHeader from '$lib/components/swapCardHeader/SwapCardHeader.svelte'

  const ThemedResources = {
    JETTY: {
      glow: JettyGlow,
      mascot: Jetty,
      logo: JettySwap,
      applicationName: 'Jetty Swap'
    },
    LETTY: {
      glow: LettyGlow,
      mascot: Letty,
      logo: LettySwap,
      applicationName: 'Letty Swap'
    }
  }
  const isJetty = env.PUBLIC_SWAP_VARIATION === 'JETTY'
  const themedResources = ThemedResources[env.PUBLIC_SWAP_VARIATION as 'JETTY' | 'LETTY']

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

  let balances: FungibleResourcesCollectionItemVaultAggregated[] = []
  $: currentBalance =
    balances.find((b) => b.resource_address === clamResource?.id)?.vaults.items[0].amount ?? 0
  $: enoughBalance = +currentBalance >= +fromInput
  $: arrowFill = !enoughBalance || !connected ? 'var(--color-disabled)' : 'var(--color-primary)'

  const addresses = Addresses(parseInt(env.PUBLIC_NETWORK_ID, 0))
  const swapComponent = isJetty ? addresses.components.jettySwap : addresses.components.lettySwap
  const turnEntityIntoObject = entityToResource(addresses.resources.clamAddress)

  const updateBalances = async (walletAddress?: string) => {
    /* Logged out, reset balances */
    if (!walletAddress) {
      balances = []
      return
    }

    const details = await ($gatewayApi as GatewayApi).callApi('getEntityDetailsVaultAggregated', [
      walletAddress
    ])
    if (details.isOk()) {
      balances = details.value[0].fungible_resources.items.filter((item) =>
        [elementResource, clamResource].some((resource) => resource?.id === item.resource_address)
      )
    }
  }

  onMount(async () => {
    const swapConfig = {
      networkId: +env.PUBLIC_NETWORK_ID,
      applicationVersion: '1.0.0',
      applicationName: themedResources.applicationName,
      applicationDappDefinitionAddress: isJetty
        ? jettySwapDefinitionAddress
        : lettySwapDefinitionAddress
    }

    $rdt = RadixDappToolkit(swapConfig)
    $rdt.buttonApi.setTheme(isJetty ? 'radix-blue' : 'white')
    $gatewayApi = GatewayApi(parseInt(env.PUBLIC_NETWORK_ID, 0))
    $rdt?.walletApi.setRequestData(DataRequestBuilder.accounts().exactly(1))
    $rdt?.walletApi.walletData$.subscribe((data) => {
      $walletData = data
      updateBalances(data?.accounts[0]?.address)
    })

    try {
      const [elementMetadataResult, clamMetadataResult] = await Promise.all([
        $gatewayApi.callApi('getEntityMetadata', addresses.resources.elementAddress),
        $gatewayApi.callApi('getEntityMetadata', addresses.resources.clamAddress)
      ])

      if (elementMetadataResult.isOk()) {
        elementResource = turnEntityIntoObject(elementMetadataResult.value)
      }
      if (clamMetadataResult.isOk()) {
        clamResource = turnEntityIntoObject(clamMetadataResult.value)
      }

      if (!$walletData?.accounts[0]?.address) return
      await updateBalances($walletData?.accounts[0].address)

      if (!elementResource || !clamResource || !currentBalance) return

      const receiveAmount = await getBalanceChange({
        amount: conversionRateFrom,
        fromTokenAddress: clamResource.id,
        toTokenAddress: elementResource.id,
        swapComponent,
        userAddress: $walletData?.accounts[0].address
      })

      conversionRateTo = receiveAmount
    } catch (error) {}
  })

  let timer: NodeJS.Timeout
  const debounce = (amount: string) => {
    if (fromInput === '') return

    clearTimeout(timer)
    timer = setTimeout(() => {
      swapButtonLoading = true
      getBalanceChange({
        amount,
        fromTokenAddress: clamResource?.id as string,
        toTokenAddress: elementResource?.id as string,
        swapComponent,
        userAddress: $walletData?.accounts[0].address as string
      })
        .then((amount) => {
          toInput = amount
        })
        .finally(() => {
          swapButtonLoading = false
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
          swapComponent,
          userAddress: $walletData.accounts[0]?.address
        })
      })
      .map(() => {
        modal = 'success'
        swapResult = { ...(elementResource as Resource), count: toInput }
        updateBalances($walletData?.accounts[0].address as string)
        swapButtonLoading = false
      })
      .mapErr(() => (swapButtonLoading = false))
  }

  //todo to be replaced once we have oracle
  $: isGoingUp = true
  $: priceChange = '0'

  const rotateMarketEstimate = () => {
    setInterval(() => {
      priceChange = parseFloat((Math.random() * 200 - 100).toFixed(1)).toString()
      isGoingUp = Number(priceChange) > 0
    }, 1000)
  }

  rotateMarketEstimate()
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
  <div class="mascot-img-section">
    <img src={themedResources.glow} class="mascot-img-glow" alt="mascot-glow" />
    <img src={themedResources.mascot} class="mascot-img" alt="mascot-img" />
  </div>
  <div class="swap-card">
    <SwapCardHeader
      clamResourceIcon={clamResource?.icon}
      {conversionRateFrom}
      {conversionRateTo}
      elementResourceIcon={elementResource?.icon}
      {isGoingUp}
      {isJetty}
      logo={themedResources.logo}
      {priceChange}
    />
    <div>
      <div class="swap">
        <TokenSwapInput
          disabled={!connected}
          bind:value={fromInput}
          cardTitle={$i18n.t('main:from')}
          resource={clamResource}
          state={enoughBalance ? 'default' : 'error'}
        >
          {#if !enoughBalance}
            <p class="error-text not-enough-resource">
              {$i18n.t('main:not-enough-resource', { resource: clamResource?.name })}
            </p>
          {/if}
        </TokenSwapInput>
        <div class="switch-wrapper">
          <div class:disabled-switch={!connected} class="switch">
            <ArrowDownIcon fill={arrowFill} />
          </div>
        </div>
        <TokenSwapInput
          disabled
          bind:value={toInput}
          cardTitle={$i18n.t('main:to')}
          resource={elementResource}
        >
          <p class="estimated-amount">
            <span class="estimated-amount-bold">{$i18n.t('main:estimated-amount-pt1')}</span>
            {$i18n.t('main:estimated-amount-pt2')}
          </p>
        </TokenSwapInput>
      </div>
    </div>
    <div class:guarantee-text-letty={!isJetty} class={`guarantee-text`}>
      <p>{$i18n.t('main:guarantee-hint')}</p>
      <p>{$i18n.t('main:guarantee-hint-part-2')}</p>
    </div>
    <div class="swap-button">
      <Button
        --width="100%"
        on:click={onSwap}
        variation={isJetty ? 'primary' : 'tertiary'}
        disabled={!connected || !fromInput || !enoughBalance}
        loading={swapButtonLoading}
      >
        <p class:uppercase={isJetty}>
          {connected
            ? $i18n.t('main:swap-button.swap')
            : $i18n.t('main:swap-button.connect-wallet')}
        </p>
      </Button>
    </div>
  </div>
  <div class="newbie-hint">
    {$i18n.t(`main:newbie-hint-${isJetty ? 'jetty' : 'letty'}`)}
    <a href={addresses.dapps.radquest.url}>Radquest site</a>.
  </div>
</section>

<style lang="scss">
  p {
    padding: 0;
    margin: 0;
  }

  a {
    text-decoration: underline;
    color: inherit;
  }

  section {
    display: flex;
    max-width: 48rem;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .mascot-img {
    position: absolute;
    z-index: 0;
    top: 1rem;
    width: 20rem;

    @include mobile {
      width: 15.25rem;
      left: 0rem;
    }

    @media (max-width: 400px) {
      left: -3rem;
    }
  }

  .mascot-img-glow {
    height: 25rem;
    width: 31.25rem;
    position: absolute;
    top: -1.5rem;

    @include mobile {
      left: -3rem;
    }
  }

  .mascot-img-section {
    display: flex;
    color: black;
    width: 100%;
    justify-content: end;
    position: relative;
    height: 6.813rem;

    @include desktop {
      height: 8.063rem;
      justify-content: center;
    }
  }

  .swap-card {
    z-index: 1;
    background: var(--color-linen);
    border-radius: var(--border-radius-2xl);
    min-height: 33.125rem;
    padding: 1.125rem 0.938rem;
    padding-top: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;
    min-width: 17.625rem;
    max-width: 25rem;
    width: 80vw;

    @include desktop {
      margin-top: 1rem;
      width: 25rem;
    }
  }

  .swap {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .switch-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 2.688rem;
    height: 2.688rem;
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
    line-height: 1.125rem;
    letter-spacing: 0.01em;
    text-align: center;
    font-weight: var(--font-weight-regular);
    color: var(--color-background-dark);
    margin: 1.5rem 0rem;

    @include desktop {
      margin: 1.5rem 0.5rem;
    }
  }

  .uppercase {
    text-transform: uppercase;
  }

  .newbie-hint {
    font-size: var(--text-xs);
    text-align: center;
    word-break: break-word;
    line-height: 21px;
    letter-spacing: 0.001em;
    text-align: center;
    max-width: 400px;
    width: 400px;
    padding: 38px 31px;
    color: var(--color-dark);

    @include mobile {
      padding: 38px 0px 0px 0px;
      min-width: 260px;
      width: 90%;
    }
  }

  .not-enough-resource {
    font-size: var(--text-xs);
  }
</style>
