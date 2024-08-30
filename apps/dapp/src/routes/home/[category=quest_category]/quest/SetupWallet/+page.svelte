<script lang="ts">
  import { onMount, type ComponentProps } from 'svelte'
  import Quest from '../Quest.svelte'
  import type { PageData } from './$types'
  import { useCookies } from '$lib/utils/cookies'
  import { derived, writable } from 'svelte/store'
  import type { Quests } from 'content'
  import { user, ErrorPopupId, errorPopupStore, isUserBlocked } from '../../../../../stores'
  import SetEmailPage from './SetEmailPage.svelte'
  import { questApi } from '$lib/api/quest-api'
  import Button from '$lib/components/button/Button.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import SetUsername from './SetUsername.svelte'
  import { userApi } from '$lib/api/user-api'
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte'
  import { htmlReplace } from '$lib/helpers/html-replace'
  import AppsFlyer from './AppsFlyer.svelte'
  import { markNotificationAsSeen } from '$lib/notifications'
  import { isMobile } from '@radixdlt/radix-dapp-toolkit'
  import DepositHeroBadge from './DepositHeroBadge.svelte'
  import { rdt } from '$lib/rdt'
  import { OneTimeDataRequestBuilder, SignedChallengeAccount } from '@radixdlt/radix-dapp-toolkit'
  import { gatewayApi, publicConfig } from '$lib/public-config'
  import { err, ok } from 'neverthrow'

  export let data: PageData

  const text = data.text as Quests['SetupWallet']['text']

  let marketingUpdatesCheckbox: boolean
  let email = $user?.email?.email || ''
  let hasError: boolean
  let confirmedWalletInstall = writable<boolean>(false)
  let walletIsLinked = writable(data.requirements.ConnectWallet?.isComplete)
  let waitingOnAccount = false

  const skipMobileWalletInstall = writable<boolean>(false)
  const registeredAccountAddress = derived(user, ($user) => !!$user?.accountAddress)
  const depositHeroBadge = derived(
    isUserBlocked,
    ($isUserBlocked) => data.requirements.DepositHeroBadge.isComplete || $isUserBlocked
  )
  let mintBadgeState: ComponentProps<DepositHeroBadge>['state']

  const checkAccountStatus = (accountAddress: string) =>
    gatewayApi
      .hasHeroBadgeAndXrd(accountAddress)
      .mapErr(() => ({ reason: 'failedToCheckAccountStatus' }))
      .andThen(({ hasHeroBadge, hasXrd }) =>
        hasHeroBadge ? err({ reason: 'UserHasHeroBadge' }) : ok(hasXrd)
      )

  const handleXrdDepositPossibility = (accountAddress: string) =>
    gatewayApi
      .isDepositDisabledForResource(accountAddress, publicConfig.xrd)
      .mapErr(() => ({ reason: 'failedToCheckDepositStatus' }))

  const setUserAccountAddress = (accountAddress: string, accountProof: SignedChallengeAccount) =>
    userApi
      .setUserFields({
        fields: [
          {
            accountAddress,
            proof: accountProof,
            field: 'accountAddress'
          }
        ]
      })
      .mapErr(() => ({ reason: 'failedToAddAccountAddress' }))

  const connectAccount = () => {
    waitingOnAccount = true
    rdt.then((rdt) => {
      rdt.walletApi
        .sendOneTimeRequest(OneTimeDataRequestBuilder.accounts().exactly(1).withProof())
        .mapErr(() => ({ reason: 'failedToGetAccountFromWallet' }))
        .andThen(({ accounts, proofs }) => {
          waitingOnAccount = false

          const accountProof = proofs.find((proof) => proof.type === 'account')!
          const accountAddress = accounts[0].address

          return checkAccountStatus(accountAddress).andThen(() =>
            setUserAccountAddress(accountAddress, accountProof as SignedChallengeAccount).andThen(
              () => {
                $user!.accountAddress = accounts[0].address
                quest.actions.next()
                return handleXrdDepositPossibility(accountAddress)
              }
            )
          )
        })
        .mapErr((err) => {
          if (err.reason === 'UserHasHeroBadge' || err.reason === 'failedToAddAccountAddress') {
            errorPopupStore.set({ id: ErrorPopupId.AccountAlreadyRegistered })
          }
          waitingOnAccount = false
        })
    })
  }

  onMount(() => {
    skipMobileWalletInstall.set(!isMobile())
    markNotificationAsSeen('loggedIn')

    if (isMobile()) {
      // @ts-ignore
      useCookies('requirement-SetupWallet-ConnectWallet').set(true)
      // @ts-ignore
      useCookies('requirement-SetupWallet-DownloadWallet').set(true)
      $walletIsLinked = true
      return
    }

    const callback = ({ detail }: any) => {
      if (detail.eventType !== 'extensionStatus') return
      const { isWalletLinked } = detail

      if (isWalletLinked) {
        // @ts-ignore
        useCookies('requirement-SetupWallet-ConnectWallet').set(true)
        // @ts-ignore
        useCookies('requirement-SetupWallet-DownloadWallet').set(true)
        $walletIsLinked = true
      }
    }

    window.addEventListener('radix#chromeExtension#receive', callback)

    return () => {
      window.removeEventListener('radix#chromeExtension#receive', callback)
    }
  })

  const on9bRender = () => {
    window.dispatchEvent(
      new CustomEvent('radix#chromeExtension#send', {
        detail: {
          interactionId: 'id',
          discriminator: 'extensionStatus'
        }
      })
    )
  }

  const loggedIn = derived(user, ($user) => !!$user)

  let quest: Quest

  const submitEmailOrProceed = async () => {
    if (!email.length && !marketingUpdatesCheckbox) {
      quest.actions.next()
      return
    }

    userApi
      .setUserFields({ fields: [{ field: 'email', email, newsletter: marketingUpdatesCheckbox }] })
      .map(() => {
        if ($user) {
          $user.email = { email, newsletter: marketingUpdatesCheckbox }
        }

        quest.actions.next()
      })
      .mapErr(() => {
        quest.actions.next()
      })
  }

  $: {
    if ($user && !data.requirements.ConnectWallet?.isComplete) {
      questApi.completeRequirement('SetupWallet', 'ConnectWallet')
      questApi.completeRequirement('SetupWallet', 'DownloadWallet')
    }
  }
