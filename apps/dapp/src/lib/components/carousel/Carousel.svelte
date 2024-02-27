<script lang="ts">
  import { afterUpdate, onMount } from 'svelte'
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
    const right = isScrolledToStart ? navigateButtons[0] : navigateButtons[1]

    if (left) {
      left.style.top = `${rect.top + rect.height / 2}px`
      left.style.left = `${rect.left + 10}px`
    }
    if (right) {
      right.style.top = `${rect.top + rect.height / 2}px`
      right.style.left = `${rect.right - right.offsetWidth - 10}px`
    }
  }

  onMount(() => {
    if (!isMobile()) {
      window.addEventListener('scroll', updateButtonPosition)
      window.addEventListener('resize', updateButtonPosition)
    }

    window.addEventListener('wheel', handleWheelScroll)

    setTimeout(() => {
      carousel.scrollTo({ left: 0, behavior: 'instant' })
    }, 0)

    let items = Array.from(carousel.querySelectorAll('.item')) as HTMLElement[]

    if (items.length === 0) return

    items[0].style.marginLeft = `${(carousel.offsetWidth - items[0].offsetWidth) / 2}px`
    items[items.length - 1].style.marginRight = `${
      (carousel.offsetWidth - items[items.length - 1].offsetWidth) / 2
    }px`

    observer = new MutationObserver(() => {
      isScrolledToEnd = !items[items.length - 1].classList.contains('disabled')
      isScrolledToStart = !items[0].classList.contains('disabled')
    })
    observer.observe(items[0], { attributes: true })
    observer.observe(items[items.length - 1], { attributes: true })

    return () => {
      window.removeEventListener('scroll', updateButtonPosition)
      window.removeEventListener('resize', updateButtonPosition)
      window.removeEventListener('wheel', handleWheelScroll)
      observer.disconnect()
    }
  })

  if (!isMobile()) afterUpdate(updateButtonPosition)

  let canScroll = true

  const handleWheelScroll = (e: WheelEvent) => {
    if (!canScroll) return
    if (e.deltaY > 0) scrollToNextItem()
    else scrollToPreviousItem()
    canScroll = false
    setTimeout(() => {
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
    overflow: scroll;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    height: 100%;

    -ms-overflow-style: none;
    scrollbar-width: none;
    padding: 1rem 0;
  }
  ::-webkit-scrollbar {
    display: none;
  }
</style>
