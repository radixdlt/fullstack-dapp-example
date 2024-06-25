<script lang="ts">
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte'
  import EmailInput from '$lib/components/email-input/EmailInput.svelte'
  import { i18n } from '$lib/i18n/i18n'

  export let email: string
  export let checked: boolean

  let emailInput: EmailInput
</script>

<div class="enter-email">
  <EmailInput bind:this={emailInput} bind:email />

  <Checkbox bind:checked>{$i18n.t('quests:FirstTransactionQuest.allowMarketing')}</Checkbox>
</div>

<style lang="scss">
  .enter-email {
    margin-top: var(--spacing-2xl);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2xl);
    align-items: center;
  }
</style>
