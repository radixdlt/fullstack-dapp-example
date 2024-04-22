<script lang="ts" context="module">
  import { user } from '../../stores'

  let loggedIn = false

  user.subscribe((value) => {
    loggedIn = !!value
  })

  export const closeQuest = () => {
    if (loggedIn) {
      questApi.deleteSavedProgress()
    } else {
      localStorage.removeItem('savedProgress')
    }
    goto('/')
  }
</script>

<script lang="ts">
  import { goto } from '$app/navigation'
  import { questApi } from '$lib/api/quest-api'
  import Backdrop from '$lib/components/backdrop/Backdrop.svelte'

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') closeQuest()
  }
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
