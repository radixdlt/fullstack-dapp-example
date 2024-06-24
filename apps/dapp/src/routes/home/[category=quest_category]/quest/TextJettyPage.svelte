<script lang="ts">
  import JettyActionButtons from '$lib/components/quest/JettyActionButtons.svelte'

  export let text: string
  export let onBack: () => void
  export let onNext: () => void
  export let isNextDisabled = false
</script>

{@html text}

<JettyActionButtons {isNextDisabled} on:back={onBack} on:next={onNext} />
