<script lang="ts" context="module">
  export interface LabelledRadioButtonArgs {
    value: string
    title: string
    description: string
    available?: boolean
  }
</script>

<script lang="ts">
  import LabelledRadioButton from './LabelledRadioButton.svelte'

  export let name: string
  export let options: LabelledRadioButtonArgs[]
  export let availableText:
    | {
        available: string
        notAvailable: string
      }
    | undefined = undefined
  export let selectedOption: string | undefined = undefined

  const handleSelected = (e: CustomEvent<{ value: string }>) => {
    selectedOption = e.detail.value
  }
</script>

<div class="radio-options">
  {#each options as option, i}
    <LabelledRadioButton
      {...option}
      {name}
      {availableText}
      last={i + 1 === options.length}
      on:selected={handleSelected}
    />
  {/each}
</div>
