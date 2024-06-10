<script lang="ts">
  import type { Quests } from 'content'
  import Quest from '../Quest.svelte'
  import type { PageData } from './$types'

  export let data: PageData

  const text = data.text as Quests['WhatIsRadix']['text']

  let quest: Quest
</script>

<Quest
  bind:this={quest}
  id={data.id}
  requirements={data.requirements}
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
</Quest>
