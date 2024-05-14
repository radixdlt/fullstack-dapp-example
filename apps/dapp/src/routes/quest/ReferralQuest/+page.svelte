<script lang="ts">
  import Quest from '../Quest.svelte'
  import type { PageData } from '../StakingQuest/$types'
  import PartyRewardsList from './PartyRewardsList.svelte'

  export let data: PageData
  let quest: Quest
</script>

<Quest
  {...data}
  bind:this={quest}
  steps={[
    // {
    //   type: 'claimRewards'
    // },
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
      type: 'regular'
    },
    {
      id: 'text5',
      type: 'regular'
    },

    {
      type: 'complete'
    }
  ]}
  let:render
>
  {#if render('text1')}
    <PartyRewardsList />
  {/if}

  {#if render('text2')}
    {@html data.text['1.md']}
  {/if}

  {#if render('text3')}
    {@html data.text['2.md']}
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
