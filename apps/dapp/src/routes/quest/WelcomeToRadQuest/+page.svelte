<script lang="ts">
  import ClaimRewards from '$lib/components/claim-rewards/ClaimRewards.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import type { LayoutData } from '../$types'
  import Quest from '../Quest.svelte'
  import TextJettyPage from '../TextJettyPage.svelte'

  export let data: LayoutData

  let quest: Quest
</script>

<Quest
  bind:this={quest}
  id={data.id}
  requirements={data.requirements}
  steps={[
    {
      id: '0',
      type: 'regular',
      footer: {
        next: {
          text: $i18n.t('quests:WelcomeToRadQuest.hi'),
          onClick: () => quest.actions.next()
        }
      }
    },
    {
      id: '1',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: data.text['1.md']
      }
    },
    {
      id: '2',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: data.text['2.md']
      }
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
        text: data.text['5.md']
      }
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
        text: data.text['7.md']
      }
    },
    {
      id: '8',
      type: 'jetty',
      component: TextJettyPage,
      props: {
        onBack: () => quest.actions.back(),
        onNext: () => quest.actions.next(),
        text: data.text['8.md']
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
        text: data.text['claim.md'],
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
  {#if render('0')}
    {@html data.text['0.md']}
  {/if}

  {#if render('3')}
    {@html data.text['3.md']}
  {/if}

  {#if render('4')}
    {@html data.text['4.md']}
  {/if}

  {#if render('6')}
    {@html data.text['6.md']}
  {/if}
</Quest>
