<script lang="ts">
  import { onMount } from 'svelte'
  import Item from './Item.svelte'
  import NavigateButton from './NavigateButton.svelte'
  import { isMobile } from '$lib/utils/is-mobile'

  let carousel: HTMLElement

  let isScrolledToStart: boolean
  let isScrolledToEnd: boolean

  let observer: MutationObserver

  let items: HTMLElement[]

  export const scrollToNext = () => {
    if (!carousel) return
    carousel.scrollBy({
      left: items[0].offsetWidth,
      behavior: 'smooth'
    })
  }

  onMount(() => {
    setTimeout(() => {
      carousel.scrollTo({ left: 0, behavior: 'instant' })
    }, 0)

    items = Array.from(carousel.querySelectorAll('.item')) as HTMLElement[]

    if (items.length === 0) return

    observer = new MutationObserver(() => {
      isScrolledToEnd = !items[items.length - 1].classList.contains('disabled')
      isScrolledToStart = !items[0].classList.contains('disabled')
    })

    observer.observe(items[0], { attributes: true })
    observer.observe(items[items.length - 1], { attributes: true })

    return () => {
      observer.disconnect()
    }
  })

  let canScroll = true
</script>

<div
  bind:this={carousel}
  class="carousel"
  on:wheel={(e) => {
    if (!canScroll) return
    canScroll = false
    e.currentTarget.scrollBy({
      left: e.deltaY,
      behavior: 'smooth'
    })
    setTimeout(() => {
      canScroll = true
    }, 300)
  }}
>
  <slot {Item} />
  {#if !isMobile()}
    {#if !isScrolledToStart}
      <div class="navigate-button left">
        <NavigateButton
          direction="left"
          on:click={() => {
            carousel.scrollBy({
              left: -400,
              behavior: 'smooth'
            })
          }}
        />
      </div>
    {/if}
    {#if !isScrolledToEnd}
      <div class="navigate-button right">
        <NavigateButton
          direction="right"
          on:click={() => {
            carousel.scrollBy({
              left: 400,
              behavior: 'smooth'
            })
          }}
        />
      </div>
    {/if}
  {/if}
</div>

<style lang="scss">
  .carousel {
    position: relative;
    display: flex;
    align-items: center;
    overflow: scroll;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    height: 100%;

    -ms-overflow-style: none;
    scrollbar-width: none;
    padding: 0 1rem;
  }

  .navigate-button {
    position: fixed;
  }

  .left {
    left: 1rem;
  }

  .right {
    right: 1rem;
  }

  ::-webkit-scrollbar {
    display: none;
  }
</style>
