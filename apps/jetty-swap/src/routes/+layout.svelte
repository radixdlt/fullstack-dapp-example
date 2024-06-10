<script lang="ts">
  import { PUBLIC_SWAP_VARIATION } from '$env/static/public'
  import { onMount } from 'svelte'
  import '../global.scss'
  import Nav from './Nav.svelte'

  onMount(async () => {
    if (PUBLIC_SWAP_VARIATION === 'JETTY') {
      await import('../jetty.scss')
    } else {
      await import('../letty.scss')
    }
  })
</script>

<svelte:head>
  {#if PUBLIC_SWAP_VARIATION === 'JETTY'}
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
