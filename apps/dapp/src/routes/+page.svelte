<script>
  import DevMode from './DevMode.svelte'
</script>

{#if import.meta.env.MODE === 'development'}
  <DevMode />
{/if}
