<script lang="ts">
  import { afterUpdate, onDestroy, onMount } from 'svelte'
  import Item from './Item.svelte'
  import NavigateButton from './NavigateButton.svelte'
  import { isMobile } from '$lib/utils'

  let carousel: HTMLElement

  let isScrolledToStart: boolean
  let isScrolledToEnd: boolean

  let observer: MutationObserver

  const updateButtonPosition = () => {
    if (!carousel) return
    let rect = carousel.getBoundingClientRect()
    let navigateButtons = carousel.getElementsByClassName(
      'navigate-button'
    ) as HTMLCollectionOf<HTMLElement>

    const left = navigateButtons[0]
    const right = navigateButtons[1]

    if (left) left.style.top = `${rect.top + rect.height / 2}px`
    if (right) right.style.top = `${rect.top + rect.height / 2}px`
  }

  onMount(() => {
    if (!isMobile()) {
      window.addEventListener('scroll', updateButtonPosition)
      window.addEventListener('resize', updateButtonPosition)
    }

    window.addEventListener('wheel', handleWheelScroll)

    carousel.scrollIntoView({ behavior: 'smooth', inline: 'center' })

    let items = Array.from(carousel.querySelectorAll('.item'))
    observer = new MutationObserver(() => {
      isScrolledToEnd = !items[items.length - 1].classList.contains('disabled')
      isScrolledToStart = !items[0].classList.contains('disabled')
    })
    observer.observe(items[0], { attributes: true })
    observer.observe(items[items.length - 1], { attributes: true })
  })

  if (!isMobile()) afterUpdate(updateButtonPosition)

  let scrollTimer: ReturnType<typeof setTimeout>
  let canScroll = true

  const handleWheelScroll = (e: WheelEvent) => {
    if (!canScroll) return
    if (e.deltaY > 0) scrollToNextItem()
    else scrollToPreviousItem()
    canScroll = false
    scrollTimer = setTimeout(() => {
      canScroll = true
    }, 300)
  }

  const scrollToItem = (direction: 'next' | 'previous') => {
    if (!carousel) return
    let items = Array.from(carousel.querySelectorAll('.item'))
    let lastEnabledIndex = items.findIndex((item) => !item.classList.contains('disabled'))
    let nextItemIndex = items
      .slice(lastEnabledIndex + 1)
      .findIndex((item) => item.classList.contains('disabled'))
    let previousItemIndex = items
      .slice(0, lastEnabledIndex)
      .reverse()
      .findIndex((item) => item.classList.contains('disabled'))

    if (direction === 'next' && nextItemIndex !== -1) {
      let nextItem = items[lastEnabledIndex + 1 + nextItemIndex]
      if (nextItem) nextItem.scrollIntoView({ behavior: 'smooth', inline: 'center' })
    } else if (direction === 'previous' && previousItemIndex !== -1) {
      let previousItem = items[lastEnabledIndex - 1 - previousItemIndex]
      if (previousItem) previousItem.scrollIntoView({ behavior: 'smooth', inline: 'center' })
    }
  }

  const scrollToNextItem = scrollToItem.bind(null, 'next')
  const scrollToPreviousItem = scrollToItem.bind(null, 'previous')

  onDestroy(() => {
    window.removeEventListener('scroll', updateButtonPosition)
    window.removeEventListener('resize', updateButtonPosition)
    window.removeEventListener('wheel', handleWheelScroll)
    observer.disconnect()
  })
</script>

<div bind:this={carousel} class="carousel">
  <slot {Item} />
  {#if !isMobile()}
    {#if !isScrolledToStart}
      <NavigateButton direction="left" on:click={scrollToPreviousItem} />
    {/if}
    {#if !isScrolledToEnd}
      <NavigateButton direction="right" on:click={scrollToNextItem} />
    {/if}
  {/if}
</div>

<style lang="scss">
  .carousel {
    position: relative;
    display: flex;
    align-items: center;
    overflow: visible;
    overflow-x: scroll;

    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    height: 100%;

    -ms-overflow-style: none;
    scrollbar-width: none;
    padding: 1.5rem 0;
  }
  ::-webkit-scrollbar {
    display: none;
  }
</style>
