<script lang="ts">
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte'
  import EmailInput from '$lib/components/email-input/EmailInput.svelte'
  import Error from '$lib/components/error/Error.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import * as valibot from 'valibot'
  export let privacyPolicyText: string
  export let marketingUpdatesText: string

  export let email: string
  export let error: string = ''
  export let sendNewsletter: boolean
  export let hasError: boolean

  let emailInput: EmailInput
  let pristine: boolean = true

  const emailSchema = valibot.pipe(valibot.string(), valibot.email())

  $: {
    if (error) {
      hasError = true
    }

    if (email) {
      const out = valibot.safeParse(emailSchema, email)
      hasError = !out.success
    }
  }
</script>

<div class="enter-email">
  <EmailInput
    bind:this={emailInput}
    bind:email
    on:blur={() => {
      pristine = false
    }}
  />

  {#if hasError && !pristine}
    <Error faded={false}>{$i18n.t('quests:invalidEmail')}</Error>
  {/if}

  {@html privacyPolicyText}

  <Checkbox bind:checked={sendNewsletter} disabled={!email || hasError}
    >{@html marketingUpdatesText}</Checkbox
  >
</div>

<style lang="scss">
  .enter-email {
    display: flex;
    flex-direction: column;
  }
</style>
