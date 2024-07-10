<script lang="ts">
  import { LandingPopupId, type LandingPopupDefinition } from 'content'
  import Button from '$lib/components/button/Button.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import JettyImage from '@images/landing-popup-jetty.webp'
  import { backOut } from 'svelte/easing'
  import { scale } from 'svelte/transition'
  import { useLocalStorage } from '$lib/utils/local-storage'
  import Backdrop from '$lib/components/backdrop/Backdrop.svelte'
  import { onMount } from 'svelte'

  type Popup = LandingPopupDefinition & { html: string; id: LandingPopupId }

  export let definitions: Popup[]

  let seenLandingPopup: boolean
  let visibleLandingPopup: Popup

  onMount(() => {
    seenLandingPopup = !!useLocalStorage('seen-landing-popup').get()
    const searchParams = new URLSearchParams(window.location.search)
    definitions.find((definition) => {
      if (
        (definition.queryParamValue &&
          searchParams.has(definition.queryParamName) &&
          searchParams.get(definition.queryParamName) === definition.queryParamValue) ||
        (searchParams.has(definition.queryParamName) && !definition.queryParamValue)
      ) {
        visibleLandingPopup = definition
        return true
      }
    })
  })

  const hideLandingPopup = () => {
    useLocalStorage('seen-landing-popup').set(true)
    seenLandingPopup = true
  }
</script>

{#if !seenLandingPopup && visibleLandingPopup}
  <Backdrop zIndex={5}>
    <div class="landing-popup card" transition:scale|local={{ easing: backOut }}>
      <div class="image only-desktop">
        <img src={JettyImage} alt={$i18n.t('main:landingPagePopup.jetty-img-alt')} />
      </div>

      <div class="landing-popup-content">
        {@html visibleLandingPopup.html}

        <div class="image only-mobile">
          <img src={JettyImage} alt={$i18n.t('main:landingPagePopup.jetty-img-alt')} />
        </div>

        <div class="button">
          <Button on:click={hideLandingPopup}>{$i18n.t('main:landingPagePopup.button')}</Button>
        </div>
      </div>
    </div>
  </Backdrop>
{/if}

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
