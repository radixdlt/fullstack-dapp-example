<script lang="ts">
  import type { loadLandingPopup } from 'content'
  import Button from '$lib/components/button/Button.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import JettyImage from '@images/landing-popup-jetty.webp'
  import { onMount } from 'svelte'
  import { showJetty } from '../../stores'
  import { backOut } from 'svelte/easing'
  import { scale } from 'svelte/transition'

  export let defintions: ReturnType<typeof loadLandingPopup>[0]

  onMount(() => {
    $showJetty = false

    return () => {
      $showJetty = true
    }
  })
</script>

<div class="landing-popup card" transition:scale|local={{ easing: backOut }}>
  <div class="image only-desktop">
    <img src={JettyImage} alt={$i18n.t('main:landingPagePopup.jetty-img-alt')} />
  </div>

  <div class="landing-popup-content">
    {@html defintions.html}

    <div class="image only-mobile">
      <img src={JettyImage} alt={$i18n.t('main:landingPagePopup.jetty-img-alt')} />
    </div>

    <div class="button">
      <Button on:click>{$i18n.t('main:landingPagePopup.button')}</Button>
    </div>
  </div>
</div>

<style lang="scss">
  div.landing-popup-content :global(p) {
    opacity: 0.6;
  }

  .landing-popup {
    margin: var(--spacing-xl);
    max-height: 90vh;
    display: grid;
    grid-template-columns: 1fr 2fr;
    max-width: 50rem;

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  .landing-popup-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .button {
    margin-top: var(--spacing-3xl);

    @include mobile {
      margin-top: var(--spacing-xl);
    }
  }

  .image {
    img {
      width: 100%;

      @include mobile {
        width: 8rem;
      }
    }
  }

  .only-desktop {
    @include mobile {
      display: none;
    }
  }

  .only-mobile {
    @include desktop {
      display: none;
    }
  }
</style>
