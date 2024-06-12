<script lang="ts">
  import { afterUpdate, onMount } from 'svelte'
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
      window.removeEventListener('scroll', updateButtonPosition)
      window.removeEventListener('resize', updateButtonPosition)
      observer.disconnect()
    }
  })

  if (!isMobile()) afterUpdate(updateButtonPosition)

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
      <NavigateButton
        direction="left"
        on:click={() => {
          carousel.scrollBy({
            left: -400,
            behavior: 'smooth'
          })
        }}
      />
    {/if}
    {#if !isScrolledToEnd}
      <NavigateButton
        direction="right"
        on:click={() => {
          carousel.scrollBy({
            left: 400,
            behavior: 'smooth'
          })
        }}
      />
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
    padding: 1rem;
  }
  ::-webkit-scrollbar {
    display: none;
  }
</style>
