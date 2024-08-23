<script lang="ts">
  import countries from './countries.json'
  import { onMount } from 'svelte'
  import Svelecte from 'svelecte'

  export let country: string

  onMount(async () => {})
</script>

<Svelecte
  class="country-select"
  bind:value={country}
  options={countries}
  placeholder="Select a country"
/>

<style lang="scss">
  :global(.country-select) {
    --sv-border: var(--border) var(--color-neutral);
    --sv-border-radius: var(--border-radius-lg);
    --sv-min-height: 3rem;
    --sv-dropdown-width: min(calc(400px - 4rem), calc(100vw - 6rem));
    --sv-bg: var(--color-light);
  }
</style>
