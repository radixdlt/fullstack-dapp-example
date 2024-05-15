<script lang="ts">
  import Quest from '../Quest.svelte'
  import type { PageData } from './$types'

  export let data: PageData

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
    {@html data.text['0.md']}
  {/if}

  {#if render('text2')}
    {@html data.text['1.md']}
  {/if}
</Quest>
