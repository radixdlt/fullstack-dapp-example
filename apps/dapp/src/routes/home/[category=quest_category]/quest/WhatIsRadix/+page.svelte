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
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['4.md']
      }
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
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['9.md']
      }
    },
    {
      id: '10',
      type: 'jetty',
      component: QuizJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: text['10.md'],
        quizRequirement: 'RadixQuiz',
        questId: 'WhatIsRadix',
        requirements: data.requirements,
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
      }
    },
    {
      id: 'unclaimable-requirements',
      type: 'jetty',
      component: ClaimRewards,
      props: {
        rewards: data.rewards,
        text: '',
        nextButtonText: $i18n.t('quests:continueButton'),
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

  {#if render('6')}
    {@html text['6.md']}
  {/if}

  {#if render('7')}
    {@html text['7.md']}
  {/if}

  {#if render('8')}
    {@html text['8.md']}
  {/if}
</Quest>
