<script lang="ts">
  import Button from '../button/Button.svelte'
</script>

<div>
  <Button on:click><slot /></Button>
</div>

<style>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
