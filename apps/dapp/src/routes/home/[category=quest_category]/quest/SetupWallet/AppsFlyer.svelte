<script lang="ts">
  import { useCookies } from '$lib/utils/cookies'
  import Bowser from 'bowser'

  const parsed = Bowser.parse(window.navigator.userAgent)
  const dapp_referrer = useCookies(`dapp_referrer`).get()
  const oneLinkUrl = `https://radixdlt.onelink.me/2p25/s2xnylgt`
  const paramName = `deep_link_value`
  const params = {
    special_dapp: 'radquest',
    dapp_referrer,
    method: parsed.platform.type === 'desktop' ? 'desktop' : 'mobile'
  }
  const encode = (text: string) =>
    btoa(text).replaceAll(/\+/g, '-').replaceAll(/\//g, '_').replaceAll(/\=/g, '')
</script>

<a href={`${oneLinkUrl}?${paramName}=${encode(JSON.stringify(params))}`}>
  {#if parsed.os.name === 'Android'}
    <img src="/quests-images/key/2-KeyImage_Button_GooglePlayStore.webp" alt="Play Store" />
  {:else if parsed.os.name === 'iOS'}
    <img src="/quests-images/key/2-KeyImage_Button_AppleAppStore.webp" alt="App Store" />
  {/if}
</a>
