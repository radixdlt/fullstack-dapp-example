<script lang="ts">
  import HappyJetty from '@images/jetty-happy.png'
  import CrossIcon from '@images/cross.svg'
  import { backOut } from 'svelte/easing'
  import { scale } from 'svelte/transition'

  export let close = false
</script>

<button
  transition:scale|local={{ easing: backOut }}
  class="jetty-icon"
  class:close
  style:--image={`url(${HappyJetty})`}
  style:--cross={`url(${CrossIcon})`}
  on:click
>
  {#if close}
    <img src={CrossIcon} class="close-img" alt="close icon" />
  {:else}
    <img src={HappyJetty} class="jetty-img" alt="jetty" />
  {/if}
</button>

<style lang="scss">
  .jetty-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4.5rem;
    height: 4.5rem;
    background: var(--color-background-dark);
    border-radius: 50%;
    overflow: hidden;
  }

  .jetty-img {
    width: 4.5rem;
    height: 4.5rem;
  }

  .close-image {
    width: 0.3rem;
    height: 0.3rem;
  }

  .close {
    background: var(--color-background-light);
    background-size: 30%;
    background-repeat: no-repeat;
  }
</style>
