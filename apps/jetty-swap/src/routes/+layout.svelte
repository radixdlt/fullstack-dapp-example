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
  {:else}
    <title>Letty Swap</title>
  {/if}
</svelte:head>

<Nav />

<main>
  <slot />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5rem;
    padding: 2rem;
  }
</style>
