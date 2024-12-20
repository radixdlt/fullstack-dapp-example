<script lang="ts" context="module">
  import { get, writable } from 'svelte/store'
  import { hideJetty, user } from '../../../../stores'

  let loggedIn = false

  user.subscribe((value) => {
    loggedIn = !!value
  })

  let closingQuest = writable(false)

  export const closeQuest = async () => {
    const timeout = setTimeout(() => closingQuest.set(true), 200)
    if (loggedIn) {
      questApi.deleteSavedProgress()
    } else {
      localStorage.removeItem('savedProgress')
    }
    await invalidateAll()
    setTimeout(() => {
      goto(`/home/${get(page).params.category}`).then(() => {
        closingQuest.set(false)
        hideJetty.set(false)
        clearTimeout(timeout)
      })
    }, 0)
  }
</script>

<script lang="ts">
  import { goto, invalidateAll } from '$app/navigation'
  import { questApi } from '$lib/api/quest-api'
  import Backdrop from '$lib/components/backdrop/Backdrop.svelte'
  import { page } from '$app/stores'
  import LoadingSpinner from '$lib/components/loading-spinner/LoadingSpinner.svelte'

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
  {#if $closingQuest}
    <Backdrop>
      <div class="container">
        <div class="quest">
          <div class="text-center">
            <LoadingSpinner />
          </div>
        </div>
      </div>
    </Backdrop>
  {/if}
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
