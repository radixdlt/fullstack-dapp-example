<script lang="ts">
  import JettyActionButtons from '$lib/components/quest/JettyActionButtons.svelte'

  export let text: string
  export let onBack: () => void
  export let onNext: () => void
</script>

{@html text}

<JettyActionButtons on:back={onBack} on:next={onNext} />
