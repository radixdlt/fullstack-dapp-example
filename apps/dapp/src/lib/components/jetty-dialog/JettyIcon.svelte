<script lang="ts">
  import HappyJetty from '@images/jetty-happy.png'
  import CrossIcon from '@images/cross.svg'
  import { backOut } from 'svelte/easing'
  import { scale } from 'svelte/transition'

  export let close = false
</script>

<button
  transition:scale={{ easing: backOut }}
  class="jetty-icon"
  class:close
  style:--image={`url(${HappyJetty})`}
  style:--cross-icon={`url(${CrossIcon})`}
  on:click
></button>

<style lang="scss">
  .jetty-icon {
    width: 4.5rem;
    height: 4.5rem;
    background:
      var(--image) center center / cover,
      var(--color-background-dark);
    border-radius: 50%;
  }

  .close {
    background:
      var(--cross-icon) center center / contain,
      var(--color-background-light);
    background-size: 30%;
    background-repeat: no-repeat;
  }
</style>
