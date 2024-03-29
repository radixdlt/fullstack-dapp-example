<script>
  import Button from '$lib/components/button/Button.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import JettyImage from '@images/landing-popup-jetty.webp'
</script>

<div class="landing-popup card">
  <div class="image only-desktop">
    <img src={JettyImage} alt="Jetty" />
  </div>

  <div class="content">
    <h1 class="title">{$i18n.t('main:landingPagePopup.title')}</h1>

    <div class="image only-mobile">
      <img src={JettyImage} alt="Jetty" />
    </div>

    <p class="text-faded">
      {$i18n.t('main:landingPagePopup.message')}
    </p>

    <div class="button">
      <Button on:click>{$i18n.t('main:landingPagePopup.button')}</Button>
    </div>
  </div>
</div>

<style lang="scss">
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

  .content {
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
