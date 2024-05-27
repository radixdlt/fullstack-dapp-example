<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import Jetty from '../images/jetty.webp'
  import JettySwap from '../images/jetty-swap.webp'
  import JettyGlow from '../images/jetty-glow.webp'
  import Clam from '../images/clam.png'
  import Element from '../images/fragment.png'
  import Icon from '$lib/components/icon/Icon.svelte'
  import TokenSwapInput from '$lib/components/tokenSwapInput/TokenSwapInput.svelte'
  import ArrowDownIcon from '../lib/components/icon/ArrowDown.svelte'
  import Button from '$lib/components/button/Button.svelte'
  import { walletData } from '$lib/stores'
  import { allowOnlyPositiveNumberInString } from '$lib/tools'

  const clamResource = { icon: Clam, name: 'Clam', id: '1' }
  const elementResource = { icon: Element, name: 'Element', id: '2' }
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

  $: connected = !!$walletData?.accounts[0]
  $: arrowFill = connected ? 'var(--color-primary)' : 'var(--color-dark)'
</script>

<section>
  <div class="jetty-img-section">
    <img src={JettyGlow} class="jetty-img-glow" alt="jetty glow" />
    <img src={Jetty} class="jetty-img" alt="jetty img" />
  </div>
  <div class="swap-card">
    <div>
      <div class="swap-card-header">
        <img class="jetty-swap-img" src={JettySwap} />
        <div class="market-price">
          <div>{@html $i18n.t('main:marketplace-estimates')}</div>
          <div class="row">
            <span class="row">
              {conversionRateFrom}
              <Icon --size="18px" url={fromResource.icon} />
            </span>
            =
            <span class="row">
              {conversionRateTo}
              <Icon --size="18px" url={toResource.icon} />
            </span>
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
          <div class:disabled={false} class="switch">
            <ArrowDownIcon fill={arrowFill} />
          </div>
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
    &:not(.disabled) {
    }
  }

  svg {
    fill: red;
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
