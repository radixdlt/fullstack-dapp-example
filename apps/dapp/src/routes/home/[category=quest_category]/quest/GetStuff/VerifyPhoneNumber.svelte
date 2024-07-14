<script lang="ts">
  import Button from '$lib/components/button/Button.svelte'
  import PhoneNumberInput from '$lib/components/phone-number-input/PhoneNumberInput.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import Error from '$lib/components/error/Error.svelte'
  import VirtualSimWarning from './VirtualSIMWarning.svelte'

  export let phoneNumber: string
  export let error: string | undefined
  export let loading = false
</script>

<div class="container">
  <div class="phone-number">
    <PhoneNumberInput bind:number={phoneNumber} />

    <VirtualSimWarning />

    {#if error}
      <Error>
        {error}
      </Error>
    {/if}

    <Button on:click {loading}>{$i18n.t('quests:GetStuff.sendSmsButton')}</Button>
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .phone-number {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
    align-items: center;
  }
</style>
