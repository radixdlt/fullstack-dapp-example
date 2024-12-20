<script context="module">
  export const meta = {
    tags: ['autodocs']
  }
</script>

<script lang="ts">
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import CountrySelect from './CountrySelect.svelte'

  let country: string
</script>

<Template>
  <div class="container">
    <CountrySelect bind:country />
  </div>
</Template>

<Story name="Primary" />

<style>
  .container {
    height: 20rem;
  }
</style>
