<script lang="ts">
  export let selected: boolean
  import SelectedIcon from '@images/selected.svg'
</script>

<div
  class="selection-ring ring"
  class:selected
  style:--background={selected ? `url(${SelectedIcon})` : 'var(--color-dark)'}
/>

<style lang="scss">
  .ring {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
  }

  .selection-ring {
    border: var(--border-lg) var(--color-light);
    border-radius: 50%;
    background: var(--background) no-repeat center;
  }

  .selected {
    border: var(--border) var(--color-primary);
  }
</style>
