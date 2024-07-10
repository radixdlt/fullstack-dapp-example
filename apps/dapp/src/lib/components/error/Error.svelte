<script lang="ts">
  import { elasticOut } from 'svelte/easing'

  export let faded: boolean = true

  const shake = (_: HTMLElement) => ({
    duration: 500,
    easing: elasticOut,
    css: (_: number, u: number) => `transform: translateX(${u}rem)`
  })
</script>

<div class="error" class:text-faded={faded} in:shake>
  <div class="icon-text"><slot /></div>
</div>

<style>
  .error {
    color: var(--color-error);
  }
</style>
