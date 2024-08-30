<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  export let name: string
  export let value: string
  export let title: string
  export let description: string
  export let last: boolean
  export let setDefault = false

  const dispatch = createEventDispatcher()
  const handleChange = (
    e: Event & {
      currentTarget: EventTarget & HTMLInputElement
    }
  ) => {
    if (e.currentTarget.checked) {
      dispatch('selected', { value })
    }
  }

  onMount(() => {
    if (setDefault) dispatch('selected', { value })
  })
</script>

<div class="get-xrd-method" class:last>
  <input
    type="radio"
    checked={setDefault}
    {name}
    {value}
    id={name + '_' + value}
    on:change={handleChange}
  />
  <label for={name + '_' + value}>
    <p><strong>{title}</strong></p>
    <p>{description}</p>
  </label>
</div>

<style lang="scss">
  .get-xrd-method {
    display: flex;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid var(--color-neutral);

    &.last {
      border-bottom: none;
    }
  }

  input {
    position: relative;
    height: 1em;
    min-width: 1em;
    background-color: #eeeded;
    border-radius: 50%;
    border: 1px solid var(--color-dark-translucent);
    margin-right: 1rem;

    &:hover {
      opacity: 0.7;
    }

    &:checked {
      border-color: var(--color-primary);
      opacity: 1;
    }

    &:after {
      content: '';
      position: absolute;
      display: none;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0.5em;
      height: 0.5em;
      border-radius: 50%;
      background: var(--color-primary);
    }

    &:checked:after {
      display: block;
    }
  }

  p {
    margin: 0.2em 0;
  }
</style>
