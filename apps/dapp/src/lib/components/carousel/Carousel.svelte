<script lang="ts">
  import { onMount } from 'svelte'
  import Item from './Item.svelte'
  import NavigateButton from './NavigateButton.svelte'
  import { isMobile } from '$lib/utils/is-mobile'

  let carousel: HTMLElement

  let isScrolledToStart = true
  let isScrolledToEnd = false

  export const scrollToNext = () => {
    if (!carousel) return
    // TODO
  }

  const detectScolledToStart = () => {
    isScrolledToStart = carousel.scrollLeft === 0
  }

  const detectScolledToEnd = () => {
    isScrolledToEnd = carousel.scrollLeft + carousel.offsetWidth === carousel.scrollWidth
  }

  onMount(() => {
    setTimeout(() => {
      carousel.scrollTo({ left: 0, behavior: 'instant' })
    }, 0)

    const eventCallback = () => {
      detectScolledToStart()
      detectScolledToEnd()
    }

    carousel.addEventListener('scroll', eventCallback)

    return () => {
      carousel.removeEventListener('scroll', eventCallback)
    }
  })

  let canScroll = true
</script>

<div
  bind:this={carousel}
  class="carousel"
  on:wheel={(e) => {
    const delta = e.deltaY || e.deltaX
    e.preventDefault()
    e.stopImmediatePropagation()
    if (!canScroll) return
    canScroll = false
    e.currentTarget.scrollBy({
      left: delta < 0 ? -400 : 400,
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
    z-index: 1;
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
