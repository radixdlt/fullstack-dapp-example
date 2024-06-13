<script lang="ts">
  export let value: string = ''
  export let onInput: (value: string) => void = () => {}
  export let placeholder = ''
  export let state: 'default' | 'error' = 'default'
  export let disabled = false
  function inputHandler(event: Event) {
    const input = event.target as HTMLInputElement
    onInput(input.value)
  }
</script>

<input {disabled} class={`text-title ${state}`} {placeholder} on:input={inputHandler} bind:value />

<style>
  input {
    width: var(--width, 100%);
    height: 40px;
    color: var(--color-dark);
  }

  .error {
    color: var(--color-error);
  }
</style>
