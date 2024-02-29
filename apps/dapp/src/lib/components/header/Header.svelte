<script lang="ts">
  import RadquestLogoBig from '@images/radquest-logo-big.svg'
  import RadquestLogoSmall from '@images/radquest-logo-small.svg'

  let width: number

  $: mobile = width < 768
</script>

<svelte:window bind:innerWidth={width} />

<div class="header">
  <img src={mobile ? RadquestLogoSmall : RadquestLogoBig} alt="Radquest Logo" />
  <radix-connect-button class="radix-btn" />
</div>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-lg);
    height: 4rem;
  }

  .radix-btn {
    z-index: 1;
  }
</style>
