<script lang="ts">
  import Quest from '../Quest.svelte'
  import type { PageData } from './$types'
  import { user } from '../../../stores'
  import ClaimRewards from '$lib/components/claim-rewards/ClaimRewards.svelte'
  import Input from '$lib/components/input/Input.svelte'
  import { derived } from 'svelte/store'
  import { i18n } from '$lib/i18n/i18n'
  import { userApi } from '$lib/api/user-api'

  export let data: PageData

  let nameInput = $user?.label ?? ''

  const loggedIn = derived(user, ($user) => !!$user)

  let quest: Quest

  const setUserName = () => {
    userApi.setUserField({ name: nameInput, field: 'name' }).
  }
</script>

<Quest
  bind:this={quest}
  id={data.id}
  requirements={data.requirements}
  steps={[
    {
      id: 'explain-wallet',
      type: 'regular'
    },
    {
      id: 'connect-wallet',
      type: 'regular',
      footer: {
        next: {
          enabled: loggedIn
        }
      },
      skip: loggedIn
    },
    {
      id: 'wallet-connected',
      type: 'regular',
      footer: {
        next: {
          onClick: () => {
            setUserName()
            quest.actions.next()
          }
        }
      }
    },
    {
      id: 'text4',
      type: 'regular'
    },
    {
      id: 'text5',
      type: 'regular'
    },
    {
      id: 'text6',
      type: 'regular'
    },
    {
      id: 'text7',
      type: 'regular'
    },
    {
      id: 'text8',
      type: 'regular'
    },
    {
      id: 'text9',
      type: 'regular'
    },
    {
      id: 'text10',
      type: 'regular'
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
        text: data.text['requirements.md'],
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
  {#if render('explain-wallet')}
    {@html data.text['0.md']}
  {/if}

  {#if render('connect-wallet')}
    {@html data.text['1.md']}
  {/if}

  {#if render('wallet-connected')}
    {@html data.text['connected.md']}

    <Input bind:value={nameInput} />
  {/if}

  {#if render('text4')}
    {@html data.text['3.md']}
  {/if}

  {#if render('text5')}
    {@html data.text['4.md']}
  {/if}

  {#if render('text6')}
    {@html data.text['5.md']}
  {/if}

  {#if render('text7')}
    {@html data.text['6.md']}
  {/if}

  {#if render('text8')}
    {@html data.text['7.md']}
  {/if}

  {#if render('text9')}
    {@html data.text['8.md']}
  {/if}

  {#if render('text10')}
    {@html data.text['9.md']}
  {/if}
</Quest>
