<script lang="ts">
  import { writable } from 'svelte/store'
  import { otpApi, type OtpError, OtpErrorCodes } from '../../../routes/api/(protected)/otp/otp-api'
  import Button from '../button/Button.svelte'
  import { createEventDispatcher } from 'svelte'
  import { i18n } from '$lib/i18n'

  const values = {
    phoneNumber: '',
    oneTimePassword: ''
  }

  const errors: Record<OtpError, string> = {
    [OtpErrorCodes.FailedToSendOtp]: $i18n.t('verifyPhoneNumber_failedToSendOtp'),
    [OtpErrorCodes.PhoneNumberExists]: $i18n.t('verifyPhoneNumber_phoneNumberExists'),
    [OtpErrorCodes.InvalidPhoneNumber]: $i18n.t('verifyPhoneNumber_invalidPhoneNumber'),
    [OtpErrorCodes.InvalidOtp]: $i18n.t('verifyPhoneNumber_invalidOtp'),
    [OtpErrorCodes.InvalidRequest]: $i18n.t('verifyPhoneNumber_invalidRequest'),
    [OtpErrorCodes.FailedToAddPhoneNumber]: $i18n.t('verifyPhoneNumber_failedToAddPhoneNumber')
  }

  const dispatch = createEventDispatcher()
  const otpError = writable<OtpError | undefined>()

  const handleInputChange = (name: keyof typeof values) => (event: Event) => {
    const target = event.target as HTMLInputElement
    values[name] = target.value
  }

  const handleApiError = ({ data }: { data?: { message: OtpError } }) => {
    otpError.set(data?.message)
  }

  const sendOneTimePassword = () => {
    otpApi.sendOneTimePassword(values.phoneNumber).mapErr(handleApiError)
  }

  const verifyOneTimePassword = () => {
    otpApi
      .verifyOneTimePassword(values.phoneNumber, values.oneTimePassword)
      .map(() => {
        dispatch('next')
      })
      .mapErr(handleApiError)
  }
</script>

Phone Number:
<input type="text" on:change={handleInputChange('phoneNumber')} />

<Button on:click={sendOneTimePassword}>Send One Time Password</Button>

One Time Password:
<input type="text" on:change={handleInputChange('oneTimePassword')} />

<Button on:click={verifyOneTimePassword}>Verify One Time Password</Button>

{#if $otpError}
  <div>{errors[$otpError]}</div>
{/if}
