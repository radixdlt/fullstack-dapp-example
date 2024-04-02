<script lang="ts">
  import { otpApi } from '$lib/api/otp-api'
  import Quest from '../Quest.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import DepositUserBadge from './DepositUserBadge.svelte'
  import VerifyOtp from './VerifyOTP.svelte'
  import VerifyPhoneNumber from './VerifyPhoneNumber.svelte'
  import { ErrorReason } from '$lib/errors'
  import type { PageData } from './$types'
  import EnterEmail from './EnterEmail.svelte'

  export let data: PageData

  let quest: Quest

  let phoneNumber: string
  let oneTimePassword: string[]

  const errors = {
    [ErrorReason.failedToSendOTP]: $i18n.t('quests:FirstTransactionQuest.failedToSendOtp'),
    [ErrorReason.phoneNumberExists]: $i18n.t('quests:FirstTransactionQuest.phoneNumberExists'),
    [ErrorReason.invalidPhoneNumber]: $i18n.t('quests:FirstTransactionQuest.invalidPhoneNumber'),
    [ErrorReason.invalidOTP]: $i18n.t('quests:FirstTransactionQuest.invalidOtp'),
    [ErrorReason.otpInvalidRequest]: $i18n.t('quests:FirstTransactionQuest.invalidRequest'),
    [ErrorReason.failedToAddPhoneNumber]: $i18n.t(
      'quests:FirstTransactionQuest.failedToAddPhoneNumber'
    )
  }

  let otpError: keyof typeof errors | undefined

  $: phoneNumberError = otpError ? errors[otpError] : undefined

  const handleApiError = ({ data }: { data?: { message: keyof typeof errors } }) => {
    otpError = data?.message
  }

  const sendOneTimePassword = async () => {
    otpError = undefined
    await otpApi.sendOneTimePassword(phoneNumber).mapErr(handleApiError)
    if (otpError) return
    quest.actions.next()
  }

  let verifyOTP: VerifyOtp

  let email: string
  let sendNewsletter = false
</script>

<Quest
  {...data.questProps}
  bind:this={quest}
  let:next
  let:back
  steps={[
    { id: 'intro1', type: 'jetty', dialogs: 1 },
    { id: 'intro2', type: 'jetty', dialogs: 1 },
    {
      id: 'verifyPhoneNumber',
      type: 'regular',
      skip: data.requirements?.VerifyPhoneNumber,
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
      skip: data.requirements?.VerifyPhoneNumber,
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
      skip: data.requirements?.DepositUserBadge
    },
    {
      id: 'email',
      type: 'regular',
      footer: {
        type: 'action',
        action: {
          text: $i18n.t('quests:nextButton'),
          onClick: () => quest.actions.next()
        }
      }
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

  {#if render('email')}
    {@html data.text['email.md']}

    <EnterEmail bind:email bind:checked={sendNewsletter} />
  {/if}

  <svelte:fragment
    slot="jetty"
    let:render
    let:Button
    let:Buttons
    let:next
    let:back
    let:completeQuest
  >
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
      <Button on:click={completeQuest}>Great!</Button>
    {/if}
  </svelte:fragment>
</Quest>
