<script lang="ts">
  import { htmlReplace } from '$lib/helpers/html-replace'
  import { user } from '../../../../../stores'
  import Quest from '../Quest.svelte'
  import type { PageData } from './$types'
  import type { Quests } from 'content'

  export let data: PageData

  const text = data.text as Quests['JoinFriend']['text']

  let quest: Quest
</script>

<Quest
  bind:this={quest}
  id={data.id}
  requirements={data.requirements}
  steps={[
    {
      id: '0',
      type: 'jetty'
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
    {@html htmlReplace(text['0.md'], { inviter_name: $user?.referredByUser?.name })}
  {/if}
</Quest>
