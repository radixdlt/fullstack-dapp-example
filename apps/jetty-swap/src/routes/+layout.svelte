<script lang="ts">
  import { env } from '$env/dynamic/public'
  import { onMount } from 'svelte'
  import '../global.scss'
  import Nav from './Nav.svelte'

  onMount(async () => {
    if (env.PUBLIC_SWAP_VARIATION === 'JETTY') {
      await import('../jetty.scss')
    } else {
      await import('../letty.scss')
    }
  })
</script>

<svelte:head>
  {#if env.PUBLIC_SWAP_VARIATION === 'JETTY'}
    <title>Jetty Swap</title>
    <meta property="og:title" content="Jetty Swap" />
    <meta
      property="og:image"
      content="https://assets.radixdlt.com/images/dApps/og-jettyswap.webp"
    />
  {:else}
    <title>Letty Swap</title>
    <meta property="og:title" content="Letty Swap" />
    <meta
      property="og:image"
      content="https://assets.radixdlt.com/images/dApps/og-lettyswap.webp"
    />
  {/if}

  <meta property="og:type" content="website" />
  <meta property="og:image:type" content="image/webp" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
</svelte:head>

<div>
  <Nav />

  <main>
    <slot />
  </main>
</div>

<style>
  div {
    position: relative;
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5rem;
    padding: 2rem;
  }
</style>
