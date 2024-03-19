<script lang="ts">
  import PhoneNumberInput from '$lib/components/phone-number-input/PhoneNumberInput.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import Error from './Error.svelte'
  import VirtualSimWarning from './VirtualSIMWarning.svelte'

  export let phoneNumber: string
  export let error: string | undefined
</script>

<div class="container">
  <div class="phone-number">
    <div class="text-faded">{$i18n.t('quests:FirstTransactionQuest.phoneNumberInputTitle')}</div>

    <PhoneNumberInput bind:number={phoneNumber} />

    <VirtualSimWarning />

    {#if error}
      <Error>
        {error}
      </Error>
    {/if}
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .phone-number {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
    align-items: center;
  }
</style>
