<script lang="ts">
  import { onMount } from 'svelte'
  import Quest from '../Quest.svelte'
  import type { PageData } from './$types'
  import ClaimRewards from '$lib/components/claim-rewards/ClaimRewards.svelte'
  import { isMobile } from '$lib/utils/is-mobile'
  import { useCookies } from '$lib/utils/cookies'
  import { writable } from 'svelte/store'
  import { i18n } from '$lib/i18n/i18n'
  import TextJettyPage from '../TextJettyPage.svelte'
  import type { Quests } from 'content'

  export let data: PageData

  const text = data.text as Quests['GetRadixWallet']['text']

  let render = (_: string) => false

  let walletIsLinked = writable(data.requirements.GetTheWallet.isComplete)
  onMount(() => {
    if (isMobile()) {
      // @ts-ignore
      useCookies('requirement-GetRadixWallet-GetTheWallet').set(true)
      $walletIsLinked = true
      quest.actions.next()
      return
    }

    const callback = ({ detail }: any) => {
      if (detail.eventType !== 'extensionStatus') return
      const { isWalletLinked } = detail

      if (isWalletLinked) {
        // @ts-ignore
        useCookies('requirement-GetRadixWallet-GetTheWallet').set(true)
        $walletIsLinked = true
        quest.actions.next()
      }
    }

    window.addEventListener('radix#chromeExtension#receive', callback)

    const interval = setInterval(() => {
      if (render('get-the-wallet')) {
        window.dispatchEvent(
          new CustomEvent('radix#chromeExtension#send', {
            detail: {
              interactionId: 'id',
              discriminator: 'extensionStatus'
            }
          })
        )
      }
    }, 1000)

    return () => {
      window.removeEventListener('radix#chromeExtension#receive', callback)
      clearInterval(interval)
    }
  })

  let quest: Quest
</script>

<Quest
  bind:this={quest}
  bind:render
  id={data.id}
  requirements={data.requirements}
  steps={[
    {
      id: '0',
      type: 'regular'
    },
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
      id: 'get-the-wallet',
      type: 'regular',
      skip: walletIsLinked,
      footer: {
        next: {
          enabled: walletIsLinked
        }
      }
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
      id: '5',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['5.md']
      }
    },
    {
      id: '6',
      type: 'regular'
    },
    {
      id: '7',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['7.md']
      }
    },
    {
      id: '8',
      type: 'regular'
    },
    {
      id: '9',
      type: 'regular'
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
      type: 'regular'
    },
    {
      id: '12',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['12.md']
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
      id: '14',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['14.md']
      }
    },
    {
      id: '15',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['14.md']
      }
    },
    {
      id: '16',
      type: 'regular'
    },
    {
      id: 'unclaimable-requirements',
      type: 'jetty',
      component: ClaimRewards,
      props: {
        rewards: data.rewards,
        text: '',
        nextButtonText: $i18n.t('quests:continueButton'),
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
  {#if render('0')}
    {@html text['0.md']}
  {/if}

  {#if render('get-the-wallet')}
    {@html text['1.md']}
  {/if}

  {#if render('2')}
    {@html text['2.md']}
  {/if}

  {#if render('3')}
    {@html text['3.md']}
  {/if}

  {#if render('6')}
    {@html text['6.md']}
  {/if}
  {#if render('8')}
    {@html text['8.md']}
  {/if}
  {#if render('9')}
    {@html text['9.md']}
  {/if}
  {#if render('11')}
    {@html text['11.md']}
  {/if}
  {#if render('16')}
    {@html text['16.md']}
  {/if}
</Quest>
