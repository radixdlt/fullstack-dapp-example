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
  let amountFrom = 1
  let amountTo = 2
  let resourceFrom = 'Clam'
  let resourceTo = 'Elements'

  const clamResource = { icon: Clam, name: 'Clam' }
  const elementResource = { icon: Element, name: 'Element' }

  let fromResource = clamResource
  let toResource = elementResource
</script>

<section>
  <div class="info-section">
    <p class="radquest-info">{@html $i18n.t('main:radquest-info')}</p>
    <img src={Jetty} class="jetty-img" alt="jetty img" />
  </div>
  <div class="swap-card">
    <div class="swap-card-header">
      <h3 class="swap-card-title">{$i18n.t('main:swap-card-title')}</h3>
      <div class="market-price">
        <Icon --size="24px" url={MarketPrice} />
        <div class="market-price-text">
          {@html $i18n.t('main:marketplace-estimates', {
            amountFrom,
            amountTo,
            resourceFrom,
            resourceTo
          })}
        </div>
      </div>
    </div>
    <div class="swap">
      <TokenSwapInput cardTitle={$i18n.t('main:from')} resource={fromResource}></TokenSwapInput>
      <div class="switch-button-wrapper">
        <SwtichButton
          onClick={() => {
            fromResource = fromResource.name === clamResource.name ? elementResource : clamResource
            toResource = toResource.name === clamResource.name ? elementResource : clamResource
          }}
        >
          <Icon --size="20px" url={ArrowIcon} />
        </SwtichButton>
      </div>
      <TokenSwapInput cardTitle={$i18n.t('main:to')} resource={toResource}></TokenSwapInput>
    </div>
    <p class="guarantee-text">
      {$i18n.t('main:guarantee-hint')}
    </p>
    <div class="swap-button">
      <Button>
        <p>
          {$walletData?.accounts[0]
            ? $i18n.t('main:swap-button.swap')
            : $i18n.t('main:swap-button.connect-wallet')}
        </p>
      </Button>
    </div>
  </div>
</section>

<style>
  h3 {
    padding: 0;
    margin: 0;
  }

  section {
    display: flex;
    max-width: 768px;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  img {
    position: absolute;
    z-index: 0;
    left: 0;
    top: -30px;
  }

  .info-section {
    display: flex;
    color: black;
    width: 324px;
    position: relative;
    justify-content: end;
  }

  .swap-card {
    z-index: 1;
    background: var(--color-linen);
    border-radius: var(--border-radius-2xl);
    height: 510px;
    width: 342px;
    padding: 18px 15px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .swap-button {
    & button {
      width: 100%;
    }
  }

  .swap-card-header {
    display: flex;
    flex-shrink: 1;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 15px;
  }

  .swap-card-title {
    padding-left: 13px;
  }

  .market-price {
    gap: 6px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    font-weight: var(--font-weight-regular);
  }

  .swap {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 318px;
  }

  .switch-button-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 43px;
    height: 43px;
  }

  .market-price-text {
    font-size: 15px;
    font-style: normal;
    letter-spacing: 0.14px;
    color: var(--color-background-dark);
    text-align: right;
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

  .guarantee-text {
    font-size: var(--text-sm);
    font-weight: var(--font-weight-regular);
    line-height: 18.23px;
    letter-spacing: 0.01em;
    text-align: center;
    color: var(--color-background-dark);
  }
</style>
