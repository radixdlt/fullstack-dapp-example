<script lang="ts" context="module">
  import { get } from 'svelte/store'
  import { user } from '../../../../stores'

  let loggedIn = false

  user.subscribe((value) => {
    loggedIn = !!value
  })

  export const closeQuest = async () => {
    if (loggedIn) {
      questApi.deleteSavedProgress()
    } else if (localStorage.getItem('savedProgress')) {
      localStorage.removeItem('savedProgress')
    }
    goto(`/home/${get(page).params.category}`)
  }
</script>

<script lang="ts">
  import { goto } from '$app/navigation'
  import { questApi } from '$lib/api/quest-api'
  import Backdrop from '$lib/components/backdrop/Backdrop.svelte'
  import { page } from '$app/stores'

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
    height: 90dvh;
    width: calc(100vw - 2 * var(--spacing-lg));
    max-width: 50rem;
    max-height: 50rem;
  }
</style>
