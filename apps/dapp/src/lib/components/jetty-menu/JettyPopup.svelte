<script lang="ts">
  import CrossIcon from '@images/cross.svg'
  import { scale } from 'svelte/transition'

  export let notification = false
  export let hideJetty = false
  export let showDownArrow = false
</script>

<div class="jetty-popup" class:gradient-border={notification}>
  <button class="jetty-icon" style:--cross={`url(${CrossIcon})`} on:click>
    {#if notification}
      <div class="notification" transition:scale={{ delay: 1_000 }} />
    {/if}
  </button>
</div>

<style lang="scss">
  .jetty-popup {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      margin: -3px;
      border-radius: 50% 50% 0 0;
      background: none;
      transition: all 0.3s;
    }
    &.gradient-border::before {
      background: var(--gradient-6);
    }
  }

  .jetty-icon {
    display: grid;
    justify-content: center;
    align-items: center;
    width: 6rem;
    height: 5.5rem;

    @include mobile {
      width: 5.5rem;
      height: 5rem;
    }

    background: var(--color-dark);
    border-radius: 50% 50% 0 0;
    overflow: hidden;

    > * {
      grid-area: 1 / 1;
    }
  }

  .jetty-img {
    width: 4.5rem;
    height: 4.5rem;

    @include mobile {
      width: 4rem;
      height: 4rem;
    }
  }

  .notification {
    content: '';
    position: absolute;
    top: 0.2rem;
    right: 0.5rem;
    width: 0.8rem;
    height: 0.8rem;
    background-color: red;
    border-radius: 50%;
  }

  .up-arrow {
    display: flex;
    transform: rotate(90deg) translateX(-0.3rem);
    filter: invert(1);
    z-index: 1;

    :first-child {
      transform: translateX(0.8rem);
    }

    @include mobile {
      transform: rotate(90deg) translateX(-0.7rem) scale(0.7);
    }
  }

  .down-arrow {
    transform: rotate(270deg) translateX(1rem);

    @include mobile {
      transform: rotate(270deg) translateX(0.7rem) scale(0.7);
    }
  }
</style>
