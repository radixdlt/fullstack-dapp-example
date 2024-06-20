<script lang="ts">
  import { otpApi } from '$lib/api/otp-api'
  import Quest from '../Quest.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import DepositHeroBadge from './DepositHeroBadge.svelte'
  import VerifyOtp from './VerifyOTP.svelte'
  import VerifyPhoneNumber from './VerifyPhoneNumber.svelte'
  import { ErrorReason } from '$lib/errors'
  import type { PageData } from './$types'
  import { readable, writable } from 'svelte/store'
  import TextJettyPage from '../TextJettyPage.svelte'
  import type { Quests } from 'content'
  import type { ComponentProps } from 'svelte'

  export let data: PageData

  const text = data.text as Quests['FirstTransactionQuest']['text']

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
    ),
    [ErrorReason.failedToHashPhoneNumber]: $i18n.t(
      'quests:FirstTransactionQuest.failedToAddPhoneNumber'
    )
  }

  const verifyPhoneNumber = writable(data.requirements.VerifyPhoneNumber)

  const depositHeroBadge = writable(data.requirements.DepositHeroBadge)

  let otpError: keyof typeof errors | undefined
  let verifyOtpError = false

  $: phoneNumberError = otpError ? errors[otpError] : undefined

  let sendingOTP = false

  const handleApiError = ({ data }: { data?: { message: keyof typeof errors } }) => {
    otpError = data?.message
  }

  const sendOneTimePassword = async () => {
    sendingOTP = true
    otpError = undefined
    await otpApi.sendOneTimePassword(phoneNumber).mapErr(handleApiError)
    sendingOTP = false
    if (otpError) return
    quest.actions.next()
  }

  export const verifyOneTimePassword = () => {
    otpApi
      .verifyOneTimePassword(phoneNumber, oneTimePassword.join(''))
      .map(() => {
        $verifyPhoneNumber = true
        quest.actions.next()
      })
      .mapErr(() => (verifyOtpError = true))
  }

  let mintBadgeState: ComponentProps<DepositHeroBadge>['state']
</script>

<Quest
  id={data.id}
  requirements={data.requirements}
  bind:this={quest}
  let:next
  steps={[
    {
      id: '1',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['1.md']
      }
    },
    {
      id: '2',
      type: 'regular'
    },
    {
      id: '3',
      type: 'regular'
    },
    {
      id: '4',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['4.md']
      }
    },
    {
      id: 'verifyPhoneNumber',
      type: 'regular',
      skip: verifyPhoneNumber,
      footer: {
        next: {
          enabled: readable(false)
        }
      }
    },
    {
      id: 'verifyOtp',
      type: 'regular',
      skip: verifyPhoneNumber,
      footer: {
        next: {
          enabled: readable(false)
        }
      }
    },
    {
      id: '7a',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['7a.md']
      }
    },
    {
      id: '7b',
      type: 'regular'
    },
    {
      id: '7c',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['7c.md']
      }
    },
    {
      id: 'depositHeroBadge',
      type: 'regular',
      skip: depositHeroBadge,
      footer: {
        next: {
          enabled: depositHeroBadge
        }
      }
    },

    {
      id: '9',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['9.md']
      }
    },
    {
      id: '13',
      type: 'regular'
    },
    {
      type: 'requirements'
    },
    {
      type: 'claimRewards'
    },
    {
      type: 'complete'
    }
  ]}
  let:render
>
  {#if render('2')}
    {@html text['2.md']}
  {/if}

  {#if render('3')}
    {@html text['3.md']}
  {/if}

  {#if render('verifyPhoneNumber')}
    {@html text['5.md']}
    <VerifyPhoneNumber
      bind:phoneNumber
      on:next={next}
      error={phoneNumberError}
      on:click={sendOneTimePassword}
      loading={sendingOTP}
    />
  {/if}

  {#if render('verifyOtp')}
    {@html text['6.md']}
    <VerifyOtp
      bind:phoneNumber
      bind:oneTimePassword
      error={verifyOtpError}
      on:filledInInput={verifyOneTimePassword}
      on:verifyOtp={verifyOneTimePassword}
    />
  {/if}

  {#if render('7b')}
    {@html text['7b.md']}
  {/if}

  {#if render('depositHeroBadge')}
    {#if mintBadgeState === 'updateDepositRules'}
      {@html text['8b.md']}
    {:else}
      {@html text['8a.md']}
    {/if}

    <!-- TODO: use 8b.md conditionally -->
    <DepositHeroBadge
      on:deposited={() => {
        $depositHeroBadge = true
        next()
      }}
      questId={data.id}
      bind:state={mintBadgeState}
    />
  {/if}

  {#if render('13')}
    {@html text['13.md']}
  {/if}
</Quest>
