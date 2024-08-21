<script lang="ts">
  import Quest from '../Quest.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { okAsync } from 'neverthrow'
  import { onMount, onDestroy } from 'svelte'
  import DepositHeroBadge from './DepositHeroBadge.svelte'
  import type { PageData } from './$types'
  import { writable, derived } from 'svelte/store'
  import type { Quests } from 'content'
  import { type ComponentProps } from 'svelte'
  import { gatewayApi, publicConfig } from '$lib/public-config'
  import { OneTimeDataRequestBuilder, SignedChallengeAccount } from '@radixdlt/radix-dapp-toolkit'
  import { rdt } from '$lib/rdt'
  import { userApi } from '$lib/api/user-api'
  import { user, ErrorPopupId, errorPopupStore } from '../../../../../stores'
  import Button from '$lib/components/button/Button.svelte'
  import { err, ok, ResultAsync } from 'neverthrow'
  import { messageApi } from '$lib/api/message-api'
  import { webSocketClient, type WebSocketClient } from '$lib/websocket-client'
  import { waitingWarning } from '$lib/utils/waiting-warning'

  export let data: PageData

  const text = data.text as Quests['GetStuff']['text']

  let quest: Quest
  let waitingOnAccount = false
  let xrdDepositLoading = false
  let chosenAccountHasXrd = false

  let mintBadgeState: ComponentProps<DepositHeroBadge>['state']
  let unsubscribeWebSocket: ReturnType<WebSocketClient['onMessage']> | undefined

  const skipXrdDepositPage = writable<boolean>(false)
  const registeredAccountAddress = derived(user, ($user) => !!$user?.accountAddress)
  const depositHeroBadge = writable(data.requirements.DepositHeroBadge.isComplete)

  $: if ($webSocketClient) {
    unsubscribeWebSocket = $webSocketClient.onMessage(async (message) => {
      if (message.type === 'XrdDepositedToAccount') {
        xrdDepositLoading = false
        messageApi.markAsSeen(message.id)
        skipXrdDepositPage.set(true)
      }
    })
  }

  const directDepositXrd = () => {
    xrdDepositLoading = true
    userApi.directDepositXrd().mapErr(() => {
      xrdDepositLoading = false
    })
  }

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
      .map((disabled) => {
        if (disabled) {
          skipXrdDepositPage.set(true)
        }
      })

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

          return checkAccountStatus(accountAddress).andThen((hasXrd) =>
            setUserAccountAddress(accountAddress, accountProof as SignedChallengeAccount).andThen(
              () =>
                userApi
                  .allowAccountAddressToMintHeroBadge()
                  .map(() => {
                    $user!.accountAddress = accounts[0].address
                    quest.actions.next()
                    chosenAccountHasXrd = hasXrd
                  })
                  .andThen(() => handleXrdDepositPossibility(accountAddress))
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
    userApi.hasReceivedXrd().andThen((received) => {
      if (received) {
        skipXrdDepositPage.set(true)
        return okAsync(undefined)
      }

      if ($user?.accountAddress) {
        return ResultAsync.combine([
          gatewayApi
            .isDepositDisabledForResource($user.accountAddress, publicConfig.xrd)
            .map((disabled) => {
              if (disabled) {
                skipXrdDepositPage.set(true)
              }
            }),
          gatewayApi.hasHeroBadgeAndXrd($user!.accountAddress).map(({ hasXrd }) => {
            chosenAccountHasXrd = hasXrd
          })
        ])
      }

      return okAsync(undefined)
    })
  })

  onDestroy(() => {
    unsubscribeWebSocket?.()
    waitingWarning(false)
  })

  $: waitingWarning(xrdDepositLoading)
</script>

<Quest
  on:render={(ev) => {
    if (ev.detail === '15') {
      xrdDepositLoading = true
      if (!$skipXrdDepositPage) {
        userApi
          .hasReceivedXrd()
          .map((received) => {
            xrdDepositLoading = false
            skipXrdDepositPage.set(received)
          })
          .mapErr(() => {
            xrdDepositLoading = false
          })
      }
    }
  }}
  {...data.questProps}
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
      type: 'regular'
    },
    {
      id: '15',
      type: 'jetty',
      skip: skipXrdDepositPage,
      footer: {
        next: {
          enabled: writable(false)
        }
      }
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
      type: 'jetty'
    },
    {
      id: '22',
      type: 'regular'
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

    <div class="center">
      <Button on:click={connectAccount} loading={waitingOnAccount}
        >{$i18n.t('quests:GetStuff.registerAccount')}
      </Button>
    </div>
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
    {@html text['14.md']}
  {/if}

  {#if render('15')}
    {#if chosenAccountHasXrd}
      {@html text['15b.md']}
    {:else}
      {@html text['15a.md']}
    {/if}

    <div class="center">
      <Button on:click={directDepositXrd} loading={xrdDepositLoading} disabled={xrdDepositLoading}>
        {$i18n.t('quests:GetStuff.getXrd')}
      </Button>
    </div>
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

<style lang="scss">
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
