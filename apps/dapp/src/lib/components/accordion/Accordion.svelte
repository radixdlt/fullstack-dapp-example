<script lang="ts">
  import { slide } from 'svelte/transition'
  import Chevron from '@images/chevron.svg'

  export let isOpened = false

  const toggle = () => (isOpened = !isOpened)
</script>

<div class="accordion">
  <button on:click={toggle}>
    <slot name="header" />
    <div class="icon" style:transform={`rotate(${isOpened ? '180deg' : 0})`}>
      <img src={Chevron} alt="" />
    </div>
  </button>

  {#if isOpened}
    <div class="content" transition:slide>
      <slot name="content" />
    </div>
  {/if}
</div>

<style lang="scss">
  .accordion {
    border-radius: 15px;
    border: 1px solid;
    border-color: linear-gradient(4.06deg, #0e2130 5.91%, #091a26 91.69%);

    button {
      justify-content: space-around;
      padding: 1rem 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      width: 100%;
      @include shortMobile {
        padding: 1rem;
      }
    }
  }

  .icon {
    transition: transform 0.3s ease-in-out;
    display: flex;
    flex-shrink: 0;
    align-items: center;
  }
</style>
