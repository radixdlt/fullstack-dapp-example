<script lang="ts">
  import '../global.scss'
  import Nav from './Nav.svelte'
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
