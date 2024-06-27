<script lang="ts">
  import { otpApi } from '$lib/api/otp-api'
  import Quest from '../Quest.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import DepositHeroBadge from './DepositHeroBadge.svelte'
  import VerifyOtp from './VerifyOTP.svelte'
  import VerifyPhoneNumber from './VerifyPhoneNumber.svelte'
  import { ErrorReason } from '$lib/errors'
  import type { PageData } from './$types'
  import { readable, writable, derived } from 'svelte/store'
  import type { Quests } from 'content'
  import { type ComponentProps, onMount } from 'svelte'
  import { GatewayApi } from 'common'
  import { publicConfig } from '$lib/public-config'
  import { OneTimeDataRequestBuilder, SignedChallengeAccount } from '@radixdlt/radix-dapp-toolkit'
  import { rdt } from '$lib/rdt'
  import { userApi } from '$lib/api/user-api'
  import { user } from '../../../../../stores'
  import Button from '$lib/components/button/Button.svelte'
  import { questApi } from '$lib/api/quest-api'

  export let data: PageData

  const text = data.text as Quests['FirstTransactionQuest']['text']

  let quest: Quest
  let phoneNumber: string
  let oneTimePassword: string[]

  let waitingOnAccount = false
  let mintBadgeState: ComponentProps<DepositHeroBadge>['state']
  const registeredAccountAddress = derived(user, ($user) => !!$user?.accountAddress)
  const verifyPhoneNumber = writable(data.requirements.VerifyPhoneNumber.isComplete)
  const depositHeroBadge = writable(data.requirements.DepositHeroBadge.isComplete)

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

  onMount(() => {
    const gatewayApi = GatewayApi(publicConfig.networkId)
    gatewayApi.callApi('getEntityDetailsVaultAggregated', [])
  })

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

  const connectAccount = () => {
    waitingOnAccount = true
    rdt.then((rdt) => {
      rdt.walletApi
        .sendOneTimeRequest(OneTimeDataRequestBuilder.accounts().exactly(1).withProof())
        .andThen(({ accounts, proofs }) => {
          waitingOnAccount = false

          const accountProof = proofs.find((proof) => proof.type === 'account')!

          return userApi
            .setUserField({
              accountAddress: accounts[0].address,
              proof: accountProof as SignedChallengeAccount,
              field: 'accountAddress'
            })
            .map(() => {
              $user!.accountAddress = accounts[0].address
              quest.actions.next()
            })
        })
        .mapErr(() => {
          waitingOnAccount = false
        })
    })
  }
</script>

<Quest
  id={data.id}
  requirements={data.requirements}
  bind:this={quest}
  let:next
  steps={[
    {
      id: '0',
      type: 'jetty'
    },
    {
      id: '1',
      type: 'jetty'
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
      id: '4',
      type: 'regular'
    },
    {
      id: '5',
      type: 'jetty'
    },
    {
      id: '6',
      type: 'jetty'
    },
    {
      id: '7',
      type: 'regular',
      footer: {
        next: {
          enabled: registeredAccountAddress
        }
      },
      skip: registeredAccountAddress
    },
    {
      id: '8',
      type: 'regular'
    },
    {
      id: '9',
      type: 'jetty'
    },
    {
      id: '10',
      type: 'regular'
    },
    {
      id: '11',
      type: 'regular'
    },
    {
      id: '12',
      type: 'jetty'
    },
    {
      id: '13',
      type: 'regular'
    },
    {
      id: '14',
      type: 'jetty',
      footer: {
        next: {
          onClick: (next) => {
            userApi.directDepositXrd().map(() => {
              next()
            })
          }
        }
      }
    },

    {
      id: '15',
      type: 'regular'
    },
    {
      id: '16',
      type: 'regular'
    },
    {
      id: '17',
      type: 'jetty'
    },
    {
      id: '18',
      type: 'jetty'
    },
    {
      id: '19',
      type: 'jetty'
    },
    {
      id: '20',
      type: 'regular',
      skip: depositHeroBadge,
      footer: {
        next: {
          enabled: depositHeroBadge
        }
      }
    },
    {
      id: '21',
      type: 'regular'
    },
    {
      id: '22',
      type: 'jetty'
    },

    {
      id: '23',
      type: 'jetty'
    },
    {
      id: '24',
      type: 'jetty',
      footer: {
        next: {
          onClick: (next) => {
            next()
          }
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
      type: 'complete'
    }
  ]}
  let:render
>
  {#if render('0')}
    {@html text['0.md']}
  {/if}

  {#if render('1')}
    {@html text['1.md']}
  {/if}

  {#if render('2')}
    {@html text['2.md']}
  {/if}

  {#if render('3')}
    {@html text['3.md']}
  {/if}

  {#if render('verifyPhoneNumber')}
    <p>{$i18n.t('quests:FirstTransactionQuest.enterYourPhoneNumber')}</p>
    <p>{$i18n.t('quests:FirstTransactionQuest.weWillNotShare')}</p>
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

  {#if render('4')}
    {@html text['4.md']}
  {/if}

  {#if render('5')}
    {@html text['5.md']}
  {/if}

  {#if render('6')}
    {@html text['6.md']}
  {/if}

  {#if render('7')}
    {@html text['7.md']}

    <Button on:click={connectAccount} loading={waitingOnAccount}
      >{$i18n.t('quests:FirstTransactionQuest.registerAccount')}
    </Button>
  {/if}

  {#if render('8')}
    {@html text['8.md']}
  {/if}

  {#if render('9')}
    {@html text['9.md']}
  {/if}

  {#if render('10')}
    {@html text['10.md']}
  {/if}

  {#if render('11')}
    {@html text['11.md']}
  {/if}

  {#if render('12')}
    {@html text['12.md']}
  {/if}

  {#if render('13')}
    {@html text['13.md']}
  {/if}

  {#if render('14')}
    {@html text['14a.md']}
  {/if}

  {#if render('15')}
    {@html text['15.md']}
  {/if}

  {#if render('16')}
    {@html text['16.md']}
  {/if}

  {#if render('17')}
    {@html text['17.md']}
  {/if}

  {#if render('18')}
    {@html text['18.md']}
  {/if}

  {#if render('19')}
    {@html text['19.md']}
  {/if}

  {#if render('20')}
    {@html text['20.md']}

    <DepositHeroBadge
      on:deposited={() => {
        $depositHeroBadge = true
        next()
      }}
      questId={data.id}
      bind:state={mintBadgeState}
    />
  {/if}

  {#if render('21')}
    {@html text['21.md']}
  {/if}

  {#if render('22')}
    {@html text['22.md']}
  {/if}

  {#if render('23')}
    {@html text['23.md']}
  {/if}

  {#if render('24')}
    {@html text['24.md']}
  {/if}
</Quest>
