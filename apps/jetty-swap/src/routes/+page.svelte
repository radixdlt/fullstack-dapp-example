<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import Jetty from '../images/jetty.png'
  import Clam from '../images/clam.png'
  import Element from '../images/fragment.png'
  import Icon from '$lib/components/icon/Icon.svelte'
  import SwtichButton from '$lib/components/switchButton/SwitchButton.svelte'
  import TokenSwapInput from '$lib/components/tokenSwapInput/TokenSwapInput.svelte'
  import MarketPrice from '../images/market-price.svg'
  import ArrowIcon from '@images/arrow-down.svg'
  import Button from '$lib/components/button/Button.svelte'
  import { walletData } from '$lib/stores'
  import { allowOnlyPositiveNumberInString } from '$lib/tools'

  const clamResource = { icon: Clam, name: 'Clam' }
  const elementResource = { icon: Element, name: 'Element' }
  let conversionRateClams = 2
  let conversionRateElements = 1

  let fromResource = clamResource
  let toResource = elementResource
  let fromInput = ''
  let toInput = ''
  //todo placeholders for now
  let conversionRateFrom = conversionRateElements
  let conversionRateTo = conversionRateClams

  $: fromInput = allowOnlyPositiveNumberInString(fromInput.toString())
  $: toInput = allowOnlyPositiveNumberInString(toInput.toString())

  const connected = !!$walletData?.accounts[0]
</script>

<section class="swap-section">
  <div class="info-section">
    <div class="info-section-text">
      <p class="radquest-info">{$i18n.t('main:radquest-info')}</p>
      <p class="radquest-info">{$i18n.t('main:radquest-info-goods')}</p>
    </div>
    <img src={Jetty} class="jetty-img" alt="jetty img" />
  </div>
  <div class="swap-card">
    <div>
      <div class="swap-card-header">
        <h3 class="swap-card-title">{$i18n.t('main:swap-card-title')}</h3>
        <div class="market-price">
          <Icon --size="24px" url={MarketPrice} />
          <div class="market-price-text">
            <p class="market-price-estimate">
              {@html $i18n.t('main:marketplace-estimates')}
            </p>
            <div>
              {conversionRateFrom}
              {$i18n.t('main:marketplace_resource', {
                count: conversionRateFrom,
                resource: fromResource.name
              })} = {conversionRateTo}
              {$i18n.t('main:marketplace_resource', {
                count: conversionRateTo,
                resource: toResource.name
              })}
            </div>
          </div>
        </div>
      </div>
      <div class="swap">
        <TokenSwapInput
          bind:value={fromInput}
          cardTitle={$i18n.t('main:from')}
          resource={fromResource}
        ></TokenSwapInput>
        <div class="switch-button-wrapper">
          <SwtichButton
            onClick={() => {
              fromResource =
                fromResource.name === clamResource.name ? elementResource : clamResource
              toResource = toResource.name === clamResource.name ? elementResource : clamResource
              conversionRateFrom =
                conversionRateFrom === conversionRateClams
                  ? conversionRateElements
                  : conversionRateClams
              conversionRateTo =
                conversionRateTo === conversionRateClams
                  ? conversionRateElements
                  : conversionRateClams
            }}
          >
            <Icon --size="20px" url={ArrowIcon} />
          </SwtichButton>
        </div>
        <TokenSwapInput bind:value={toInput} cardTitle={$i18n.t('main:to')} resource={toResource}
        ></TokenSwapInput>
      </div>
    </div>
    <div class="guarantee-text">
      <p>{$i18n.t('main:guarantee-hint')}</p>
      <p>{$i18n.t('main:guarantee-hint-part-2')}</p>
    </div>
    <div class="swap-button">
      <Button width="100%" disabled={!connected}>
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
  p,
  h3 {
    padding: 0;
    margin: 0;
  }

  section {
    display: flex;
    max-width: 48rem;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  img {
    position: absolute;
    z-index: 0;
    left: -1.875rem;
    top: -4.25rem;

    @include mobile {
      width: 12.5rem;
      left: -1rem;
      top: -3.2rem;
    }
  }

  .swap-section {
    @include desktop {
      padding-top: 2rem;
    }
  }

  .info-section {
    display: flex;
    color: black;
    width: 100%;
    position: relative;
    justify-content: end;
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
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;

    @include mobile {
      flex-wrap: wrap;
    }
  }

  .swap-card-title {
    padding-left: 0.813rem;
  }

  .market-price {
    gap: 0.375rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    font-weight: var(--font-weight-regular);

    @media (max-width: 400px) {
      text-align: right;
      width: 100%;
    }
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

  .market-price-text {
    font-size: 15px;
    font-style: normal;
    letter-spacing: 0.14px;
    color: var(--color-background-dark);
    text-align: right;
  }

  .market-price-estimate {
    font-weight: var(--font-weight-bold);
  }

  .radquest-info {
    text-align: left;
    width: max-content;
    font-family: var(--font-main);
    font-size: var(--text-sm);
    font-style: normal;
    font-weight: var(--font-weight-regular);
    letter-spacing: 0.16px;
  }

  .info-section-text {
    margin-top: 1.25rem;
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
