<script lang="ts">
  import { page } from '$app/stores'
  import { questApi } from '$lib/api/quest-api'
  import Quest, {
    type JettyStep,
    type RegularStep,
    type _Step
  } from '$lib/components/quest/Quest.svelte'
  import { createEventDispatcher, onMount, type ComponentProps } from 'svelte'
  import { closeQuest } from './+layout.svelte'
  import { hideJetty, quests, retractJettyMenu, scrollToNextQuest, user } from '../../../../stores'
  import ClaimRewards from './ClaimRewards.svelte'
  import VerifyRequirements from './VerifyRequirements.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import type { QuestId } from 'content'
  import { useCookies, type RequirementCookieKey } from '$lib/utils/cookies'
  import { completeQuest } from '$lib/utils/complete-quest'
  import { useLocalStorage } from '$lib/utils/local-storage'
  import { isMobile } from '$lib/utils/is-mobile'
  import type { QuestRequirement } from '$lib/server/user-quest/controller'
  import QuizJettyPage from './QuizJettyPage.svelte'
  import { writable } from 'svelte/store'
  import { htmlReplace } from '$lib/helpers/html-replace'

  type CompleteStep = _Step<'complete'> & { id: 'complete' }

  type RequirementStep = _Step<'requirements'> & { id: 'requirements' }

  type ClaimRewardsStep = _Step<'claimRewards'> & { id: 'claimRewards' }

  type JettyQuizStep = _Step<'jettyQuiz'> & {
    text: string
    answers: { text: string; correct: boolean; info: string }[]
    quizRequirement: string
  }

  export let id: QuestId
  export let steps: (
    | RegularStep
    | JettyStep
    | Omit<RequirementStep, 'id'>
    | Omit<ClaimRewardsStep, 'id'>
    | Omit<CompleteStep, 'id'>
    | JettyQuizStep
  )[]
  export let requirements: Record<string, QuestRequirement>
  export let render: (id: string) => boolean = () => false

  export const actions = {
    next: () => {},
    back: () => {},
    goToStep: (_id: string) => {}
  }

  const saveProgress = (progress: number) => {
    if ($user) {
      questApi.saveProgress(id, progress)
    }
    // @ts-ignore
    useCookies(`saved-progress-${id}`).set(progress)
    useLocalStorage('savedProgress').set({
      questId: id,
      progress
    })
  }

  let quest: Quest

  onMount(() => {
    actions.next = quest.next
    actions.back = quest.back
    actions.goToStep = quest.goToStep

    if ($page.url.hash) {
      quest.setProgress(parseInt($page.url.hash.slice(1)))
    } else {
      const savedProgress = useCookies(`saved-progress-${id}`).get()
      if (savedProgress) {
        quest.setProgress(parseInt(savedProgress))
      }
    }

    $retractJettyMenu = true

    return () => ($hideJetty = false)
  })

  const _completeQuest = async () => {
    await completeQuest(id, !!$user)
    dispatch('completed')
    setTimeout(closeQuest, 0)
    if (isMobile()) {
      $scrollToNextQuest = true
    }
  }

  const progressUpdated = (e: CustomEvent<number>) => {
    saveProgress(e.detail)

    nextDisabled = false

    if (e.detail !== steps.length - 1) return

    const contentRequirement = Object.values($quests[id].requirements).find(
      (requirement) => requirement.type === 'content'
    )?.id

    if (contentRequirement) {
      if ($user) {
        questApi.completeContentRequirement(id)
      } else {
        useCookies(`requirement-${id}-${contentRequirement}` as RequirementCookieKey).set(true)
      }
    }
  }

  let _requirements: NonNullable<ComponentProps<Quest>['requirements']> = []
  if (requirements) {
    _requirements = Object.entries(requirements).reduce(
      (prev, cur) => {
        if (cur[1].isHidden) return prev
        prev = [
          ...prev,
          {
            // @ts-ignore
            text: $i18n.t(`quests:${id}.requirements.${cur[0]}`),
            complete: cur[1].isComplete
          }
        ]
        return prev
      },
      [] as NonNullable<ComponentProps<Quest>['requirements']>
    )
  }

  let nextDisabled = false

  let requirementsNextEnabled = writable(false)

  let _steps: (RegularStep | JettyStep)[]

  $: _steps = steps.map((step) => {
    if (step.type === 'requirements') {
      return {
        type: 'regular',
        id: 'requirements',
        footer: {
          next: {
            enabled: requirementsNextEnabled,
            onClick: (next) => {
              next()
            }
          }
        }
      }
    }

    if (step.type === 'claimRewards') {
      return {
        type: 'jetty',
        id: 'claimRewards',
        footer: {
          next: {
            text: $i18n.t('quests:claimButton'),
            onClick: (next, $loading) => {
              $loading.set(true)
              claimRewards
                .claim()
                .map(() => {
                  $loading.set(false)
                  next()
                })
                .mapErr(() => {
                  $loading.set(false)
                })
            }
          }
        }
      }
    }

    if (step.type === 'complete') {
      return {
        type: 'jetty',
        id: 'complete',
        footer: {
          next: {
            text: $i18n.t('quests:completeQuest'),
            onClick: () => {
              _completeQuest()
            }
          }
        }
      }
    }

    if (step.type === 'jettyQuiz') {
      return {
        type: 'jetty',
        id: step.id
      }
    }

    return step
  })

  let currentStep: ComponentProps<Quest>['currentStep']

  $: if (currentStep) $hideJetty = currentStep.type === 'jetty'

  $: jettyQuizSteps = steps.filter((step) => step.type === 'jettyQuiz') as JettyQuizStep[]

  let claimRewards: ClaimRewards

  const dispatch = createEventDispatcher<{
    completed: undefined
    render: string
  }>()
</script>

<Quest
  bind:this={quest}
  bind:render
  bind:currentStep
  on:close={closeQuest}
  on:complete={_completeQuest}
  on:progressUpdated={progressUpdated}
  title={$i18n.t(`quests:${id}.title`)}
  description={$i18n.t(`quests:${id}.introDescription`)}
  minutesToComplete={$quests[id].minutesToComplete}
  rewards={$quests[id].rewards}
  steps={_steps}
  requirements={_requirements}
  {nextDisabled}
  let:back
  let:next
  let:render
  let:skip
  on:render
  let:lastProgress
  let:progress
>
  <slot {back} {next} {render} completeQuest={_completeQuest} />

  {#if render('requirements')}
    <VerifyRequirements
      questId={id}
      {requirements}
      on:all-requirements-met|once={() => {
        $requirementsNextEnabled = true
        if (lastProgress < progress) next()
      }}
    />
  {/if}

  {#if render('claimRewards')}
    <ClaimRewards
      bind:this={claimRewards}
      questId={id}
      text={htmlReplace($quests[id].text?.['claim.md'], {
        name: $user?.name,
        inviter_name: $user?.referredByUser?.name
      })}
      on:claimed={skip}
    />
  {/if}

  {#if render('complete')}
    {@html $quests[id].text['complete.md']}
  {/if}

  {#each jettyQuizSteps as jettyQuizStep}
    {#if render(jettyQuizStep.id)}
      <QuizJettyPage
        text={jettyQuizStep.text}
        answers={jettyQuizStep.answers}
        quizRequirement={jettyQuizStep.quizRequirement}
        questId={id}
        {requirements}
        on:mount={() => {
          nextDisabled = true
        }}
        on:correct={() => {
          nextDisabled = false
        }}
      />
    {/if}
  {/each}
</Quest>
