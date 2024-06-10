<script>
  import { PUBLIC_NETWORK_ID } from '$env/static/public'
  import DevMode from './DevMode.svelte'
</script>

{#if PUBLIC_NETWORK_ID !== '1'}
  <DevMode />
{/if}
