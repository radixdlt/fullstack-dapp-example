<script lang="ts">
  import ClaimRewards from '$lib/components/claim-rewards/ClaimRewards.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import Quest from '../Quest.svelte'
  import type { PageData } from './$types'
  import TextJettyPage from '../TextJettyPage.svelte'
  import QuizJettyPage from '../QuizJettyPage.svelte'
  import type { Quests } from 'content'

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
      id: '0',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['0.md']
      }
    },
    {
      id: '1',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['1.md']
      }
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
      type: 'regular'
    },
    {
      id: '6',
      type: 'regular'
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
        quizRequirement: 'RadixQuiz',
        questId: 'WhatIsRadix',
        requirements: data.requirements,
        answers: [
          {
            text: text['8a.md'],
            correct: false
          },
          {
            text: text['8b.md'],
            correct: false
          },
          {
            text: text['8c.md'],
            correct: true
          }
        ]
      }
    },
    {
      id: '9',
      type: 'jetty',
      component: QuizJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['9.md'],
        quizRequirement: 'dAppQuiz',
        questId: 'WhatIsRadix',
        requirements: data.requirements,
        answers: [
          {
            text: text['9a.md'],
            correct: true
          },
          {
            text: text['9b.md'],
            correct: false
          },
          {
            text: text['9c.md'],
            correct: false
          }
        ]
      }
    },
    {
      type: 'requirements'
    },
    {
      id: 'unclaimable-requirements',
      type: 'jetty',
      component: ClaimRewards,
      props: {
        rewards: data.rewards,
        text: text['claim.md'],
        nextButtonText: $i18n.t('quests:claimButton'),
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next()
      }
    },
    {
      type: 'complete'
    }
  ]}
  let:render
>
  {#if render('2')}
    {@html text['2.md']}
  {/if}

  {#if render('3')}
    {@html text['3.md']}
  {/if}

  {#if render('5')}
    {@html text['5.md']}
  {/if}

  {#if render('6')}
    {@html text['6.md']}
  {/if}
</Quest>
