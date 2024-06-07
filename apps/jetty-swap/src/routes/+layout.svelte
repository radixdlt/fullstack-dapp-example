<script lang="ts">
  import { PUBLIC_SWAP_VARIATION } from '$env/static/public'
  import '../global.scss'
  import Nav from './Nav.svelte'

  if (PUBLIC_SWAP_VARIATION === 'JETTY') {
    import('../jetty.scss')
  } else {
    import('../letty.scss')
  }
</script>

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
