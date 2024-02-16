<script lang="ts">
  import SelectedIcon from '@images/selected.svg'
  import Card from './Card.svelte'

  export let title: string
  export let description: string
  export let backgroundImage: string
  export const select = () => (selected = true)
  export const deselect = () => (selected = false)
  export let selected = false
  export let selectable = true
</script>

<Card on:selected on:deselected {selectable} bind:selected>
  <div class="transform-card" style:--background-image={`url(${backgroundImage})`}>
    <h3>{title}</h3>
    <p>{description}</p>

    {#if selected}
      <img class="selected-icon" src={SelectedIcon} alt="Selected" />
    {/if}
  </div>
</Card>

<style lang="scss">
  $default-width: 10rem;
  $text-color: var(--color-light);

  .transform-card {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: var(--background-image) no-repeat center;
    background-size: cover;
  }

  .selected-icon {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
  }

  h3 {
    color: $text-color;
    font-size: 18px;
  }

  p {
    color: $text-color;
    font-size: 6px;
  }
</style>
