<script lang="ts">
  export let value: string = ''
  export let onInput: (value: string) => void = () => {}
  export let fullWidth: boolean = false
  export let maxLength: number | undefined = undefined

  function inputHandler(event: Event) {
    const input = event.target as HTMLInputElement
    onInput(input.value)
  }
</script>

<input on:input={inputHandler} bind:value class:fullWidth maxlength={maxLength} />

<style lang="scss">
  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;

    &.fullWidth {
      width: 100%;
      box-sizing: border-box;
    }
  }
</style>
