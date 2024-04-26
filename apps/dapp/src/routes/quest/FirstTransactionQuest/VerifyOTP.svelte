<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import VerificationCodeInput from '$lib/components/verification-code-input/VerificationCodeInput.svelte'
  import { otpApi } from '$lib/api/otp-api'
  import Error from './Error.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import Icon from '$lib/components/icon/Icon.svelte'
  import ArrowIcon from '@images/arrow-clockwise.svg'
  import VirtualSimWarning from './VirtualSIMWarning.svelte'
  import Button from '$lib/components/button/Button.svelte'

  export let phoneNumber: string
  export let oneTimePassword: string[]
  export let error = false

  const dispatch = createEventDispatcher<{
    filledInInput: undefined
    verifyOtp: undefined
  }>()

  const resendCode = () => {
    otpApi.sendOneTimePassword(phoneNumber)
    startCountdown()
  }

  let timeToResendSeconds = 60

  const startCountdown = () => {
    timeToResendSeconds = 60
    const interval = setInterval(() => {
      timeToResendSeconds--
      if (timeToResendSeconds === 0) {
        clearInterval(interval)
      }
    }, 1000)
  }

  startCountdown()
</script>

<div class="verify-otp">
  <div class="text-faded">
    {$i18n.t('quests:FirstTransactionQuest.verifyOtpText')}
    {phoneNumber}
  </div>

  <VerificationCodeInput
    bind:values={oneTimePassword}
    on:completed={() => {
      dispatch('filledInInput')
    }}
  />

  <VirtualSimWarning />

  <div style:height="2rem">
    {#if error}
      <Error>
        {$i18n.t('quests:FirstTransactionQuest.invalidOtp')}
      </Error>
    {/if}
  </div>

  <div class="bottom-text text-faded">
    {#if timeToResendSeconds > 0}
      <div>Resend code in: {timeToResendSeconds} seconds</div>
    {:else}
      <Icon --size="16px" url={ArrowIcon} on:click={resendCode} clickable>Send code again</Icon>
    {/if}
  </div>

  <Button
    on:click={() => {
      dispatch('verifyOtp')
    }}
    >{$i18n.t('quests:FirstTransactionQuest.verifyOtpButton')}
  </Button>
</div>

<style>
  .verify-otp {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xl);
  }

  .bottom-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
  }
</style>
