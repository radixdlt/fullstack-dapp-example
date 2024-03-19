<script lang="ts">
  import { goto } from '$app/navigation'
  import Quest from '$lib/components/quest/Quest.svelte'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<Quest
  on:close={() => goto('/')}
  on:complete={() => goto('/')}
  {...data.questProps}
  steps={[
    {
      id: 'text1',
      type: 'regular',
      footer: {
        type: 'navigation'
      }
    },
    {
      id: 'text2',
      type: 'regular',
      footer: {
        type: 'navigation'
      }
    },
    {
      id: 'text3',
      type: 'regular',
      footer: {
        type: 'navigation'
      }
    },
    {
      id: 'text4',
      type: 'regular',
      footer: {
        type: 'navigation'
      }
    },
    {
      id: 'text5',
      type: 'regular',
      footer: {
        type: 'navigation'
      }
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
</Quest>
