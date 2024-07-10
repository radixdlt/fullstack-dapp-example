<script lang="ts">
  import { onMount } from 'svelte'
  import Quest from '../Quest.svelte'
  import type { PageData } from './$types'
  import { isMobile } from '$lib/utils/is-mobile'
  import { useCookies } from '$lib/utils/cookies'
  import { derived, writable } from 'svelte/store'
  import type { Quests } from 'content'
  import { user } from '../../../../../stores'
  import SetEmailPage from './SetEmailPage.svelte'
  import { questApi } from '$lib/api/quest-api'
  import Button from '$lib/components/button/Button.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import SetUsername from './SetUsername.svelte'
  import { userApi } from '$lib/api/user-api'
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte'

  export let data: PageData

  const text = data.text as Quests['SetupWallet']['text']

  let render = (_: string) => false
  let marketingUpdatesCheckbox: boolean
  let email = $user?.email?.email || ''
  let hasError: boolean
  let confirmedWalletInstall = writable<boolean>(false)
  let isMailEnabled = writable<boolean>(true)
  let walletIsLinked = writable(data.requirements.GetTheWallet?.isComplete)

  $: {
    isMailEnabled.set(!hasError)
  }
  onMount(() => {
    if (isMobile()) {
      // @ts-ignore
      useCookies('requirement-SetupWallet-GetTheWallet').set(true)
      $walletIsLinked = true
      quest.actions.next()
      return
    }

    const callback = ({ detail }: any) => {
      if (detail.eventType !== 'extensionStatus' || !render('9b')) return
      const { isWalletLinked } = detail

      if (isWalletLinked) {
        // @ts-ignore
        useCookies('requirement-SetupWallet-GetTheWallet').set(true)
        $walletIsLinked = true
        quest.actions.next()
      }
    }

    window.addEventListener('radix#chromeExtension#receive', callback)

    const interval = setInterval(() => {
      if (render('9b')) {
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
        hasError = true
      })
  }

  $: {
    if ($user && !data.requirements.ConnectWallet?.isComplete) {
      questApi.completeRequirement('SetupWallet', 'ConnectWallet')
    }
  }
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
      skip: writable(!isMobile()),
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
          enabled: isMailEnabled,
          onClick: () => {
            submitEmailOrProceed()
          }
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
    {@html text['9a-2.md']}
    <Checkbox bind:checked={$confirmedWalletInstall}>{@html text['9a-2-checkbox.md']}</Checkbox>
  {/if}

  {#if render('9b')}
    {@html text['9b.md']}
    <div class="center">
      <Button link="https://wallet.radixdlt.com" isExternal={true}
        >{$i18n.t('quests:SetupWallet.walletDownloadPage')}</Button
      >
    </div>
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
    <SetUsername onNext={quest.actions.next} />
  {/if}

  {#if render('18')}
    {@html text['18.md']}
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
</Quest>

<style lang="scss">
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
