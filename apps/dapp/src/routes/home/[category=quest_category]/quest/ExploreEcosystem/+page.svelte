<script lang="ts">
  import Quest from '../Quest.svelte'
  import type { PageData } from '../Thorswap/$types'
  import type { Quests } from 'content'

  export let data: PageData

  const text = data.text as Quests['ExploreEcosystem']['text']
</script>

<Quest
  {...data.questProps}
  steps={[
    {
      id: '0',
      type: 'regular'
    },
    {
      id: '1',
      type: 'jetty'
    },
    {
      id: '2',
      type: 'regular'
    },
    {
      id: '3',
      type: 'jetty'
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
      type: 'jettyQuiz',
      text: text['6.md'],
      quizRequirement: 'Quiz',
      answers: [
        {
          text: text['6a-answer.md'],
          info: text['6a-result.md'],
          correct: false
        },
        {
          text: text['6b-answer.md'],
          info: text['6b-result.md'],
          correct: false
        },
        {
          text: text['6c-answer.md'],
          info: text['6c-result.md'],
          correct: true
        }
      ]
    },
    {
      id: '7',
      type: 'jettyQuiz',
      text: text['7.md'],
      quizRequirement: 'Quiz',
      answers: [
        {
          text: text['7a-answer.md'],
          info: text['7a-result.md'],
          correct: true
        },
        {
          text: text['7b-answer.md'],
          info: text['7b-result.md'],
          correct: false
        },
        {
          text: text['7c-answer.md'],
          info: text['7c-result.md'],
          correct: false
        }
      ]
    },
    {
      id: '8',
      type: 'jettyQuiz',
      text: text['8.md'],
      quizRequirement: 'Quiz',
      answers: [
        {
          text: text['8a-answer.md'],
          info: text['8a-result.md'],
          correct: false
        },
        {
          text: text['8b-answer.md'],
          info: text['8b-result.md'],
          correct: false
        },
        {
          text: text['8c-answer.md'],
          info: text['8c-result.md'],
          correct: true
        }
      ]
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
</Quest>
