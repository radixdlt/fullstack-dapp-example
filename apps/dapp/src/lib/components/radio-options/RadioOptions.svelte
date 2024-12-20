<script lang="ts" context="module">
  export interface LabelledRadioButtonArgs {
    value: string
    title: string
    description: string
    default: boolean
  }
</script>

<script lang="ts">
  import LabelledRadioButton from './LabelledRadioButton.svelte'

  export let name: string
  export let options: LabelledRadioButtonArgs[]
  export let selectedOption: string | undefined = options.find((o) => o.default)?.value || undefined

  const handleSelected = (e: CustomEvent<{ value: string }>) => {
    selectedOption = e.detail.value
  }
</script>

<div class="radio-options">
  {#each options as option, i}
    <LabelledRadioButton
      {...option}
      {name}
      last={i + 1 === options.length}
      on:selected={handleSelected}
      setDefault={option.default}
    />
  {/each}
</div>
