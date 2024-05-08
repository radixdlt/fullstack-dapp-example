<script lang="ts">
  import Quest from '../Quest.svelte'
  import type { PageData } from '../StakingQuest/$types'
  import { i18n } from '$lib/i18n/i18n'
  import Button from '$lib/components/button/Button.svelte'
  import { onMount } from 'svelte'
  import { webSocketClient } from '../../../stores'
  import { writable } from 'svelte/store'

  export let data: PageData
  let quest: Quest

  let stakedXrd = writable(data.requirements?.StakedXrd)
  onMount(() => {
    const unsubscribeWebSocket = $webSocketClient?.onMessage((message) => {
      if (message.type === 'QuestRequirementCompleted' && message.requirementId === 'StakedXrd') {
        quest.actions.next()
        $stakedXrd = true
      }
    })

    return () => {
      unsubscribeWebSocket?.()
    }
  })
</script>

<Quest
  {...data}
  steps={[
    {
      id: 'text1',
      type: 'regular'
    },
    {
      id: 'text2',
      type: 'regular'
    },
    {
      id: 'text3',
      type: 'regular'
    },
    {
      id: 'text4',
      type: 'regular',
      skip: stakedXrd,
      footer: {
        next: {
          enabled: stakedXrd
        }
      }
    },
    {
      id: 'text5',
      type: 'regular'
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
    {@html data.text['0.md']}
  {/if}

  {#if render('text2')}
    {@html data.text['1.md']}
  {/if}

  {#if render('text3')}
    {@html data.text['2.md']}

    <Button on:click={() => window.open('https://stokenet-dashboard.radixdlt.com/', '_blank')}>
      {$i18n.t('quests:StakingQuest.goToRadixDashboard')}
    </Button>
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
</Quest>
