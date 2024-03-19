<script context="module">
  export const meta = {
    tags: ['autodocs']
  }
</script>

<script lang="ts">
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import PhoneNumberInput from './PhoneNumberInput.svelte'

  let number: string
</script>

<Template>
  <div class="container">
    <PhoneNumberInput bind:number />
  </div>
</Template>

<Story name="Primary" />

<style>
  .container {
    height: 20rem;
  }
</style>
