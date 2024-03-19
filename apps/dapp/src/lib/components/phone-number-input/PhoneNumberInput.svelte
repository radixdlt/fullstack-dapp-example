<script lang="ts">
  import 'intl-tel-input/build/css/intlTelInput.css'
  import intlTelInput from 'intl-tel-input'
  import { onMount } from 'svelte'

  export let number: string
  export const validate = () => {
    isValid = iti.isValidNumber()
  }

  let input: HTMLElement
  let iti: intlTelInput.Plugin

  onMount(async () => {
    iti = intlTelInput(input, {
      //@ts-ignore
      utilsScript: await import('intl-tel-input/build/js/utils.js') // TODO show loading state when loading this
    })
  })

  let isValid = true
</script>

<input
  on:input={() => (number = iti.getNumber())}
  type="tel"
  bind:this={input}
  class="phone-number-input"
  class:invalid={!isValid}
/>

<style lang="scss">
  .phone-number-input {
    border: var(--border) var(--color-neutral);
    border-radius: var(--border-radius-lg);
    height: 3rem;
  }

  .invalid {
    border-color: var(--color-error);
  }
</style>
