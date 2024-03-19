<script lang="ts">
  import { goto } from '$app/navigation'
  import Backdrop from '$lib/components/backdrop/Backdrop.svelte'

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') close()
  }

  const close = () => goto('/')
</script>

<svelte:window on:keydown={(e) => handleKeydown(e)} />

<Backdrop>
  <div class="container">
    <div class="quest">
      <slot />
    </div>
  </div>
</Backdrop>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .quest {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    max-height: 50rem;
    width: 80vw;
    max-width: 50rem;
  }
</style>
