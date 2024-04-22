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
  import { rdt } from '$lib/rdt'
  import { OneTimeDataRequestBuilder, SignedChallengeAccount } from '@radixdlt/radix-dapp-toolkit'
  import { userApi } from '$lib/api/user-api'
  import { user } from '../../../stores'
  import { readable, writable } from 'svelte/store'
  import Button from '$lib/components/button/Button.svelte'
  import TextJettyPage from '../TextJettyPage.svelte'

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

  const verifyPhoneNumber = writable(data.requirements.VerifyPhoneNumber)
  const connectAccountReq = writable(data.requirements.ConnectAccount)
  const depositUserBadge = writable(data.requirements.DepositUserBadge)

  let otpError: keyof typeof errors | undefined
  let verifyOtpError = false

  $: phoneNumberError = otpError ? errors[otpError] : undefined

  let waitingOnAccount = false

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

  const connectAccount = () => {
    waitingOnAccount = true
    rdt.then((rdt) => {
      rdt.walletApi
        .sendOneTimeRequest(OneTimeDataRequestBuilder.accounts().exactly(1).withProof())
        .map(async ({ accounts, proofs }) => {
          waitingOnAccount = false
          const accountProof = proofs.find(
            (proof) => proof.type === 'account'
          )! as SignedChallengeAccount

          const result = await userApi.setAccountAddress(accounts[0].address, accountProof)

          if (result.isOk()) {
            $user!.accountAddress = accounts[0].address
            $connectAccountReq = true
            quest.actions.next()
          }
        })
        .mapErr(() => {
          waitingOnAccount = false
        })
    })
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

  let email: string
  let sendNewsletter = false
</script>

<Quest
  id={data.id}
  requirements={data.requirements}
  bind:this={quest}
  let:next
  steps={[
    {
      id: 'intro1',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: data.text['0.md']
      }
    },
    {
      id: 'intro2',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: data.text['1.md']
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
      id: 'connectAccount',
      type: 'regular',
      skip: connectAccountReq,
      footer: {
        next: {
          enabled: connectAccountReq
        }
      }
    },
    {
      id: 'depositUserBadge',
      type: 'regular',
      skip: depositUserBadge,
      footer: {
        next: {
          enabled: depositUserBadge
        }
      }
    },
    {
      id: 'email',
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
  {#if render('verifyPhoneNumber')}
    <VerifyPhoneNumber
      bind:phoneNumber
      on:next={next}
      error={phoneNumberError}
      on:click={sendOneTimePassword}
      loading={sendingOTP}
    />
  {/if}

  {#if render('verifyOtp')}
    <VerifyOtp
      bind:phoneNumber
      bind:oneTimePassword
      error={verifyOtpError}
      on:filledInInput={verifyOneTimePassword}
      on:verifyOtp={verifyOneTimePassword}
    />
  {/if}

  {#if render('connectAccount')}
    {@html data.text['connectAccount.md']}

    <Button on:click={connectAccount} loading={waitingOnAccount}
      >{$i18n.t('quests:FirstTransactionQuest.connectAccount')}
    </Button>
  {/if}

  {#if render('depositUserBadge')}
    {@html data.text['userBadge.md']}
    <DepositUserBadge
      on:deposited={() => {
        $depositUserBadge = true
        next()
      }}
      questId={data.id}
    />
  {/if}

  {#if render('email')}
    {@html data.text['email.md']}

    <EnterEmail bind:email bind:checked={sendNewsletter} />
  {/if}
</Quest>
