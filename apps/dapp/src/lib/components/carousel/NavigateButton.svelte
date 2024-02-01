<script lang="ts">
  import { onDestroy, onMount } from 'svelte'

  export let direction: 'left' | 'right'

  $: right = direction === 'right'
  $: left = direction === 'left'

  let visible = false

  let button: HTMLElement

  onMount(() => {
    window.addEventListener('mousemove', onMouseMove)
  })

  onDestroy(() => {
    window.removeEventListener('mousemove', onMouseMove)
  })

  const onMouseMove = (event: MouseEvent) => {
    const { left, top, width, height } = button.getBoundingClientRect()

    const proximity = 80
    const isCloseToElement =
      event.clientX >= left - proximity &&
      event.clientX <= left + width + proximity &&
      event.clientY >= top - proximity &&
      event.clientY <= top + height + proximity

    visible = isCloseToElement
  }
</script>

<button on:click bind:this={button} class="navigate-button" class:right class:left class:visible
></button>

<style lang="scss">
  .navigate-button {
    position: fixed;
    top: 50%;
    width: 4.8rem;
    height: 4.8rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    background-color: var(--color-dark);
    opacity: 1;

    &:hover {
      opacity: 1;
    }

    transition: opacity 0.2s ease-in-out;

    opacity: 0;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      width: 1.6rem;
      height: 1.6rem;
      border-top: 0.2rem solid var(--color-light);
      border-right: 0.2rem solid var(--color-light);
    }
  }

  .visible {
    opacity: 0.3;
    pointer-events: all;
  }

  .right {
    right: 1rem;
    transform: translateY(-50%);
  }

  .left {
    left: 1rem;
    transform: translateY(-50%) rotate(180deg);
  }
</style>
