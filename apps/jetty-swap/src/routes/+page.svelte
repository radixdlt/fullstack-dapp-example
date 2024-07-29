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
  import { DataRequestBuilder, Logger, RadixDappToolkit } from '@radixdlt/radix-dapp-toolkit'
  import { type FungibleResourcesCollectionItemVaultAggregated } from '@radixdlt/babylon-gateway-api-sdk'
  import { rdt, walletData, gatewayApi } from '$lib/stores'
  import { Addresses, GatewayApi } from 'common'
  import { env } from '$env/dynamic/public'
  import type { Resource, SwappedResource } from '../types'
  import { getBalanceChange, getPrice, getTransactionResult } from '$lib/utils/previewTranasction'
  import { createSwapManifest } from '$lib/utils/createSwapManifest'
  import Backdrop from '$lib/components/backdrop/Backdrop.svelte'
  import SwapResult from '$lib/components/swapResult/SwapResult.svelte'
  import SwapCardHeader from '$lib/components/swapCardHeader/SwapCardHeader.svelte'
  import { publicConfig } from '$lib/utils/config'

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
  let ottercoinResource: Resource | undefined

  $: swapButtonLoading = false
  let swapResult: SwappedResource | undefined = undefined
  let modal: 'success' | 'failure' | undefined = undefined

  let conversionRateFrom = '1'
  let conversionRateTo = '10'

  let fromInput = ''
  let toInput = ''

  $: fromInput = allowOnlyPositiveNumberInString(fromInput?.toString() || '')
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
        [ottercoinResource, clamResource].some((resource) => resource?.id === item.resource_address)
      )
    }
  }

  const getConversionRate = async () => {
    conversionRateTo = (await getPrice(swapComponent)) ?? '10'
  }

  onMount(() => {
    const swapConfig = {
      networkId: +env.PUBLIC_NETWORK_ID,
      applicationVersion: '1.0.0',
      applicationName: themedResources.applicationName,
      applicationDappDefinitionAddress: isJetty
        ? publicConfig.accounts.jettySwapDappDefinition.address
        : publicConfig.accounts.lettySwapDappDefinition.address
    }

    $rdt = RadixDappToolkit({ ...swapConfig, logger: Logger(1) })
    $rdt.buttonApi.setTheme(isJetty ? 'radix-blue' : 'white')
    if (!isJetty) {
      $rdt.buttonApi.setMode('dark')
    }
    $gatewayApi = GatewayApi(parseInt(env.PUBLIC_NETWORK_ID, 0))
    $rdt?.walletApi.setRequestData(DataRequestBuilder.accounts().exactly(1))
    $rdt?.walletApi.walletData$.subscribe((data) => {
      $walletData = data
      updateBalances(data?.accounts[0]?.address)
    })

    Promise.all([
      $gatewayApi.callApi('getEntityMetadata', addresses.resources.ottercoinAddress),
      $gatewayApi.callApi('getEntityMetadata', addresses.resources.clamAddress)
    ]).then(([ottercoinMetadataResult, clamMetadataResult]) => {
      if (ottercoinMetadataResult.isOk()) {
        ottercoinResource = turnEntityIntoObject(ottercoinMetadataResult.value)
      }
      if (clamMetadataResult.isOk()) {
        clamResource = turnEntityIntoObject(clamMetadataResult.value)
      }
    })

    if ($walletData?.accounts[0]?.address) {
      updateBalances($walletData?.accounts[0].address)
    }

    const intervals = [
      setInterval(() => {
        priceChange = parseFloat((Math.random() * 200 - 100).toFixed(1)).toString()
        isGoingUp = Number(priceChange) > 0
      }, 1000),

      setInterval(() => {
        priceChange = parseFloat((Math.random() * 200 - 100).toFixed(1)).toString()
        isGoingUp = Number(priceChange) > 0
      }, 1000),

      setInterval(() => {
        getConversionRate()
      }, 1000)
    ]
    return () => {
      intervals.forEach(clearInterval)
    }
  })

  let timer: NodeJS.Timeout
  const debounce = (amount: string) => {
    clearInterval(timer)
    if (fromInput === '') toInput = ''
    else {
      timer = setInterval(() => {
        getBalanceChange(
          {
            amount,
            fromTokenAddress: clamResource?.id as string,
            swapComponent,
            userAccountAddress: $walletData?.accounts[0].address as string
          },
          addresses.resources.ottercoinAddress
        ).then((amount) => {
          toInput = amount
        })
      }, 1000)
    }
  }

  $: debounce(fromInput)

  const onSwap = async () => {
    if (!ottercoinResource || !clamResource || !$walletData?.accounts[0]) return
    swapButtonLoading = true
    const address = $walletData.accounts[0]?.address!
    const transactionManifest = createSwapManifest({
      amount: fromInput,
      fromTokenAddress: clamResource.id,
      swapComponent,
      userAccountAddress: address
    })
    $rdt?.walletApi
      .sendTransaction({
        transactionManifest
      })
      .andThen(({ transactionIntentHash }) =>
        getTransactionResult(transactionIntentHash, addresses.resources.ottercoinAddress, address)
      )
      .map((output) => {
        modal = 'success'
        swapResult = { ...(ottercoinResource as Resource), count: output! }
        updateBalances($walletData?.accounts[0].address as string)
        swapButtonLoading = false
        fromInput = ''
        toInput = ''
      })
      .mapErr((err) => {
        console.error(err)
        swapButtonLoading = false
      })
  }

  //todo to be replaced once we have oracle
  let isGoingUp = true
  let priceChange = '0'
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
      ottercoinResourceIcon={ottercoinResource?.icon}
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
          {:else}
            <p class="balance" class:letty-balance={!isJetty}>
              {$i18n.t('main:balance-amount', {
                count: parseInt(currentBalance.toString()),
                resource: clamResource?.name
              })}
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
          resource={ottercoinResource}
        >
          <p class="estimated-amount">
            <span class="estimated-amount-bold">{$i18n.t('main:estimated-amount-pt1')}</span>
            {$i18n.t('main:estimated-amount-pt2')}
          </p>
        </TokenSwapInput>
      </div>
    </div>
    {#if !isJetty}
      <div class:guarantee-text-letty={!isJetty} class={`guarantee-text`}>
        <p>{$i18n.t('main:guarantee-hint')}</p>
        <p>{$i18n.t('main:guarantee-hint-part-2')}</p>
      </div>
    {/if}
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
    top: -3rem;
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
    height: 6rem;

    @include desktop {
      height: 8rem;
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

  .balance {
    font-size: var(--text-sm);
    color: var(--color-dark);
  }

  .letty-balance {
    font-weight: var(--font-weight-light);
  }
</style>
