<script lang="ts">
  import { onMount } from 'svelte'
  import Item from './Item.svelte'
  import NavigateButton from './NavigateButton.svelte'

  export let noButtons = false
  export let stepSize = 400

  let carousel: HTMLElement

  let isScrolledToStart = true
  let isScrolledToEnd = true

  const detectScrolledToStart = () => {
    isScrolledToStart = carousel.scrollLeft <= 5
  }

  const detectScrolledToEnd = () => {
    isScrolledToEnd =
      Math.abs(carousel.scrollLeft + carousel.offsetWidth - carousel.scrollWidth) <= 5
  }

  export const scrollToNext = () => {
    if (isScrolledToEnd) return
    carousel.scrollTo({
      left: carousel.scrollLeft + stepSize,
      behavior: 'smooth'
    })
  }

  export const scrollToPrev = () => {
    if (isScrolledToStart) return
    carousel.scrollTo({
      left: carousel.scrollLeft - stepSize,
      behavior: 'smooth'
    })
  }

  export const scrollToIndex = (i: number) => {
    carousel.scrollTo({
      left: i * stepSize - carousel.offsetWidth / 2,
      behavior: 'smooth'
    })
  }

  const centreOnClicked = (e: CustomEvent) => {
    const index = e.detail.index
    scrollToIndex(index)
  }

  onMount(() => {
    if (noButtons) return

    detectScrolledToStart()
    detectScrolledToEnd()

    setTimeout(() => {
      carousel.scrollTo({ left: 0, behavior: 'instant' })
    }, 0)

    const eventCallback = () => {
      detectScrolledToStart()
      detectScrolledToEnd()
    }

    carousel.addEventListener('scroll', eventCallback)

    return () => {
      carousel.removeEventListener('scroll', eventCallback)
    }
  })

  let canScroll = true
</script>

<div class="container">
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
        left: delta < 0 ? -stepSize : stepSize,
        behavior: 'smooth'
      })
      setTimeout(() => {
        canScroll = true
      }, 300)
    }}
  >
    <slot {Item} {centreOnClicked} {scrollToNext} />
  </div>
  {#if !isScrolledToStart && !noButtons}
    <div class="navigate-button left">
      <NavigateButton direction="left" on:click={scrollToPrev} />
    </div>
  {/if}
  {#if !isScrolledToEnd && !noButtons}
    <div class="navigate-button right">
      <NavigateButton direction="right" on:click={scrollToNext} />
    </div>
  {/if}
</div>

<style lang="scss">
  .container {
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;
    height: 100%;
    justify-content: center;
  }
  .carousel {
    position: relative;
    display: flex;
    align-items: center;
    overflow-x: scroll;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    height: 100%;

    -ms-overflow-style: none;
    scrollbar-width: none;
    padding: 0 1rem;
  }

  .navigate-button {
    position: absolute;
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
