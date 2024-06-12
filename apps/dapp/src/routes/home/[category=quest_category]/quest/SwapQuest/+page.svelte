<script lang="ts">
  import type { Quests } from 'content'
  import Quest from '../Quest.svelte'
  import { writable } from 'svelte/store'
  import { onDestroy } from 'svelte'
  import { webSocketClient } from '../../../../../stores'
  import { messageApi } from '$lib/api/message-api'
  import Button from '$lib/components/button/Button.svelte'
  import { publicConfig } from '$lib/public-config'
  import { i18n } from '$lib/i18n/i18n'
  import { Addresses } from 'common'
  import { questApi } from '$lib/api/quest-api'
  import type { PageData } from './$types'

  export let data: PageData

  const text = data.text as Quests['WhatIsRadix']['text']

  let quest: Quest
  const addresses = Addresses(publicConfig.networkId)
  const jettySwap = writable(data.requirements?.JettySwap)
  const lettySwap = writable(data.requirements?.LettySwap)
  $: if ($webSocketClient) {
    const unsubscribeWebSocket = $webSocketClient.onMessage((message) => {
      if (message.type === 'QuestRequirementCompleted' && message.requirementId === 'JettySwap') {
        $jettySwap = true
        messageApi.markAsSeen(message.id)
      }

      if (message.type === 'QuestRequirementCompleted' && message.requirementId === 'LettySwap') {
        $lettySwap = true
        messageApi.markAsSeen(message.id)
      }
    })

    onDestroy(() => {
      unsubscribeWebSocket()
    })
  }

  const swappingLearnt = () => {
    questApi.completeContentRequirement(data.id)
  }
</script>

<Quest
  bind:this={quest}
  id={data.id}
  requirements={data.requirements}
  steps={[
    {
      id: 'text1',
      type: 'regular',
      skip: jettySwap
    },
    {
      id: 'text2',
      type: 'regular',
      skip: jettySwap,
      footer: {
        next: {
          onClick: () => {
            swappingLearnt()
            quest.actions.next()
          }
        }
      }
    },
    {
      id: 'text3',
      type: 'regular',
      skip: jettySwap,
      footer: {
        next: {
          enabled: jettySwap
        }
      }
    },
    {
      id: 'text4',
      type: 'regular',
      skip: lettySwap
    },
    {
      id: 'text5',
      type: 'regular',
      skip: lettySwap,
      footer: {
        next: {
          enabled: lettySwap
        }
      }
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
  {#if render('text1')}
    {@html text['0.md']}
  {/if}

  {#if render('text2')}
    {@html text['1.md']}
  {/if}

  {#if render('text3')}
    {@html text['2.md']}

    <div class="go-to-swap">
      <Button on:click={() => window.open(addresses.dapps.jettySwap.url, '_blank')}>
        {$i18n.t('quests:SwapQuest.goToJettySwap')}
      </Button>
    </div>
  {/if}

  {#if render('text4')}
    {@html text['3.md']}
  {/if}

  {#if render('text5')}
    {@html text['4.md']}

    <div class="go-to-swap">
      <Button on:click={() => window.open(addresses.dapps.lettySwap.url, '_blank')}>
        {$i18n.t('quests:SwapQuest.goToLettySwap')}
      </Button>
    </div>
  {/if}
</Quest>

<style lang="scss">
  .go-to-swap {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 3.5rem;
  }
</style>