</script>

<Quest
  bind:this={quest}
  let:next
  on:render={(e) => {
    if (e.detail === '9b') {
      on9bRender()
    }
  }}
  {...data.questProps}
  steps={[
    {
      id: '0',
      type: 'regular'
    },
    {
      id: '1',
      type: 'jetty'
    },
    {
      id: '2',
      type: 'jetty'
    },
    {
      id: '3',
      type: 'regular'
    },
    {
      id: '4',
      type: 'jetty'
    },
    {
      id: '5',
      type: 'regular'
    },
    {
      id: '6',
      type: 'regular'
    },
    {
      id: '7',
      type: 'regular'
    },
    {
      id: '8',
      type: 'jetty'
    },
    {
      id: '9a',
      type: 'regular',
      skip: skipMobileWalletInstall,
      footer: {
        next: {
          enabled: confirmedWalletInstall
        }
      }
    },
    {
      id: '9b',
      type: 'regular',
      skip: walletIsLinked,
      footer: {
        next: {
          enabled: walletIsLinked
        }
      }
    },
    {
      id: '10',
      type: 'jetty'
    },
    {
      id: '11',
      type: 'regular'
    },
    {
      id: '12',
      type: 'regular'
    },
    {
      id: '13',
      type: 'jetty'
    },
    {
      id: '14',
      type: 'regular',
      footer: {
        next: {
          enabled: loggedIn
        }
      },
      skip: loggedIn
    },
    {
      id: '15',
      type: 'jetty'
    },
    {
      id: '16',
      type: 'jetty'
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
      type: 'regular',
      skip: writable($user?.email?.newsletter || false),
      footer: {
        next: {
          onClick: () => {
            submitEmailOrProceed()
          }
        }
      }
    },
    {
      id: '21',
      type: 'regular',
      footer: {
        next: {
          enabled: registeredAccountAddress
        }
      },
      skip: registeredAccountAddress
    },
    {
      id: '25',
      type: 'regular',
      skip: depositHeroBadge,
      footer: {
        next: {
          enabled: depositHeroBadge
        }
      }
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
  {/if}

  {#if render('8')}
    {@html text['8.md']}
  {/if}

  {#if render('9a')}
    {@html text['9a-1.md']}

    <AppsFlyer />

    {@html text['9a-2.md']}
    <Checkbox bind:checked={$confirmedWalletInstall}>{@html text['9a-2-checkbox.md']}</Checkbox>
  {/if}

  {#if render('9b')}
    {@html text['9b-1.md']}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="center"
      on:click={() => {
        // @ts-ignore
        dataLayer.push({ event: 'dl_click_2_wallet_download' })
      }}
    >
      <!-- svelte-ignore missing-declaration -->
      <Button link="https://wallet.radixdlt.com" isExternal={true}>
        {$i18n.t('quests:SetupWallet.walletDownloadPage')}
      </Button>
    </div>
    {@html text['9b-2.md']}
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
    {@html text['14.md']}
  {/if}

  {#if render('15')}
    {@html text['15.md']}
  {/if}

  {#if render('16')}
    {@html text['16.md']}
  {/if}

  {#if render('17')}
    {@html text['17.md']}
    <SetUsername />
  {/if}

  {#if render('18')}
    {@html htmlReplace(text['18.md'], { name: $user?.name || '' })}
  {/if}

  {#if render('19')}
    {@html text['19-1.md']}
    <SetEmailPage
      bind:sendNewsletter={marketingUpdatesCheckbox}
      bind:email
      bind:hasError
      privacyPolicyText={text['19-2.md']}
      marketingUpdatesText={text['19-3.md']}
    />
  {/if}

  {#if render('21')}
    {@html text['21.md']}

    <div class="center">
      <Button on:click={connectAccount} loading={waitingOnAccount}
        >{$i18n.t('quests:GetStuff.registerAccount')}
      </Button>
    </div>
  {/if}

  {#if render('25')}
    {@html text['25.md']}

    <DepositHeroBadge
      on:deposited={() => {
        $depositHeroBadge = true
        next()
      }}
      questId={data.id}
      bind:state={mintBadgeState}
    />
  {/if}
</Quest>

<style lang="scss">
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
