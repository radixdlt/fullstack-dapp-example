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

  let walletIsLinked = writable(data.requirements.GetTheWallet)

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
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['0.md']
      }
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
      type: 'regular'
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
      type: 'requirements'
    },
    {
      id: 'unclaimable-requirements',
      type: 'jetty',
      component: ClaimRewards,
      props: {
        rewards: data.rewards,
        text: text['claim.md'],
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
  {#if render('get-the-wallet')}
    {@html text['2.md']}
  {/if}

  {#if render('3')}
    {@html text['3.md']}
  {/if}

  {#if render('4')}
    {@html text['4.md']}
  {/if}
</Quest>
