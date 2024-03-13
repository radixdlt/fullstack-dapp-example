<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import Button from '../button/Button.svelte'

  export let backText = 'Back'
  export let nextText = 'Next'

  const dispatch = createEventDispatcher<{ back: undefined; next: undefined }>()
</script>

<div>
  <Button on:click={() => dispatch('back')}>{backText}</Button>
  <Button on:click={() => dispatch('next')}>{nextText}</Button>
</div>

<style>
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
