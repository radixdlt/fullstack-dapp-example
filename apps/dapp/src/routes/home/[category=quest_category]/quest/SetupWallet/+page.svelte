<script lang="ts">
  import { onMount, type ComponentProps } from 'svelte'
  import Quest from '../Quest.svelte'
  import type { PageData } from './$types'
  import { useCookies, type RequirementCookieKey } from '$lib/utils/cookies'
  import { derived, writable } from 'svelte/store'
  import type { Quests } from 'content'
  import { user, ErrorPopupId, errorPopupStore } from '../../../../../stores'
  import { questApi } from '$lib/api/quest-api'
  import Button from '$lib/components/button/Button.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import SetUsername from './SetUsername.svelte'
  import { userApi } from '$lib/api/user-api'
  import { htmlReplace } from '$lib/helpers/html-replace'
  import { markNotificationAsSeen } from '$lib/notifications'
  import { isMobile } from '@radixdlt/radix-dapp-toolkit'
  import DepositHeroBadge from './DepositHeroBadge.svelte'
  import { rdt } from '$lib/rdt'
  import { OneTimeDataRequestBuilder, SignedChallengeAccount } from '@radixdlt/radix-dapp-toolkit'
  import { gatewayApi, publicConfig } from '$lib/public-config'
  import { err, ok } from 'neverthrow'

  export let data: PageData

  const text = data.text as Quests['SetupWallet']['text']
  const connectWalletRequirementKey =
    'requirement-SetupWallet-ConnectWallet' as RequirementCookieKey
  const downloadWalletRequirementKey =
    'requirement-SetupWallet-DownloadWallet' as RequirementCookieKey

  const walletIsLinked = writable(data.requirements.ConnectWallet?.isComplete)
  const isHeroBadgeDeposited = writable(data.requirements.DepositHeroBadge?.isComplete)
  const canDepositHeroBadge = writable<boolean>(false)
  let thirdPartyPolling: undefined | ReturnType<typeof setInterval>
  let waitingOnAccount = false

  const skipMobileWalletInstall = writable<boolean>(false)
  const registeredAccountAddress = derived(user, ($user) => !!$user?.accountAddress)

  let mintBadgeState: ComponentProps<DepositHeroBadge>['state']

  const completeWalletRequirements = () => {
    useCookies(connectWalletRequirementKey).set(true)
    useCookies(downloadWalletRequirementKey).set(true)
    walletIsLinked.set(true)
  }

  const checkAccountStatus = (accountAddress: string) =>
    gatewayApi
      .hasHeroBadgeAndXrd(accountAddress)
      .mapErr(() => ({ reason: 'failedToCheckAccountStatus' }))
      .andThen(({ hasHeroBadge, hasXrd }) =>
        hasHeroBadge ? err({ reason: 'UserHasHeroBadge' }) : ok(hasXrd)
      )

  const handleHeroBadgeDepositPossibility = (accountAddress: string) =>
    gatewayApi
      .isDepositAllowedForResource(accountAddress, publicConfig.badges.heroBadgeAddress)
      .map((isAllowed) => {
        canDepositHeroBadge.set(isAllowed)
      })

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
                return handleHeroBadgeDepositPossibility(accountAddress)
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

  const start3rdPartyPolling = () => {
    clearInterval(thirdPartyPolling)
    if ($user?.accountAddress) {
      handleHeroBadgeDepositPossibility($user.accountAddress)
    }
    thirdPartyPolling = setInterval(() => {
      if ($user?.accountAddress) {
        handleHeroBadgeDepositPossibility($user.accountAddress)
      }
    }, 6000)
  }

  const stop3rdPartyPolling = () => {
    clearInterval(thirdPartyPolling)
  }

  onMount(() => {
    skipMobileWalletInstall.set(!isMobile())
    markNotificationAsSeen('loggedIn')

    if (isMobile()) {
      completeWalletRequirements()
      return
    }

    if ($user?.accountAddress) {
      handleHeroBadgeDepositPossibility($user.accountAddress)
    }

    const callback = ({ detail }: any) => {
      if (detail.eventType !== 'extensionStatus') return
      const { isWalletLinked } = detail

      if (isWalletLinked) {
        completeWalletRequirements()
      }
    }

    window.addEventListener('radix#chromeExtension#receive', callback)

    return () => {
      clearInterval(thirdPartyPolling)
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

    if (e.detail === '24' && $user?.accountAddress) {
      start3rdPartyPolling()
    }

    if (e.detail !== '24') {
      stop3rdPartyPolling()
    }
  }}
  {...data.questProps}
  steps={[
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
      id: '24',
      type: 'regular',
      skip: canDepositHeroBadge,
      footer: {
        next: {
          enabled: canDepositHeroBadge
        }
      }
    },
    {
      id: '25',
      type: 'regular',
      skip: isHeroBadgeDeposited,
      footer: {
        next: {
          enabled: isHeroBadgeDeposited
        }
      }
    },
    {
      type: 'complete'
    }
  ]}
  let:render
>
  {#if render('9b')}
    {@html text['9b-1.md']}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="center">
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

  {#if render('20')}
    {@html text['20.md']}
  {/if}

  {#if render('21')}
    {@html text['21.md']}

    <div class="center">
      <Button on:click={connectAccount} loading={waitingOnAccount}
        >{$i18n.t('quests:GetStuff.registerAccount')}
      </Button>
    </div>
  {/if}

  {#if render('23')}
    {@html text['23.md']}
  {/if}

  {#if render('24')}
    {@html text['24.md']}
  {/if}

  {#if render('25')}
    {@html text['25.md']}

    <DepositHeroBadge
      on:deposited={() => {
        isHeroBadgeDeposited.set(true)
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
