<script lang="ts">
  import Quest from '../Quest.svelte'
  import type { PageData } from '../StakingQuest/$types'
  import { i18n } from '$lib/i18n/i18n'
  import Button from '$lib/components/button/Button.svelte'
  import { ExternalLinks } from 'common'

  export let data: PageData
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

    <Button on:click={() => window.open(ExternalLinks.radixDashboardStaking, '_blank')}>
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
