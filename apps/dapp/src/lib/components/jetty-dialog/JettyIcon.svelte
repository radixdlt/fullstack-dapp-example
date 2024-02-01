<script lang="ts">
  import HappyJetty from '@images/jetty-happy.png'
  import { backOut } from 'svelte/easing'
  import { scale } from 'svelte/transition'
</script>

<div
  transition:scale={{ easing: backOut }}
  class="jetty-icon"
  style:--image={`url(${HappyJetty})`}
></div>

<style lang="scss">
  .jetty-icon {
    width: 5rem;
    height: 5rem;
    background:
      var(--image) center center / cover,
      var(--color-background-dark);
    border-radius: 50%;
  }
</style>
