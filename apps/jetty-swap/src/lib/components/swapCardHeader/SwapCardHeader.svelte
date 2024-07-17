<script lang="ts">
  import Chevron from '../chevron/chevron.svelte'
  import Graph from '../../../images/graph.webp'
  import { PUBLIC_SWAP_VARIATION } from '$env/static/public'
  import { i18n } from '$lib/i18n/i18n'
  import Ratio from './Ratio.svelte'

  export let conversionRateFrom: string
  export let conversionRateTo: string
  export let clamResourceIcon: string | undefined
  export let ottercoinResourceIcon: string | undefined
  export let isJetty: boolean
  export let isGoingUp: boolean
  export let priceChange: string
  export let logo: string
</script>

{#if isJetty}
  <div class="swap-card-header">
    <img src={logo} alt="swap-logo" />
    <div class={`market-price`}>
      <div>{@html $i18n.t('main:marketplace-estimates')}</div>
      <Ratio {conversionRateFrom} {clamResourceIcon} {conversionRateTo} {ottercoinResourceIcon} />
    </div>
  </div>
{/if}

{#if !isJetty}
  <div class="swap-card-header">
    <img src={logo} alt="swap-logo" />
    <div class={`market-price ${PUBLIC_SWAP_VARIATION.toLowerCase()}`}>
      <div class="market-price-row">
        <div class="market-price-col">
          <div class="thin">{@html $i18n.t('main:marketplace-estimates')}</div>
          <div class="row">
            <Ratio
              {conversionRateFrom}
              {clamResourceIcon}
              {conversionRateTo}
              {ottercoinResourceIcon}
            />
            <div class="market-estimate-graph-row">
              <div class:rotate-180={isGoingUp} class={'chevron'}>
                <Chevron fill={isGoingUp ? 'var(--color-inchworm)' : 'var(--color-error)'} />
              </div>
              <p
                class:price-change-up={isGoingUp}
                class:price-change-down={!isGoingUp}
                class={`price-change`}
              >
                {priceChange}%
              </p>
            </div>
          </div>
        </div>

        <div class="scroll-container">
          <div class="scrolling-image">
            <img src={Graph} class="graph" alt="price change graph" />
            <img src={Graph} class="graph" alt="price change graph" />
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  p {
    padding: 0;
    margin: 0;
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
    line-height: 1.25rem;
    font-size: var(--text-sm);
    font-style: normal;
    letter-spacing: 0.14px;
    color: var(--color-background-dark);
    text-align: center;
    justify-content: center;
  }

  .market-price.letty {
    align-items: flex-start;
  }

  .row {
    display: flex;
    gap: 0.25rem;
    align-items: center;
  }

  .graph {
    width: 7.313rem;
    height: 2.5rem;

    @media (max-width: 420px) {
      width: 5rem;
    }
  }

  .price-change {
    width: 3.125rem;
    font-size: var(--text-xs);
  }

  .price-change-up {
    color: var(--color-inchworm);
  }

  .price-change-down {
    color: var(--color-error);
  }

  .chevron {
    transition: transform 0.5s ease-in-out;
  }

  .rotate-180 {
    transform: rotate(-180deg);
  }

  .scroll-container {
    width: 7.313rem;
    overflow: hidden;
    position: relative;
    @media (max-width: 420px) {
      width: 5rem;
    }
  }

  .scrolling-image {
    display: flex;
    animation: scroll 10s linear infinite;
  }

  .scrolling-image img {
    flex-shrink: 0;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  .scroll-container::before,
  .scroll-container::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 10%;
    pointer-events: none;
    z-index: 1;
  }

  .scroll-container::before {
    left: 0;
    background: linear-gradient(to right, rgb(0, 0, 0), rgba(255, 255, 255, 0));
  }

  .scroll-container::after {
    right: 0;
    background: linear-gradient(to left, rgb(0, 0, 0), rgba(255, 255, 255, 0));
  }

  .market-estimate-graph-row {
    display: flex;
    text-align: left;
    gap: 0.25rem;
  }

  .market-price-row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    justify-content: space-between;
  }

  .market-price-col {
    display: flex;
    flex-direction: column;
    width: 10.5rem;
  }

  .thin {
    font-weight: var(--font-weight-bold);
    font-size: var(--text-xs);
    text-align: left;
  }
</style>
