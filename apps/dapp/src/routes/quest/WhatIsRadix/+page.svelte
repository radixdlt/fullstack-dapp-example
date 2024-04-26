<script lang="ts">
  import ClaimRewards from '$lib/components/claim-rewards/ClaimRewards.svelte'
  import Quest from '../Quest.svelte'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<Quest
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
      dialogs: 1
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

  <svelte:fragment slot="jetty" let:render let:next>
    {#if render('unclaimable-requirements')}
      <ClaimRewards on:click={next} rewards={data.rewards}>
        {@html data.text['requirements.md']}
      </ClaimRewards>
    {/if}
  </svelte:fragment>
</Quest>
