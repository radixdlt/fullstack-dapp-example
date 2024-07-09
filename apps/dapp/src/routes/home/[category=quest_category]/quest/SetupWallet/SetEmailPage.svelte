<script lang="ts">
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte'
  import EmailInput from '$lib/components/email-input/EmailInput.svelte'

  export let privacyPolicyText: string
  export let marketingUpdatesText: string

  export let email: string
  export let sendNewsletter: boolean

  let emailInput: EmailInput
</script>

<div class="enter-email">
  <EmailInput bind:this={emailInput} bind:email />

  {@html privacyPolicyText}

  <Checkbox bind:checked={sendNewsletter}>{@html marketingUpdatesText}</Checkbox>
</div>

<style lang="scss">
  .enter-email {
    display: flex;
    flex-direction: column;
  }
</style>
