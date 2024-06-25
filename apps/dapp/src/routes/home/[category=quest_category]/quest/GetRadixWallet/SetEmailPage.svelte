<script lang="ts">
  import EnterEmail from './EnterEmail.svelte'

  export let text: string

  let email: string
  let sendNewsletter = false
</script>

{@html text}

<EnterEmail bind:email bind:checked={sendNewsletter} />
