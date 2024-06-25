<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import type { LayoutData } from '../$types'
  import Quest from '../Quest.svelte'
  import QuizJettyPage from '../QuizJettyPage.svelte'
  import TextJettyPage from '../TextJettyPage.svelte'
  import Error from '$lib/components/error/Error.svelte'

  import type { Quests } from 'content'

  export let data: LayoutData

  let quest: Quest
  let error: boolean

  const text = data.text as Quests['WelcomeToRadQuest']['text']
</script>

<Quest
  bind:this={quest}
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
      id: '3',
      type: 'regular',
      footer: {
        next: {
          text: $i18n.t('quests:WelcomeToRadQuest.hi'),
          onClick: () => quest.actions.next()
        }
      }
    },
    {
      id: '4',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['4.md']
      }
    },
    {
      id: '5',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['5.md']
      }
    },
    {
      id: '6',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['6.md']
      }
    },
    {
      id: '7',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['7.md']
      }
    },
    {
      id: '8',
      type: 'jetty',
      component: QuizJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['8.md'],
        quizRequirement: 'RadQuestQuiz',
        questId: 'WelcomeToRadQuest',
        requirements: data.requirements,
        answers: [
          {
            text: text['8a.md'],
            correct: true
          },
          {
            text: text['8b.md'],
            correct: false
          },
          {
            text: text['8c.md'],
            correct: false
          }
        ]
      }
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

  {#if render('3')}
    {@html text['3.md']}
  {/if}

  {#if error}
    <Error>{$i18n.t('quests:somethingWentWrong')}</Error>
  {/if}
</Quest>
