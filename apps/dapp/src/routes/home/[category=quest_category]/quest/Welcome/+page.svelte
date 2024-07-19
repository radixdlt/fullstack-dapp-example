<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import type { LayoutData } from '../$types'
  import Quest from '../Quest.svelte'
  import Error from '$lib/components/error/Error.svelte'

  import type { Quests } from 'content'

  export let data: LayoutData

  let quest: Quest
  let error: boolean

  const text = data.text as Quests['Welcome']['text']
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
      id: '1',
      type: 'regular'
    },
    {
      id: '2',
      type: 'regular'
    },
    {
      id: '3',
      type: 'regular',
      footer: {
        next: {
          text: $i18n.t('quests:Welcome.hi'),
          onClick: () => quest.actions.next()
        }
      }
    },
    {
      id: '4',
      type: 'jetty'
    },
    {
      id: '5',
      type: 'jetty'
    },
    {
      id: '6',
      type: 'jetty'
    },
    {
      id: '7',
      type: 'jetty'
    },
    {
      id: '8',
      type: 'jetty'
    },
    {
      id: '9',
      type: 'jettyQuiz',
      text: text['9.md'],
      quizRequirement: 'RadQuestQuiz',
      answers: [
        {
          text: text['9a-answer.md'],
          info: text['9a-result.md'],
          correct: true
        },
        {
          text: text['9b-answer.md'],
          info: text['9b-result.md'],
          correct: false
        },
        {
          text: text['9c-answer.md'],
          info: text['9c-result.md'],
          correct: false
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

  {#if error}
    <Error>{$i18n.t('quests:somethingWentWrong')}</Error>
  {/if}
</Quest>
