<script lang="ts">
  import Quest from '../Quest.svelte'
  import type { PageData } from './$types'
  import type { Quests } from 'content'
  import PartyTabs from './PartyTabs.svelte'

  export let data: PageData

  const text = data.text as Quests['ReferralQuest']['text']

  let quest: Quest
</script>

<Quest
  bind:this={quest}
  id={data.id}
  requirements={data.requirements}
  steps={[
    {
      id: '0',
      type: 'regular'
    },
    {
      id: '1',
      type: 'regular'
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
    <PartyTabs />
  {/if}

  {#if render('1')}
    {@html text['1.md']}
  {/if}
</Quest>
