<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let checked = false
  export let disabled = false

  const dispatch = createEventDispatcher<{
    checked: undefined
    unchecked: undefined
  }>()

  const handleOnClick = () => {
    dispatch(checked ? 'checked' : 'unchecked')
  }
</script>

<button {disabled} on:click|stopPropagation={handleOnClick} class="wrapper">
  <label class="label">
    <input {disabled} class="checkbox" type="checkbox" class:checked class:disabled bind:checked />
    <span class:disabled>
      <slot />
    </span>
  </label>
</button>

<style lang="scss">
  $border-width: 1px;
  $box-size: 30px;

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    cursor: pointer;
  }
  .label {
    display: flex;
    align-items: center;
    font-size: var(--text-sm);
    gap: var(--spacing-md);
    cursor: pointer;

    :global(p) {
      margin: 0;
    }
  }
  .checkbox {
    cursor: pointer;
    width: $box-size;
    height: $box-size;
    min-width: $box-size;
    min-height: $box-size;
    appearance: none;
    border: $border-width solid var(--color-primary);
    border-radius: var(--border-radius-md);
    margin: 0 var(--spacing-sm) 0 0;
    align-self: center;
    pointer-events: all;
  }

  .checked {
    background:
      center / 50% no-repeat url('@images/checkbox-checkmark.svg'),
      var(--color-primary);
  }

  .disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
</style>
