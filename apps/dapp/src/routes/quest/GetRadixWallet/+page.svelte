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

  export let data: PageData

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
        text: data.text['0.md']
      }
    },
    {
      id: '1',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: data.text['1.md']
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
        text: data.text['5.md']
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
        text: data.text['claim.md'],
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
  {#if render('get-the-wallet')}
    {@html data.text['2.md']}
  {/if}

  {#if render('3')}
    {@html data.text['3.md']}
  {/if}

  {#if render('4')}
    {@html data.text['4.md']}
  {/if}

  {#if render('6')}
    {@html data.text['6.md']}
  {/if}

  {#if render('7')}
    {@html data.text['7.md']}
  {/if}

  {#if render('8')}
    {@html data.text['8.md']}
  {/if}

  {#if render('9')}
    {@html data.text['9.md']}
  {/if}

  {#if render('10')}
    {@html data.text['10.md']}
  {/if}
</Quest>
