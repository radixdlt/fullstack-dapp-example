<script lang="ts">
  import { goto } from '$app/navigation'
  import { otpApi } from '$lib/api/otp-api'
  import Quest from '../Quest.svelte'
  import { OtpErrorCodes, type OtpError } from '$lib/errors'
  import { i18n } from '$lib/i18n/i18n'
  import type { PageData } from './$types'
  import DepositUserBadge from './DepositUserBadge.svelte'
  import VerifyOtp from './VerifyOTP.svelte'
  import VerifyPhoneNumber from './VerifyPhoneNumber.svelte'

  export let data: PageData

  let quest: Quest

  let phoneNumber: string
  let oneTimePassword: string[]

  const errors: Record<OtpError, string> = {
    [OtpErrorCodes.FailedToSendOtp]: $i18n.t('quests:FirstTransactionQuest.failedToSendOtp'),
    [OtpErrorCodes.PhoneNumberExists]: $i18n.t('quests:FirstTransactionQuest.phoneNumberExists'),
    [OtpErrorCodes.InvalidPhoneNumber]: $i18n.t('quests:FirstTransactionQuest.invalidPhoneNumber'),
    [OtpErrorCodes.InvalidOtp]: $i18n.t('quests:FirstTransactionQuest.invalidOtp'),
    [OtpErrorCodes.InvalidRequest]: $i18n.t('quests:FirstTransactionQuest.invalidRequest'),
    [OtpErrorCodes.FailedToAddPhoneNumber]: $i18n.t(
      'quests:FirstTransactionQuest.failedToAddPhoneNumber'
    )
  }

  let otpError: OtpError | undefined

  $: phoneNumberError = otpError ? errors[otpError] : undefined

  const handleApiError = ({ data }: { data?: { message: OtpError } }) => {
    otpError = data?.message
  }

  const sendOneTimePassword = async () => {
    otpError = undefined
    await otpApi.sendOneTimePassword(phoneNumber).mapErr(handleApiError)
    if (otpError) return
    quest.actions.next()
  }

  let verifyOTP: VerifyOtp
</script>

<Quest
  bind:this={quest}
  {...data.questProps}
  let:next
  let:back
  steps={[
    { id: 'intro1', type: 'jetty', dialogs: 1 },
    { id: 'intro2', type: 'jetty', dialogs: 1 },
    {
      id: 'verifyPhoneNumber',
      type: 'regular',
      skip: data.requirements.VerifyPhoneNumber,
      footer: {
        type: 'action',
        action: {
          text: `${$i18n.t('quests:FirstTransactionQuest.sendSmsButton')}`,
          onClick: sendOneTimePassword
        }
      }
    },
    {
      id: 'verifyOtp',
      type: 'regular',
      skip: data.requirements.VerifyPhoneNumber,
      footer: {
        type: 'action',
        action: {
          text: `${$i18n.t('quests:FirstTransactionQuest.verifyOtpButton')}`,
          onClick: () => verifyOTP.verifyOneTimePassword()
        }
      }
    },
    {
      id: 'depositUserBadge',
      type: 'regular',
      skip: data.requirements.DepositUserBadge
    },
    {
      type: 'requirements'
    },
    {
      type: 'claimRewards'
    },
    {
      id: 'greeting',
      type: 'jetty',
      dialogs: 1
    }
  ]}
  let:render
>
  {#if render('verifyPhoneNumber')}
    <VerifyPhoneNumber bind:phoneNumber on:next={next} error={phoneNumberError} />
  {/if}

  {#if render('verifyOtp')}
    <VerifyOtp
      bind:this={verifyOTP}
      bind:phoneNumber
      bind:oneTimePassword
      on:next={next}
      on:modify-phone-number={back}
    />
  {/if}

  {#if render('depositUserBadge')}
    <DepositUserBadge on:next={next} questId={data.id} />
  {/if}

  <svelte:fragment slot="jetty" let:render let:Button let:Buttons let:next let:back>
    {#if render('intro1')}
      {@html data.text['0.md']}
      <Button on:click={next}>OK</Button>
    {/if}

    {#if render('intro2')}
      {@html data.text['1.md']}
      <Buttons nextText="OK" on:back={back} on:next={next} />
    {/if}

    {#if render('greeting')}
      {@html data.text['greeting.md']}
      <Button on:click={() => goto('/')}>Great!</Button>
    {/if}
  </svelte:fragment>
</Quest>
