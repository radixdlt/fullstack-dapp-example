<script lang="ts">
  import { onDestroy, onMount } from 'svelte'

  let item: HTMLElement

  let disabled = false

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          disabled = false
        } else {
          disabled = true
        }
      })
    },
    {
      root: null,
      threshold: 0.95
    }
  )

  onMount(() => {
    observer.observe(item)
  })

  onDestroy(() => {
    observer.disconnect()
  })
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
