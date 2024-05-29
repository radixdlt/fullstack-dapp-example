<script lang="ts">
  import HappyJetty from '@images/jetty-happy.png'
  import CrossIcon from '@images/cross.svg'

  export let close = false
  export let notification = false
  export let disabled = false
</script>

<div style:position="relative" class:non-interactable={disabled}>
  <button
    class="jetty-icon"
    class:close
    style:--image={`url(${HappyJetty})`}
    style:--cross={`url(${CrossIcon})`}
    on:click
  >
    <div class:notification />
    {#if close}
      <img src={CrossIcon} class="close-img" alt="close icon" />
    {:else}
      <img src={HappyJetty} class="jetty-img" alt="jetty" />
    {/if}
  </button>
</div>

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

  .close {
    background: var(--color-background-light);
    background-size: 30%;
    background-repeat: no-repeat;
  }

  .notification {
    content: '';
    position: absolute;
    top: 0.2rem;
    left: 0.5rem;
    width: 0.8rem;
    height: 0.8rem;
    background-color: red;
    border-radius: 50%;
  }

  .non-interactable {
    cursor: pointer;
    pointer-events: none;
  }
</style>
