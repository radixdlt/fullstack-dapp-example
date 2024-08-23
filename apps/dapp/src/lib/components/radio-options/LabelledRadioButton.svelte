<script lang="ts">
  export let name: string
  export let value: string
  export let title: string
  export let description: string
  export let available: boolean | undefined = undefined
  export let availableText:
    | {
        available: string
        notAvailable: string
      }
    | undefined = undefined
</script>

<div class="get-xrd-method">
  <input type="radio" {name} {value} id={name + '_' + value} />
  <label for={name + '_' + value}>
    <p><strong>{title}</strong></p>
    <p>{description}</p>
    {#if availableText && available}
      <p style="color:orange">{availableText?.available}</p>
    {:else if availableText && !available}
      <p style="color:red">{availableText?.notAvailable}</p>
    {/if}
  </label>
</div>

<style lang="scss">
  .get-xrd-method {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--color-neutral);
  }

  input {
    position: relative;
    height: 1em;
    width: 1em;
    background-color: var(--color-neutral);
    border-radius: 50%;
    border: 1px solid var(--color-dark-translucent);
    margin-right: 1rem;

    &:hover {
      opacity: 0.8;
    }

    &:checked {
      border: 1.5px solid var(--color-primary);
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
</style>
