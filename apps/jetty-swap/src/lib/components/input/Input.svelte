<script lang="ts">
  export let value: string = ''
  export let onInput: (value: string) => void = () => {}
  export let placeholder = ''
  export let state: 'default' | 'error' = 'default'
  export let disabled = false
  export let ref: HTMLElement | undefined = undefined
  function inputHandler(event: Event) {
    const input = event.target as HTMLInputElement
    onInput(input.value)
  }
</script>

<input
  {disabled}
  type="number"
  inputmode="numeric"
  bind:this={ref}
  class={`text-title ${state}`}
  {placeholder}
  on:input={inputHandler}
  bind:value
/>

<style lang="scss">
  input {
    width: var(--width, 100%);
    height: 40px;
    color: var(--color-dark);
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &:focus::placeholder {
      color: transparent;
    }
  }

  .error {
    color: var(--color-error);
  }
</style>
