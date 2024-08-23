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
</script>

<div class="get-xrd">
  {#each options as option}
    <LabelledRadioButton {...option} {name} {availableText} />
  {/each}
</div>
