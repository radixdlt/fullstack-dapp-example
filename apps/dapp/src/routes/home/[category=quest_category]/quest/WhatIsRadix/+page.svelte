<script lang="ts">
  import Quest from '../Quest.svelte'
  import type { PageData } from './$types'
  import type { Quests } from 'content'

  export let data: PageData

  const text = data.text as Quests['WhatIsRadix']['text']
</script>

<Quest
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
      id: '2',
      type: 'regular'
    },
    {
      id: '3',
      type: 'regular'
    },
    {
      id: '4',
      type: 'regular'
    },
    {
      id: '5',
      type: 'jetty'
    },
    {
      id: '6',
      type: 'regular'
    },
    {
      id: '7',
      type: 'regular'
    },
    {
      id: '8',
      type: 'regular'
    },
    {
      id: '9',
      type: 'jetty'
    },
    {
      id: '10',
      type: 'jettyQuiz',
      text: text['10.md'],
      quizRequirement: 'RadixQuiz',
      answers: [
        {
          text: text['10a.md'],
          correct: false
        },
        {
          text: text['10b.md'],
          correct: false
        },
        {
          text: text['10c.md'],
          correct: true
        }
      ]
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

  {#if render('1')}
    {@html text['1.md']}
  {/if}

  {#if render('2')}
    {@html text['2.md']}
  {/if}

  {#if render('3')}
    {@html text['3.md']}
  {/if}

  {#if render('4')}
    {@html text['4.md']}
  {/if}

  {#if render('5')}
    {@html text['5.md']}
  {/if}

  {#if render('6')}
    {@html text['6.md']}
  {/if}

  {#if render('7')}
    {@html text['7.md']}
  {/if}

  {#if render('8')}
    {@html text['8.md']}
  {/if}

  {#if render('9')}
    {@html text['9.md']}
  {/if}
</Quest>
