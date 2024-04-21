<script lang="ts">
  import Button from '$lib/components/button/Button.svelte'

  let enabled = false

  $: if (enabled) {
    /*
    Object.keys($questStatus).forEach((quest) => {
      // @ts-ignore
      $questStatus[quest] = 'unlocked'
    })
    */
  }
</script>

<div class="dev-mode">
  <Button
    on:click={() => {
      enabled = !enabled
    }}>{enabled ? 'Disable' : 'Enable'} Dev Mode</Button
  >
</div>

<style lang="scss">
  .dev-mode {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 4;
    padding: var(--spacing-xl);
  }
</style>
