<script lang="ts">
  import Quest from '../Quest.svelte'
  import type { PageData } from './$types'
  import { user } from '../../../stores'
  import ClaimRewards from '$lib/components/claim-rewards/ClaimRewards.svelte'
  import { derived, writable } from 'svelte/store'
  import { i18n } from '$lib/i18n/i18n'
  import TextJettyPage from '../TextJettyPage.svelte'
  import SetUsernamePage from './SetUsernamePage.svelte'
  import SetEmailPage from './SetEmailPage.svelte'
  import { OneTimeDataRequestBuilder, SignedChallengeAccount } from '@radixdlt/radix-dapp-toolkit'
  import { rdt } from '$lib/rdt'
  import { userApi } from '$lib/api/user-api'
  import Button from '$lib/components/button/Button.svelte'
  import type { Quests } from 'content'

  export let data: PageData

  const text = data.text as Quests['LoginWithWallet']['text']

  const connectAccountReq = writable(data.requirements.ConnectAccount)
  let waitingOnAccount = false

  const loggedIn = derived(user, ($user) => !!$user)

  let quest: Quest

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

          const result = await userApi.setUserField({
            accountAddress: accounts[0].address,
            proof: accountProof,
            field: 'accountAddress'
          })

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
</script>

<Quest
  bind:this={quest}
  id={data.id}
  requirements={data.requirements}
  steps={[
    {
      id: '0a',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['0a.md']
      }
    },
    {
      id: '0b',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['0b.md']
      }
    },
    {
      id: '1',
      type: 'regular'
    },
    {
      id: '3',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['3.md']
      }
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
      id: '5',
      type: 'regular'
    },
    {
      id: '6',
      type: 'regular',
      footer: {
        next: {
          enabled: loggedIn
        }
      },
      skip: loggedIn
    },
    {
      id: '7',
      type: 'regular'
    },
    {
      id: '8',
      type: 'jetty',
      component: SetUsernamePage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['8connected.md']
      }
    },
    {
      id: '9',
      type: 'jetty',
      component: SetEmailPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['9.md']
      }
    },
    {
      id: '10',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['10.md']
      }
    },
    {
      id: '11',
      type: 'regular',
      skip: connectAccountReq,
      footer: {
        next: {
          enabled: connectAccountReq
        }
      }
    },
    {
      id: '13',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['13.md']
      }
    },
    {
      type: 'requirements'
    },
    {
      id: 'unclaimable-requirements',
      type: 'jetty',
      component: ClaimRewards,
      props: {
        rewards: data.rewards,
        text: text['claim.md'],
        nextButtonText: $i18n.t('quests:claimButton'),
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next()
      }
    },
    {
      type: 'complete'
    }
  ]}
  let:render
>
  {#if render('1')}
    {@html text['1.md']}
  {/if}

  {#if render('5')}
    {@html text['5a.md']}

    <img src={'/connect-button.png'} style:width="150px" alt="The Radix connect button" />

    {@html text['5b.md']}
  {/if}

  {#if render('6')}
    {@html text['6.md']}
  {/if}

  {#if render('7')}
    {@html text['7.md']}
  {/if}

  {#if render('11')}
    {@html text['11.md']}

    <Button on:click={connectAccount} loading={waitingOnAccount}
      >{$i18n.t('quests:LoginWithWallet.connectAccount')}
    </Button>
  {/if}
</Quest>
