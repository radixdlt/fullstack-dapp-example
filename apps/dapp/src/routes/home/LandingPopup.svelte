<script lang="ts">
  import { LandingPopupSchema, UtmSourceLanding } from 'content'
  import Button from '$lib/components/button/Button.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { backOut } from 'svelte/easing'
  import { scale } from 'svelte/transition'
  import { useLocalStorage } from '$lib/utils/local-storage'
  import Backdrop from '$lib/components/backdrop/Backdrop.svelte'
  import { onMount } from 'svelte'
  import { user } from '../../stores'
  import { okAsync } from 'neverthrow'
  import { userApi } from '$lib/api/user-api'
  import { htmlReplace } from '$lib/helpers/html-replace'

  type Replacer = (html: string) => Promise<string>

  export let definitions: Record<LandingPopupSchema, string>

  let seenLandingPopup: string | undefined
  let visibleLandingPopup:
    | {
        id: string
        html: string
        replacer: Replacer
      }
    | undefined

  onMount(() => {
    seenLandingPopup = useLocalStorage('seen-landing-popup').get()
    const searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has('ref')) {
      visibleLandingPopup = {
        id: `ref=${searchParams.get('ref')}`,
        html: definitions[LandingPopupSchema.UserReferral],
        replacer: (html: string) =>
          userApi
            .getNameByReferralCode(searchParams.get('ref') || '')
            .map(({ name }) => htmlReplace(html, { inviter_name: name }))
            .orElse(() => okAsync(html))
            .unwrapOr(html)
      }
    }

    if (searchParams.has('utm_source')) {
      const utmSource = searchParams.get('utm_source') as keyof typeof UtmSourceLanding
      const landingConfig = UtmSourceLanding[utmSource]
      if (landingConfig) {
        visibleLandingPopup = {
          id: `utm_source=${utmSource}`,
          html: definitions[UtmSourceLanding[utmSource].schema],
          replacer: (html: string) =>
            Promise.resolve(htmlReplace(html, UtmSourceLanding[utmSource].data))
        }
      }
    }
  })

  const hideLandingPopup = () => {
    if (visibleLandingPopup) {
      useLocalStorage('seen-landing-popup').set(visibleLandingPopup.id)
      seenLandingPopup = visibleLandingPopup.id
      visibleLandingPopup = undefined
    }
  }
</script>

{#if visibleLandingPopup && seenLandingPopup !== visibleLandingPopup.id && !$user}
  <Backdrop zIndex={5}>
    <div class="landing-popup card" transition:scale|local={{ easing: backOut }}>
      <div class="image">
        <lottie-player autoplay loop mode="normal" src="/lottie/LandingCard.json" />
      </div>

      <div class="landing-popup-content">
        {#if visibleLandingPopup.replacer}
          {#await visibleLandingPopup.replacer(visibleLandingPopup.html) then html}
            {@html html}
          {/await}
        {:else}
          {@html visibleLandingPopup.html}
        {/if}

        <div class="button">
          <!-- svelte-ignore missing-declaration -->
          <Button
            on:click={() => {
              hideLandingPopup()
            }}>{$i18n.t('main:landingPagePopup.button')}</Button
          >
        </div>
      </div>
    </div>
  </Backdrop>
{/if}

<style lang="scss">
  div.landing-popup-content :global(p) {
    opacity: 0.6;
    line-height: 24px;
  }

  .landing-popup {
    padding-top: 0;
    margin: var(--spacing-xl);
    max-height: 90vh;
    display: grid;
    grid-template-columns: 2fr 3fr;
    max-width: 50rem;
    overflow-y: scroll;

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
      grid-row-start: 2;
    }
  }

  .image {
    position: relative;
    justify-self: center;
    &::after {
      content: ' ';
      background-image: linear-gradient(transparent 80%, var(--color-light) 100%);
      display: block;
      top: 0;

      width: 100%;
      height: 100%;
      position: absolute;
    }

    @include mobile {
      width: 15rem;
      max-width: 100%;
    }
  }
</style>
