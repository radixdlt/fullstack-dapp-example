<script lang="ts">
  let item: HTMLElement

  let disabled = false
</script>

<div class="item" class:disabled bind:this={item}>
  <slot />
</div>

<style>
  .item {
    height: 100%;
    display: flex;
    align-items: center;
    scroll-snap-align: center;
    transition: opacity 0.3s;
  }

  .disabled {
    pointer-events: none;
    opacity: 0.5;
  }
</style>
