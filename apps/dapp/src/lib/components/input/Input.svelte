<script lang="ts">
  export let onInput: (value: string) => void

  function inputHandler(event: Event) {
    const input = event.target as HTMLInputElement
    onInput(input.value)
  }
</script>

<input on:input={inputHandler} />

<style lang="scss">
  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
</style>
