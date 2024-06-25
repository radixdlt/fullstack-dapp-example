<script lang="ts">
  import JettyActionButtons from '$lib/components/quest/JettyActionButtons.svelte'
  import EnterEmail from './EnterEmail.svelte'

  export let text: string
  export let onBack: () => void
  export let onNext: () => void

  let email: string
  let sendNewsletter = false
</script>

{@html text}

<EnterEmail bind:email bind:checked={sendNewsletter} />

<JettyActionButtons on:back={onBack} on:next={onNext} />
