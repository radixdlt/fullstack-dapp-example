<script lang="ts">
  import { elasticOut } from 'svelte/easing'

  const shake = (_: HTMLElement) => ({
    duration: 500,
    easing: elasticOut,
    css: (_: number, u: number) => `transform: translateX(${u}rem)`
  })
</script>

<div class="error text-faded" in:shake>
  <div class="icon-text"><slot /></div>
</div>

<style>
  .error {
    color: var(--color-error);
  }
</style>
