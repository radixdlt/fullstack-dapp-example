<script lang="ts">
  import { onMount } from 'svelte'
  import Quest from '../Quest.svelte'
  import type { PageData } from '../Thorswap/$types'
  import type { Quests } from 'content'
  import { markNotificationAsSeen } from '$lib/notifications'
  export let data: PageData
  const text = data.text as Quests['Thorswap']['text']
  let quest: Quest

  onMount(() => {
    markNotificationAsSeen('thorswapSwapCompleted')
  })
</script>

<Quest
  bind:this={quest}
  id={data.id}
  requirements={data.requirements}
  nextQuestIndex={data.nextQuestIndex}
  steps={[
    {
      id: '0',
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
    {@html text['0.md']}
  {/if}
</Quest>
